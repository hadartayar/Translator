
using Microsoft.AspNetCore.Mvc.Razor;
using System.Runtime.Intrinsics.Arm;
using System.Text;

namespace TranslationServer.Model
{
    public class Translation
    {
       public string Key { get; set; }
       public Dictionary<string, string> Words { get; set; }

        public Translation() { }
        public Translation(string key, Dictionary<string,string> words)
        {
            Key = key;
            Words = words;
        }
    }
}
