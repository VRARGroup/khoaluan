using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dienmayxanhapi.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using dienmayxanhapi.Hubservice;
using dienmayxanhapi.SignalRHubs;
using Microsoft.AspNetCore.SignalR;

namespace dienmayxanhapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class danhgiaController : ControllerBase
    {
      private readonly dienmayxanhdbcontext _dgService;
      private readonly ISignalService _signalService;
      private readonly IHubContext<SignalHub> _hubContext;
      public danhgiaController(dienmayxanhdbcontext dgService, ISignalService signalService, IHubContext<SignalHub> hubContext)
      {
        _dgService = dgService;
        _signalService = signalService;
        _hubContext = hubContext;
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
            var saveResult = _signalService.SaveSignaldgAsync(dg);
            _hubContext.Clients.All.SendAsync("Signaldg", dg);
            return Ok(true);
        }
        catch(Exception e)
        {
          return NoContent();
        }
      }

      [HttpPut("{_id}")]
      public ActionResult<List<danhgia>> putdanhgia(int _id, danhgia g)
      {
        try
        {
          if (checkktid(_id) == true)
          {
            g.danhgiaphu[0].ngaydanhgiaphu = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 0, 0, 0, DateTimeKind.Utc);
            var filter = Builders<danhgia>.Filter.Eq("_id", _id);
            BsonArray arraydsq = new BsonArray();
            var update = Builders<danhgia>.Update.Push(x => x.danhgiaphu, g.danhgiaphu[0]);
            if (_dgService.Updatedanhgia(filter, update) == true)
            {
              var saveResult = _signalService.SaveSignaldgAsync(g);
              _hubContext.Clients.All.SendAsync("Signaldg", g);
              return Ok(true);
            }
          }
          return NoContent();
        }
        catch
        {
          return NoContent();
        }

      }

      [HttpGet("get_danhgia_1day")] 
      public ActionResult<List<danhgia>> Getfillter_danhgia_1day()
      {
        return (_dgService.Getfillter_danhgia_1day());
      }

      [HttpGet("get_danhgia_1day_idsp")] 
      public ActionResult<List<danhgia>> Getfillter_danhgia_1day_theo_idsp(int _id_sp)
      {
        return (_dgService.Getfillter_danhgia_1day_theo_idsp(_id_sp));
      }

      [HttpGet("get_danhgia_choseday_idsp")]
      public ActionResult<List<danhgia>> Getfillter_danhgia_choseday_theo_idsp(int _id_sp, String d)
      {
        return (_dgService.Getfillter_danhgia_choseday_theo_idsp(_id_sp, d));
      }

      public Boolean checkktid(int id)
      {
        try
        {
          var s = _dgService.Getdg().Find(x => x._id == id);
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
