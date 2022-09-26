using AspNetCoreWithReactJs.CustomMiddleware;
using AspNetCoreWithReactJs.DataContext;
using AspNetCoreWithReactJs.DependencyInjection;
using AspNetCoreWithReactJs.Models.Entities;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddTransient<IConsoleWriter, ConsoleWriter>();
builder.Services.AddTransient<ILibraryService, LibraryService>();

builder.Services.AddDbContext<AppDataContext>(option => option.UseSqlServer(
        builder.Configuration.GetConnectionString("Connection")
    ));

builder.Services.AddSwaggerGen(s =>
{
    s.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo {Title = "Asp .Net Core API", Version = "v1"});
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

//Alow Specific Origin
//app.UseCors(options => options.WithOrigins("http......").AllowAnyMethod());

//Any Origin
app.UseCors(options => options.AllowAnyMethod().AllowAnyHeader().SetIsOriginAllowed(origin => true));

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "React ASP .Net");
});
app.UseRouting();
app.UseMyMiddleware();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
