using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dienmayxanhapi.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;
using MongoDB.Bson;
using MongoDB.Driver;
using static dienmayxanhapi.dienmayxanhdbcontext;

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

        [Route ("thuonghieu")]
        [HttpGet]
        public ActionResult<List<string>> Getthuonnghieu()
        {
          return (_lspService.Getthuonghieu());
        }

        [Route ("nav")]
        [HttpGet]
        public async Task<List<nav_lsp>> Getnav_lsp()
        {
          return (await _lspService.Getloaisp_nav());
        }

        [HttpGet("{id}")]
        public ActionResult<List<loaisanpham>> Getdetail(int id)
        {
          return (_lspService.Getfillterlsp(id));
        }

        [HttpPost]
        public ActionResult<BsonDocument> Create(loaisanpham lsp)
        {
            try
            {
              int id = 0;
              if (_lspService.Getlsp() != null && _lspService.Getlsp().Count != 0)
              {
                id = Convert.ToInt32(_lspService.Getlsp().LastOrDefault()._id + 10000);
              }
              var document = new BsonDocument {
                        { "_id", id},
                        { "tendanhmuc" , lsp.tendanhmuc},
                        };
              BsonArray arraythuonghieu = new BsonArray();
              for (int i = 0; i < lsp.thuonghieu.Count; i++)
              {
                arraythuonghieu.Add(lsp.thuonghieu[i]);
              }
              document.Add("thuonghieu", arraythuonghieu);
              arraythuonghieu = new BsonArray();
              for (int i = 0; i < lsp.tieuchidanhgia.Count; i++)
              {
                arraythuonghieu.Add(lsp.tieuchidanhgia[i]);
              }

              BsonDocument d = new BsonDocument();
              BsonArray arraydactrung = new BsonArray();
              for (int i = 0; i < lsp.dactrung.Count; i = i + 2)
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
              document.Add("tieuchidanhgia", arraythuonghieu);
              _lspService.insertls(document);
              return Ok(lsp);
            }
            catch(Exception e)
            {
              return NoContent();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult deleteloaisanpham(int id)
        {
          try
          {
            if (checkktid(id) == true)
            {
              var deletefilter = Builders<BsonDocument>.Filter.Eq("_id", id);
              _lspService.deletels(deletefilter);
              return Ok(true);
            }
            return NoContent();
          }
          catch {
            return NoContent();
          }
        }

        [Route("updatelsp")]
        [HttpPut]
        public IActionResult updatesp(int _id, loaisanpham lsp)
        {
            try
            {
              if (checkktid(_id) == true)
              {
                var filter = Builders<loaisanpham>.Filter.Eq("_id", _id);
                BsonArray arraythuonghieu = new BsonArray();
                for (int i = 0; i < lsp.thuonghieu.Count; i++)
                {
                  arraythuonghieu.Add(lsp.thuonghieu[i]);
                }

                BsonArray arraydactrung = new BsonArray();
                for (int i = 0; i < lsp.dactrung.Count; i = i + 2)
                {
                  BsonArray arrayctdactrung = new BsonArray();
                  if (i < lsp.dactrung.Count)
                  {
                    string[] arrstringdactrung = lsp.dactrung[i + 1].ToString().Split(',');
                    for (int j = 0; j < arrstringdactrung.Length; j++)
                    {
                      arrayctdactrung.Add(arrstringdactrung[j]);
                    }
                  }
                  var documentnddactrung = new BsonDocument { };
                  documentnddactrung.Add(lsp.dactrung[i].ToString(), arrayctdactrung);
                  arraydactrung.AsBsonArray.Add(BsonValue.Create(documentnddactrung));
                }

                if (lsp.tieuchidanhgia == null || lsp.tieuchidanhgia.Count == 0)
                {
                  var update = Builders<loaisanpham>.Update.Combine(
                                 Builders<loaisanpham>.Update.Set("tendanhmuc", lsp.tendanhmuc),
                                 Builders<loaisanpham>.Update.Set("thuonghieu", arraythuonghieu),
                                 Builders<loaisanpham>.Update.Set("dactrung", arraydactrung)
                    );
                  _lspService.Updatelsp(filter, update);
                }
                else
                {
                  BsonArray arraytieuchidanhgia = new BsonArray();
                  for (int i = 0; i < lsp.tieuchidanhgia.Count; i++)
                  {
                    arraytieuchidanhgia.Add(lsp.tieuchidanhgia[i]);
                  }
                  var update = Builders<loaisanpham>.Update.Combine(
                                 Builders<loaisanpham>.Update.Set("tendanhmuc", lsp.tendanhmuc),
                                 Builders<loaisanpham>.Update.Set("thuonghieu", arraythuonghieu),
                                 Builders<loaisanpham>.Update.Set("dactrung", arraydactrung)
                    );
                  _lspService.Updatelsp(filter, update);
                }
                return Ok(lsp);
              }
              return NoContent();
            }
            catch (Exception e)
            {
              throw;
            }
        }
        [Route("check_tieuchidanhgia")]
        public List<string> check_tieuchidanhgia(int _id)
        {
            return _lspService.check_tieuchidanhgia(_id);
        }

        public Boolean checkktid(int id)
        {
          try
          {
            var s = _lspService.Getlsp().Find(x => x._id == id);
            if (s == null)
            {
              return false;
            }
            else
              return true;
          }
          catch
          {
            return false;
          }
        }
  }
}
