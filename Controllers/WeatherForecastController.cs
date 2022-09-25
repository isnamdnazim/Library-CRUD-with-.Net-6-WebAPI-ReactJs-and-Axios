using AspNetCoreWithReactJs.DependencyInjection;
using AspNetCoreWithReactJs.Models.Dto;
using AspNetCoreWithReactJs.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreWithReactJs.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IConsoleWriter _consoleWriter;
        private readonly ILibraryService _libraryService;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IConsoleWriter consoleWriter, ILibraryService libraryService)
        {
            _logger = logger;
            _consoleWriter = consoleWriter;
            _libraryService = libraryService;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            //Dependency Injection
            //_consoleWriter.write();

            List<Library> llibraries = _libraryService.GetAll();

            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}