using AspNetCoreWithReactJs.DependencyInjection;
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

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IConsoleWriter consoleWriter)
        {
            _logger = logger;
            _consoleWriter = consoleWriter;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {

            _consoleWriter.write();

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