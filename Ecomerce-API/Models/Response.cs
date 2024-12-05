using System.Net;

namespace Ecomerce_API.Models
{
    public class Response
    {
        public HttpStatusCode StatusCode { get; set; }
        public string Message { get; set; }
        public bool IsSuccess { get; set; }

    }

    public class LoginViewModel
    {
        public string User { get; set; }
        public string Password { get; set; }
    }

    public class AuthResult
    {
        public string? JwtToken { get; set; }
        public string? RefreshToken { get; set; }
    }

    public class AuthToken
    {
        public bool Success { get; set; }
        public string? Token { get; set; }
        public DateTime? ExpiresUtc { get; set; }
        public string? Name { get; set; }
        public string? Username { get; set; }
        public string? Message { get; set; }
        public bool Inactive { get; set; }
        public bool MustRelogin { get; set; }
        public bool? MustChangePwd { get; set; }
        public string? RefreshToken { get; set; }
    }

}
