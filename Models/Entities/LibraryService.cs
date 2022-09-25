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
            _appDataContext.Libraries.Add(library);
            _appDataContext.SaveChanges();

            return library;
        }
        public Library Update(Library library)
        {
            Library libraryFromDb = _appDataContext.Libraries.First(x => x.Id == library.Id);

            _appDataContext.Entry(libraryFromDb).CurrentValues.SetValues(library);
            _appDataContext.SaveChanges();

            return library;
        }
        public Library Delete(Library library)
        {
            //Another way
            _appDataContext.Entry(library).State = Microsoft.EntityFrameworkCore.EntityState.Deleted;

            //Another Way
            //Library libraryFromDb = _appDataContext.Libraries.FirstOrDefault(x=> x.Id == library.Id);
            //_appDataContext.Remove(libraryFromDb);

            _appDataContext.SaveChanges();

            return library;
        }
    }
}
