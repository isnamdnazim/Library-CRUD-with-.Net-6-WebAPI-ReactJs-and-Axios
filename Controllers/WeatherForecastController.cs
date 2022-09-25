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

            /* Get Library */
            //List<Library> llibraries = _libraryService.GetAll();
            //List<Library> llibraries = _libraryService.GetByName("Yale");

            /* Add Library */
            //Library library = new Library() {Name="Test Library", Address="Uttara, Dhaka", Telephone= "01710235886" };
            //_libraryService.Save(library);

            /* Update Library */
            Library libraryToUpdate = _libraryService.GetByName("Test Library").First();
            libraryToUpdate.Name = "Test Library Updated";
            _libraryService.Update(libraryToUpdate);

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