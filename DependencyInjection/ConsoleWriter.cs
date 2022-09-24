using System.Diagnostics;

namespace AspNetCoreWithReactJs.DependencyInjection
{
    public class ConsoleWriter : IConsoleWriter
    {
        public void write()
        {
            Debug.WriteLine("Testing Dependency Injection...");
        }
    }
}
