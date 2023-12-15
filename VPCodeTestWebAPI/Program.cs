using Microsoft.EntityFrameworkCore;
using VPCodeTestWebAPI.DAL;
using VPCodeTestWebAPI.Models;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddCors();

builder.Services.AddDbContext<ToDoDbContext>();

builder.Services.AddDbContext<ToDoContext>(options =>
    options.UseSqlServer(connectionString: builder.Configuration.GetConnectionString("VPCODETESTCS")));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder =>
{ 
    builder.AllowAnyOrigin()
           .AllowAnyHeader()
           .AllowAnyMethod();
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

