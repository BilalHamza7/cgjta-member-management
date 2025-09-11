using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;
using dotenv.net;
using Backend.Data;
using Backend.Services;

var builder = WebApplication.CreateBuilder(args);

// Add Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();
// Register MembersService with scoped lifetime
builder.Services.AddScoped<MembersService>();
builder.Services.AddScoped<MembershipsService>();

DotEnv.Load();

// Register SupabaseService as a singleton
builder.Services.AddSingleton<SupabaseService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy
            .WithOrigins("http://localhost:5173") // React dev server
            .AllowAnyHeader()
            .AllowAnyMethod());
});


var app = builder.Build();

// Enable Swagger in development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.UseAuthorization();

// app.UseHttpsRedirection();
app.MapControllers();

app.Run();