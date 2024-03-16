using System.Collections.Generic;
using TranslationServer.Model;


namespace TranslationServer.Model
{
    public static class initialData
    {
        public static List<Translation> GetTranslations() => new List<Translation>
    {
        new Translation { Key = "Hello", Words = new Dictionary<string, string> { { "English", "hello" }, { "French", "bonjour" }, { "Dutch", "hallo" } } },
        new Translation { Key = "Goodbye", Words = new Dictionary<string, string> { { "English", "goodbye" }, { "French", "au revoir" }, { "Dutch", "tot ziens" } } },
        new Translation { Key = "Thank you", Words = new Dictionary<string, string> { { "English", "thank you" }, { "French", "merci" }, { "Dutch", "dank u" } } },
        new Translation { Key = "Welcome", Words = new Dictionary<string, string> { { "English", "welcome" }, { "French", "bienvenue" }, { "Dutch", "welkom" } } },
        new Translation { Key = "Yes", Words = new Dictionary<string, string> { { "English", "yes" }, { "French", "oui" }, { "Dutch", "ja" } } },
        new Translation { Key = "No", Words = new Dictionary<string, string> { { "English", "no" }, { "French", "non" }, { "Dutch", "nee" } } },
        new Translation { Key = "Please", Words = new Dictionary<string, string> { { "English", "please" }, { "French", "s'il vous plaît" }, { "Dutch", "alstublieft" } } },
        new Translation { Key = "Sorry", Words = new Dictionary<string, string> { { "English", "sorry" }, { "French", "désolé" }, { "Dutch", "sorry" } } },
        new Translation { Key = "Good morning", Words = new Dictionary<string, string> { { "English", "good morning" }, { "French", "bonjour" }, { "Dutch", "goedemorgen" } } },
        new Translation { Key = "Good evening", Words = new Dictionary<string, string> { { "English", "good evening" }, { "French", "bonsoir" }, { "Dutch", "goedenavond" } } }
    };
        public static List<TranslatorApp> InitialAppsList()
        {
            var translations = GetTranslations();
            return new List<TranslatorApp>
        {
            new TranslatorApp { Id = "1", Name = "App1", LastDeploymentDate = "3/14/2024, 1:57:32 PM", Translations = translations },
            new TranslatorApp { Id = "2", Name = "App2", LastDeploymentDate = "3/14/2024, 5:52:03 PM", Translations = translations },
            new TranslatorApp { Id = "3", Name = "App3", LastDeploymentDate = "3/14/2024, 1:57:32 PM", Translations = translations },
            new TranslatorApp  { Id = "4", Name = "App4", LastDeploymentDate = "3/14/2024, 5:37:01 PM", Translations = translations },
            new TranslatorApp { Id = "5", Name = "App5", LastDeploymentDate = "3/14/2024, 1:24:32 PM", Translations = translations.GetRange(2, 3) },
            new TranslatorApp { Id = "6", Name = "App6", LastDeploymentDate = "3/14/2024, 7:31:20 PM", Translations = translations.GetRange(0, 2) },
        };

        }
    }
}
