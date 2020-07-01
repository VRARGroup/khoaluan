using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Net.Mime.MediaTypeNames;
using System.Drawing;
using System.Drawing.Imaging;
using System.Buffers.Text;
using MongoDB.Bson;
using dienmayxanhapi.Model;
using System.Diagnostics;
using System.Net.Http.Headers;

namespace dienmayxanhapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class saveimagefolderController : ControllerBase
    {
        private readonly dienmayxanhdbcontext _spdtService;
        public saveimagefolderController(dienmayxanhdbcontext spdtService)
        {
          _spdtService = spdtService;
        }
        
        [HttpPost, DisableRequestSizeLimit]
        public IActionResult saveimage()
        {
          try
          {
            var file = Request.Form.Files[0];
            var folderName = Path.Combine("Resources", "Images");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            if (file.Length > 0)
            {
              var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
              var fullPath = Path.Combine(pathToSave, fileName);
              var dbPath = Path.Combine(folderName, fileName);

              using (var stream = new FileStream(fullPath, FileMode.Create))
              {
                file.CopyTo(stream);
              }

              return Ok(new { dbPath });
            }
            else
            {
              return BadRequest();
            }
          }
          catch (Exception ex)
          {
            return StatusCode(500, $"Internal server error: {ex}");
          }
        }

        [HttpDelete]
        public ActionResult<List<string>> deleteimage(hinhanhfolder b)
        {
          System.IO.File.Delete(@"E:/khoaluan/khoaluan/src/assets/dt_1_2.png");
          return NoContent();
        }
  }
}
