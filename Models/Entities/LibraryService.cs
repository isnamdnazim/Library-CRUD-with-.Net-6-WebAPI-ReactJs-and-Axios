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
            var getByName = from libraries in _appDataContext.Libraries select libraries;
            if (!string.IsNullOrWhiteSpace(name))
            {
                getByName = getByName.Where(x => x.Name.ToUpper().Contains(name.ToUpper()));
            }
            return getByName.ToList();
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
