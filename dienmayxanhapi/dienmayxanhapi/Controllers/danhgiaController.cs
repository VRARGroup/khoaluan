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
    public class danhgiaController : ControllerBase
    {
      private readonly dienmayxanhdbcontext _dgService;
      public danhgiaController(dienmayxanhdbcontext dgService)
      {
        _dgService = dgService;
      }

      [HttpGet]
      public ActionResult<List<danhgia>> Get()
      {
        return (_dgService.Getdg());
      }

      [HttpGet("{_id}")]
      public ActionResult<List<danhgia>> Getdetail(int _id)
      {
        return (_dgService.Getdetaildg(_id));
      }

      [HttpPost]
      public ActionResult<BsonDocument> Create(danhgia dg)
      {
        try
        {
          //BsonArray arrayhinh = new BsonArray();
          //for (int i = 0; i < dg.hinh.Count; i++)
          //{
          //  arrayhinh.Add(dg.hinh[i]);
          //}
          //BsonArray arraytieuchidanhgia = new BsonArray();
          //if (dg.tieuchidanhgia != null)
          //{
          //  for (int i = 0; i < dg.tieuchidanhgia.Count; i++)
          //  {
          //    arraytieuchidanhgia.Add(dg.tieuchidanhgia[i]);
          //  }

          //}
          //BsonArray arraydanhgiaphu = new BsonArray();
          //int id = 0;
          //if (_dgService.Getdg() != null && _dgService.Getdg().Count != 0)
          //{
          //  id = Convert.ToInt32(_dgService.Getdg().LastOrDefault()._id + 1);
          //}
          //var d = DateTime.Now;
          //var document = new BsonDocument {
          //            { "_id", id},
          //            { "sosao" , dg.sosao},
          //            { "ten" , dg.ten},
          //            { "sdt" , dg.sdt},
          //            { "email" , dg.email},
          //            { "noidung" , dg.noidung},
          //            { "hinh" , arrayhinh},
          //            { "luotthich", dg.luotthich},
          //            { "danhgiaphu" , arraydanhgiaphu},
          //            { "tieuchidanhgia" , arraytieuchidanhgia},
          //            { "_id_sanpham" , dg._id_sanpham},
          //            { "ngaydanhgia" , DateTime.Now}
          //            };
            int id = 0;
            if (_dgService.Getdg() != null && _dgService.Getdg().Count != 0)
            {
              id = Convert.ToInt32(_dgService.Getdg().LastOrDefault()._id + 1);
            }
            List<danhgiaphu> dgp = new List<danhgiaphu>();
            dg._id = id;
            dg.danhgiaphu = dgp;
            dg.ngaydanhgia = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 0, 0, 0, DateTimeKind.Utc);
            _dgService.insertdg(dg);
            return NoContent();
        }
        catch(Exception e)
        {
          return NoContent();
        }
      }

      [HttpPut("{_id}")]
      public ActionResult<List<danhgia>> putdanhgia(int _id, danhgia g)
      {
        var filter = Builders<danhgia>.Filter.Eq("_id", _id);
        BsonArray arraydsq = new BsonArray();
        var update = Builders<danhgia>.Update.Push(x => x.danhgiaphu, g.danhgiaphu[0]);
        if (_dgService.Updatedanhgia(filter, update) == true)
        {
          return NoContent();
        }
        return NoContent();

      }


  }
}
