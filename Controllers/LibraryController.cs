using AspNetCoreWithReactJs.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreWithReactJs.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LibraryController : ControllerBase
    {
        private readonly ILibraryService _libraryService;

        public LibraryController(ILibraryService libraryService)
        {
                _libraryService = libraryService;
        }
        
        [HttpGet]
        public IActionResult Get()
        {
            List<Library> libraries = _libraryService.GetAll();
            return Ok(libraries);
        }

        [HttpGet]
        public IActionResult Search(string name)
        {
            List<Library> libraries = _libraryService.GetByName(name);
            return Ok(libraries);
        }


    }
}
