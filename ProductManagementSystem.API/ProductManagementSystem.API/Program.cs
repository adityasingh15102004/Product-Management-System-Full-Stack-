using Microsoft.EntityFrameworkCore;
using ProductManagementSystem.API.Data;

//Create the app builder
var builder = WebApplication.CreateBuilder(args);

//API services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString =
    builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException(
        "The DefaultConnection string was not found in appsettings.json.");

//registered the context - DI
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));


//Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactDevelopment", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:5173",
                "http://localhost:5179",
                "http://localhost:5182",
                "http://localhost:5183")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
//Build the app
var app = builder.Build();

//Enable Swagger in Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//Configure incoming requests
app.UseHttpsRedirection();
app.UseCors("ReactDevelopment");
app.MapControllers();      //     /api/products



app.Run();
