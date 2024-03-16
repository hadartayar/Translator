using Microsoft.AspNetCore.Mvc;
using TranslationServer.Model;
using ClosedXML.Excel;
using System.Text.Json;

namespace TranslationServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TranslationController : ControllerBase
    {
        private readonly ITranslationManager translationManager;

        public TranslationController(ITranslationManager _translationManager)
        {
            translationManager = _translationManager;
        }       

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TranslatorApp>>> GetApplications()
        {
            IEnumerable<TranslatorApp> applications = await translationManager.GetAllApps();
            return Ok(applications);
        }

        [HttpPost]
        public async Task<ActionResult<TranslatorApp>> AddNewApplication([FromBody] TranslatorApp newApp)
        {
            try
            {
                var application = await translationManager.AddApp(newApp);
                return Ok(application);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error Occurred: {ex.Message}");
            }
        }

        [HttpDelete("/{appId}")]
        public async Task<ActionResult<TranslatorApp>> DeleteApplication( string appId)
        {
            try
            {
                var application = await translationManager.DeleteApp(appId);
                return Ok(application);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error Occurred: {ex.Message}");
            }
        }

        //Add one application:
        //[HttpPost("/{appId}")]
        //public async Task<IActionResult> AddTranslation(string appId, [FromBody] Translation newTranslation)
        //{
        //    try
        //    {
        //        var updatedApp = await translationManager.AddTranslationByAppId(appId.ToString(), newTranslation);
        //        if (updatedApp == null)
        //            return NotFound($"Application with ID {appId} not found.");
        //        return Ok(updatedApp);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest($"Internal server error: {ex.Message}");
        //    }
        //}

        [HttpPost("/{appId}")]
        public async Task<IActionResult> AddTranslations(string appId, [FromBody] List<Translation> newTranslations)
        {
            try
            {
                var updatedApp = await translationManager.AddSomeTranslationsByAppId(appId.ToString(), newTranslations);
                if (updatedApp == null)
                    return NotFound($"Application with ID {appId} was'nt found.");
                return Ok(updatedApp);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error Occurred: {ex.Message}");
            }
        }


        [HttpGet("/{appId}/download")]
        public async Task<IActionResult> DownloadTranslations(string appId)
        {
            try
            {
                List<Translation> translations = await translationManager.GetTranslationsByAppId(appId);
                //byte[] excelBytes = translationManager.ConvertToExcel(translations);
                //using var stream = new MemoryStream();
           
                using var workbook = new XLWorkbook();
                var worksheet = workbook.Worksheets.Add("Translations"); //Create excel workSheet

                // Define the header row
                worksheet.Cell(1, 1).Value = "Key";
                worksheet.Cell(1, 2).Value = "Language";
                worksheet.Cell(1, 3).Value = "Translation";

                int rowNumber = 2; // First row is the headers
                foreach (var translation in translations)
                {
                    foreach (var trans in translation.Words)
                    {
                        string language = trans.Key;
                        string translationText = trans.Value;

                        worksheet.Cell(rowNumber, 1).Value = translation.Key;
                        worksheet.Cell(rowNumber, 2).Value = language;
                        worksheet.Cell(rowNumber, 3).Value = translationText;
                        rowNumber++;
                    }
                }

                using var stream = new MemoryStream();
                workbook.SaveAs(stream);
                var content = stream.ToArray();
                return File(content, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "translations.xlsx");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error Occurred: {ex.Message}");
            }
        }


        [HttpGet("/{appId}/deploy")]
        public async Task<IActionResult> DeployTranslations(string appId)
        {
            try
            {
                List<Translation> translations = await translationManager.GetTranslationsByAppId(appId);
                var directoryPath = Path.Combine(Directory.GetCurrentDirectory(), "Translations Deployments");
                Directory.CreateDirectory(directoryPath); // Ensure the directory exists
                var filePath = Path.Combine(directoryPath, $"App{appId}.json");
                var Json = JsonSerializer.Serialize(translations, new JsonSerializerOptions { WriteIndented = true });
                await System.IO.File.WriteAllTextAsync(filePath, Json);
                translationManager.UpdateDeploymentDate(appId);
                return Ok($"Translations deployed to {filePath}");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error Occurred: {ex.Message}");
            }
        }
    }
}
