using Ecomerce_API.Models;
using JwtConfiguration;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Ecomerce_API.Services
{
    public interface IJwtTokenService
    {
        Task<AuthToken?> GetTokenAsync(LoginViewModel UserRequest);
        Task<AuthToken> RefreshToken(string AccessToken, string request);
    }
    public class JwtServices : IJwtTokenService
    {
        private readonly ApicContext _db;
        private readonly IConfiguration _conf;
        private readonly ILogger<JwtServices> _logger;

        public JwtServices(ApicContext db, IConfiguration conf, ILogger<JwtServices> logger)
        {
            _db = db;
            _conf = conf;
            _logger = logger;
        }

        public async Task<AuthToken?> GetTokenAsync(LoginViewModel UserRequest)
        {
            try
            {
                if (string.IsNullOrEmpty(UserRequest.Password) || string.IsNullOrEmpty(UserRequest.User))
                    return new AuthToken() { Success = false, Message = "Invalid" };

                var user = await _db.Users.Where(q => q.Username.ToLower() == UserRequest.User.ToLower() && q.IsActive == true).FirstOrDefaultAsync();
                
                if (user == null)
                    return new AuthToken() { Success = false, Message = "Invalid" }; ;

                var pwd = ClaveSHA256(UserRequest.Password);
                bool Valid = false;
                if ((user.PasswordHash?.ToUpper() == pwd.ToUpper()))
                {
                    Valid = true;

                }

                if (!Valid)
                    return new AuthToken() { Success = false, Message = "Invalid" }; ;

                var tk = GenerateToken(user.Username, user.Email ?? "");
                tk.Name = (user.FirstName.Trim() + " " + user.LastName.Trim()).Trim();
                tk.Username = user.Username;
                tk.Success = true;

                var refreshToken = GenerateRefreshToken();
                user.RefreshToken = refreshToken;

                tk.RefreshToken = refreshToken;

                await _db.SaveChangesAsync();
                // Agregar la cookie al Response
                return tk;
            }
            catch (Exception ex)
            {
                _logger.LogError(4000, ex.Message, ex);
                return new AuthToken() { Success = false, Message = "Error" }; ;
            }

        }
        public static AuthToken GenerateToken(string Username, string Email )
        {
            // Define los claims (información sobre el usuario)
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, Username),
                new Claim(JwtRegisteredClaimNames.Email, Email),
                new Claim(ClaimTypes.Name, Username),
            };

            // Crear la clave secreta (usada para firmar el token)
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtExtensions.SecurityKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var dtExp = DateTime.UtcNow.AddMinutes(5);
            // Crear el token
            var token = new JwtSecurityToken(
                issuer: JwtExtensions.ValidIssuer,
                claims: claims,
                // Expira en 30 minutos
                expires: dtExp, 
                signingCredentials: creds
            );


            AuthToken at = new AuthToken() { Success = true };
            at.Token = new JwtSecurityTokenHandler().WriteToken(token);
            at.ExpiresUtc = dtExp;
            return at;

        }
        public string ClaveSHA256(string password)
        {
            UTF8Encoding enc = new UTF8Encoding();
            byte[] data = enc.GetBytes(password);
            byte[] result;

            using (SHA256 sha = SHA256.Create()) // Usamos using para manejar la eliminación adecuada de recursos
            {
                result = sha.ComputeHash(data);
            }

            // Convertir los valores a hexadecimal y asegurarse de que cada valor tenga dos dígitos.
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < result.Length; i++)
            {
                if (result[i] < 16)
                {
                    sb.Append("0");
                }
                sb.Append(result[i].ToString("X"));
            }

            return sb.ToString();
        }
        public static string GenerateRefreshToken()
        {
            var randomBytes = new byte[64];
            RandomNumberGenerator.Fill(randomBytes); 
            return Convert.ToBase64String(randomBytes);
        }
        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var tp = JwtExtensions.GetTokenValidationParameters().Clone();
            tp.ValidateLifetime = false;//remover vencimiento.
            var principal = tokenHandler.ValidateToken(token, tp, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken is null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase) || jwtSecurityToken.ValidTo > DateTime.UtcNow)//compara el expire para solo validar vencidos
            {
                throw new SecurityTokenException("Invalid Token");
            }
            return principal;
        }
        public async Task<AuthToken> RefreshToken(string AccessToken, string request)
        {
            try
            {
                // Validar el token que esta por vencer. throw si no es valido
                var principal = GetPrincipalFromExpiredToken(AccessToken);

                var user = await _db.Users.Where(q => q.Username == principal!.Identity!.Name && q.RefreshToken == request && q.IsActive == true).FirstOrDefaultAsync();
                if (user == null)
                    return new AuthToken { Success = false, Message = "Refresh token no válido" };
                var tk = GenerateToken(user.Username, user.Email ?? "");

                var refreshToken = GenerateRefreshToken();

                user.RefreshToken = refreshToken;
                await _db.SaveChangesAsync();

                return tk;
            }
            catch (SecurityTokenException ex)
            {
                return new AuthToken { Success = false, Message = "Invalid token" };
            }
            catch (Exception ex)
            {
                _logger.LogError(4000, ex.Message, ex);
                return new AuthToken { Success = false, Message = "Temporary error. Try later" };
            }


        }

    }
}
