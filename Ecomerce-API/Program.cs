using Ecomerce_API.Models;
using Ecomerce_API.Repository;
using Ecomerce_API.Services;
using JwtConfiguration;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<ApicContext>(item => item.UseMySql("server=localhost;database=APIC;user=root;password=ddr210615", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.38-mysql")));

builder.Services.AddJwtAuthentication(); //Injectamos la liberaia jwt
builder.Services.AddScoped<IJwtTokenService, JwtServices>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
