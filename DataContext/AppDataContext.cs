using Microsoft.EntityFrameworkCore;

namespace AspNetCoreWithReactJs.DataContext
{
    public class AppDataContext : DbContext
    {
        public AppDataContext(DbContextOptions<AppDataContext> options) : base(options)
        {

        }
    }
}
