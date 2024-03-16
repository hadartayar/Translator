using System.Runtime.Intrinsics.Arm;
using System.Text;
using System.Xml.Linq;

namespace TranslationServer.Model
{
    public class TranslatorApp
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string LastDeploymentDate { get; set; }
        public List<Translation> Translations { get; set; } = new List<Translation>();

        public TranslatorApp() { }

        public TranslatorApp(string id, string name, List<Translation> translations)
        {
            Id = id;
            Name = name;
            LastDeploymentDate = DateTime.Now.ToString("MM/dd/yyyy, HH:mm");
            Translations = new List<Translation>(translations); ;
        }
    }
}
