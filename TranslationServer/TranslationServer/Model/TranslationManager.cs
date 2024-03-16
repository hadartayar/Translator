using System;
using System.Transactions;
using static System.Net.Mime.MediaTypeNames;
using System;
using System.Collections.Generic;
using System.IO;
using OfficeOpenXml;


namespace TranslationServer.Model
{
    public interface ITranslationManager
    {
        Task<IEnumerable<TranslatorApp>> GetAllApps();
        Task<TranslatorApp> AddApp(TranslatorApp newApp);
        Task<TranslatorApp> DeleteApp(string appId);
        Task<TranslatorApp?> AddTranslationByAppId(string appId, Translation translation);
        Task<TranslatorApp?> AddSomeTranslationsByAppId(string appId, List<Translation> translations);
        Task<List<Translation>> GetTranslationsByAppId(string appId);
        void UpdateDeploymentDate(string appId);
        byte[] ConvertToExcel(List<Translation> translations);
    }

    public class TranslationManager: ITranslationManager
    {
        private readonly List<TranslatorApp> apps;

        public TranslationManager() {
            apps = new List<TranslatorApp>();
            apps.AddRange(initialData.InitialAppsList());
        }

        public async Task<IEnumerable<TranslatorApp>> GetAllApps()
        {
            return await Task.FromResult(apps);
        }
        public async Task<TranslatorApp> AddApp(TranslatorApp newApp)
        {
            apps.Add(newApp); 
            return await Task.FromResult(newApp);
        }

        public async Task<TranslatorApp> DeleteApp(string appId)
        {
            var appToDelete = apps.FirstOrDefault(app => app.Id == appId);
            if (appToDelete == null)
                return null;
            apps.Remove(appToDelete);

            return await Task.FromResult(appToDelete);
        }

        public async Task<TranslatorApp?> AddTranslationByAppId(string appId, Translation translation)
        {
            var app = apps.FirstOrDefault(a => a.Id == appId);
            if (app == null)
                return null;
            app.Translations.Add(new Translation(translation.Key, translation.Words));
            return await Task.FromResult(app);
        }


        //Add List Of Translations on save
        public async Task<TranslatorApp?> AddSomeTranslationsByAppId(string appId, List<Translation> translations)
        {
            var app = apps.FirstOrDefault(a => a.Id == appId);
            if (app == null)
            {
                return null;
            }
            foreach (var trans in translations) {
                app.Translations.Add(new Translation(trans.Key, trans.Words));
            }
            return await Task.FromResult(app);
        }

        public async Task<List<Translation>> GetTranslationsByAppId(string appId)
        {
            TranslatorApp app = apps.FirstOrDefault(app => app.Id == appId); 
            if (app == null)
                return new List<Translation>();
            return await Task.FromResult(app.Translations);
        }

        public void UpdateDeploymentDate(string appId)
        {
            TranslatorApp app = apps.FirstOrDefault(app => app.Id == appId); 
            if (app == null)
                app.LastDeploymentDate = DateTime.Now.ToString("MM/dd/yyyy, HH:mm");
        }

        public byte[] ConvertToExcel(List<Translation> translations)
        {
            using (ExcelPackage package = new ExcelPackage())
            {
                ExcelWorksheet worksheet = package.Workbook.Worksheets.Add("Sheet1");

                // Insert File Headers:
                worksheet.Cells[1, 1].Value = "Key";
                int column = 2;
                foreach (var language in translations[0].Words.Keys)
                {
                    worksheet.Cells[1, column].Value = language;
                    column++;
                }

                //  Insert File Data
                int row = 2;
                foreach (var word in translations)
                {
                    worksheet.Cells[row, 1].Value = word.Key;
                    column = 2;
                    foreach (var translation in word.Words.Values)
                    {
                        worksheet.Cells[row, column].Value = translation;
                        column++;
                    }
                    row++;
                }
                return package.GetAsByteArray();
            }
        }
    }
}
