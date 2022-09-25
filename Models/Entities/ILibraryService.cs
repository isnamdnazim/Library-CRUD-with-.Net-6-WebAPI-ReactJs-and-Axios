namespace AspNetCoreWithReactJs.Models.Entities
{
    public interface ILibraryService
    {
        Library Delete(Library library);
        List<Library> GetAll();
        List<Library> GetByName(string name);
        Library Save(Library library);
        Library Update(Library library);
    }
}