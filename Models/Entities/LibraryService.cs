using AspNetCoreWithReactJs.DataContext;

namespace AspNetCoreWithReactJs.Models.Entities
{
    public class LibraryService : ILibraryService
    {
        public AppDataContext _appDataContext { get; set; }
        public LibraryService(AppDataContext appDataContext)
        {
            _appDataContext = appDataContext;
        }

        public List<Library> GetAll()
        {
            return _appDataContext.Libraries.ToList();
        }
        public List<Library> GetByName(string name)
        {
            return null;
        }

        public Library Save(Library library)
        {
            return null;
        }
        public Library Update(Library library)
        {
            return null;
        }
        public Library Delete(Library library)
        {
            return null;
        }
    }
}
