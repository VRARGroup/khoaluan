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

      [Route ("danhgia")]
      [HttpGet]
      public ActionResult<List<danhgia>> Getdetaildangia_allidsp(int _id)
      {
        return (_dgService.Getalldetaildg_idsp(_id));
      }

      [Route ("danhgiaphu")]
      [HttpGet]
      public ActionResult<List<danhgiaphu>> Getdangiaphu(int _id)
      {
        return (_dgService.Getdetaildgphu(_id));
      }


      [HttpPost]
      public ActionResult<BsonDocument> Create(danhgia dg)
      {
        try
        {
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
        g.danhgiaphu[0].ngaydanhgiaphu = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 0, 0, 0, DateTimeKind.Utc);
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
