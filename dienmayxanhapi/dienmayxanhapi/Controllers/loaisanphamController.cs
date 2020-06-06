using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dienmayxanhapi.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace dienmayxanhapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class loaisanphamController : ControllerBase
    {
        private readonly dienmayxanhdbcontext _lspService;
        public loaisanphamController(dienmayxanhdbcontext lspService)
        {
            _lspService = lspService;
        }

        [HttpGet]
        public ActionResult<List<loaisanpham>> Get()
        {
            return (_lspService.Getlsp());
        }


        [HttpPost]
        public ActionResult<BsonDocument> Create(loaisanpham lsp)
        {
            var document = new BsonDocument {
                 { "_id", lsp._id},
                 { "tendanhmuc" , lsp.tendanhmuc},
                 };
            BsonDocument d = new BsonDocument();
            BsonArray arraythongsokythuat = new BsonArray();
            for (int i = 0; i < lsp.dactrung.Count; i++)
            {
                var json = lsp.dactrung[1].ToString();
                d = BsonDocument.Parse(json);
                var documentthngsokythuattich = new BsonDocument { };
                documentthngsokythuattich.Add(d);
                arraythongsokythuat.AsBsonArray.Add(BsonValue.Create(d));
            }
            document.Add("dactrung", arraythongsokythuat);
            _lspService.insertls(document);
            return NoContent();
        }
    }
}