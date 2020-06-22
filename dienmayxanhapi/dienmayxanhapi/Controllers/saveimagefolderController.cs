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
        
        [HttpPost]
        public ActionResult<List<hinhanhfolder>> saveimage(hinhanhfolder b)
        {
            string[] arryb = b.hinhluuvaofolder.ToString().Split(',');
            var s = arryb[1];
            using (WebClient client = new WebClient())
            {
              byte[] data = System.Convert.FromBase64String(s);
              using (MemoryStream mem = new MemoryStream(data))
              {
                using (var yourImage = System.Drawing.Image.FromStream(mem))
                {
                  // If you want it as Png
                  yourImage.Save(@"E:\khoaluan\khoaluan\src\assets\"+b.tendinhdanh.ToLower().Trim()+".png", ImageFormat.Png);

                  //// If you want it as Jpeg
                  //yourImage.Save("path_to_your_file.jpg", ImageFormat.Jpeg);
                }
              }
            }
            return null;
        }
    }
}
