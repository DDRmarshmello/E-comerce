using Ecomerce_API.Models;
using Ecomerce_API.Repository;
using Ecomerce_API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ecomerce_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly ILogger<UserController> _logger;
        private readonly IJwtTokenService _jtk;
        private readonly IRepository<User> _user;
        public UserController(ILogger<UserController> logger, IJwtTokenService jwt, IRepository<User> user)
        {
            _logger = logger;
            _jtk = jwt;
            _user = user;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel UserRequest)
        {
            try
            {
                var r = await _jtk.GetTokenAsync(UserRequest);

                if (r!.Success == false)
                    return Unauthorized();

                var rt = new AuthResult()
                {
                    JwtToken = r.Token,
                    RefreshToken = r.RefreshToken
                };

                return Ok(rt);
            }
            catch (Exception ex) 
            {
                _logger.LogError(4000, ex.Message, ex);
                return StatusCode(500 ,new Response { IsSuccess = false, Message = "Temporary error. Try later" });
            }

        }

        [HttpPost("refresh")]
        [AllowAnonymous]
        public async Task<IActionResult> RefreshToken([FromBody] string request)
        {
            try
            {
                var At = Request.Headers.TryGetValue("Authorization", out var value);
                var AuthTk = value.FirstOrDefault()?.Split(' ')[1];

                var tk = await _jtk.RefreshToken(AuthTk!, request);

                if (!tk.Success)
                    return Ok(new Response { IsSuccess = false, Message = tk.Message });

                var rt = new AuthResult()
                {
                    RefreshToken = tk.RefreshToken
                };

                return Ok(rt);
            }
            catch (Exception ex)
            {
                _logger.LogError(4000, ex.Message, ex);
                return StatusCode(500 ,new Response { IsSuccess = false, Message = "Temporary error. Try later" });
            }
        }

        public async Task<IActionResult> RegisterUser([FromBody] User user)
        {
            try
            {
                await _user.AddAsync(user);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(4000, ex.Message, ex);
                return StatusCode(500, new Response { IsSuccess = false, Message = "Temporary error. Try later" });
            }
        }
    }
}
