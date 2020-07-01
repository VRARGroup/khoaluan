using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dienmayxanhapi.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

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

        [HttpGet("{id}")]
        public ActionResult<List<loaisanpham>> Getdetail(int id)
        {
          return (_lspService.Getfillterlsp(id));
        }

        [HttpPost]
        public ActionResult<BsonDocument> Create(loaisanpham lsp)
        {
            var s = _lspService.Getlsp().LastOrDefault()._id+10000;
            var document = new BsonDocument {
                  { "_id", _lspService.Getlsp().LastOrDefault()._id+10000},
                  { "tendanhmuc" , lsp.tendanhmuc},
                  };
            BsonArray arraythuonghieu = new BsonArray();
            for(int i=0;i<lsp.thuonghieu.Count;i++)
            {
                arraythuonghieu.Add(lsp.thuonghieu[i]);
            }
            document.Add("thuonghieu", arraythuonghieu);
            arraythuonghieu = new BsonArray();
            for (int i = 0; i < lsp.tieuchidanhgia.Count; i++)
            {
              arraythuonghieu.Add(lsp.tieuchidanhgia[i]);
            }
            document.Add("tieuchidanhgia", arraythuonghieu);
            BsonDocument d = new BsonDocument();
            BsonArray arraydactrung = new BsonArray();
            for (int i = 0; i < lsp.dactrung.Count; i=i+2)
            {
                BsonArray arrayctdactrung = new BsonArray();
                if (i < lsp.dactrung.Count)
                {
                  
                  string[] arrstringdactrung = lsp.dactrung[i + 1].ToString().Split(',');
                  for (int j = 0; j < arrstringdactrung.Length; j++)
                  {
                    arrayctdactrung.Add(arrstringdactrung[j]);
                  }
                  //var json = lsp.dactrung[1].ToString();
                  //d = BsonDocument.Parse(json);
                }
                var documentnddactrung = new BsonDocument { };
                documentnddactrung.Add(lsp.dactrung[i].ToString(), arrayctdactrung);
                arraydactrung.AsBsonArray.Add(BsonValue.Create(documentnddactrung));
            }
            document.Add("dactrung", arraydactrung);
            _lspService.insertls(document);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult deleteloaisanpham(int id)
        {
            var deletefilter = Builders<BsonDocument>.Filter.Eq("_id", id);
            _lspService.deletels(deletefilter);
            return NoContent();
        }
    }
}
