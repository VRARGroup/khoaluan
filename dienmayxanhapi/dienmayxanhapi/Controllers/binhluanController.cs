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
    public class binhluanController : ControllerBase
    {
      private readonly dienmayxanhdbcontext _blService;
      private readonly ISignalService _signalService;
      private readonly IHubContext<SignalHub> _hubContext;
      public binhluanController(dienmayxanhdbcontext blService, ISignalService signalService, IHubContext<SignalHub> hubContext)
      {
        _blService = blService;
        _signalService = signalService;
        _hubContext = hubContext;
      }

      [HttpGet]
      public ActionResult<List<binhluan>> Getallbinhluan()
      {
        return (_blService.Getbinhluan());
      }

      [Route ("binhluan_idsp")]
      [HttpGet]
      public ActionResult<List<binhluan>> Get(int _id)
      {
        return (_blService.Getdetaibinhluan_idsp(_id));
      }

      [HttpPost]
      public ActionResult<BsonDocument> Create(binhluan b)
      {
        try
        {
            
            int id = 0;
            if (_blService.Getbinhluan() != null && _blService.Getbinhluan().Count != 0)
            {
              id = Convert.ToInt32(_blService.Getbinhluan().LastOrDefault()._id + 1);
            }
            List<binhluanphu> blp = new List<binhluanphu>();
            b._id = id;
            b.binhluanphu = blp;
            b.ngaybinhluan = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 0, 0, 0, DateTimeKind.Utc);
            _blService.insertbinhluan(b);
            var saveResult = _signalService.SaveSignalAsync(b);
            _hubContext.Clients.All.SendAsync("SignalMessageReceived", b);
            return Ok(b);
        }
        catch(Exception e)
        {
          return NoContent();
        }
      }

    [HttpPut("{_id}")]
    public ActionResult<List<binhluan>> putbinhluan(int _id, binhluan b)
    {
      try
      {
        if(checkktid(_id)==true)
        { 
          b.binhluanphu[0].ngaybinhluanphu = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 0, 0, 0, DateTimeKind.Utc);
          var filter = Builders<binhluan>.Filter.Eq("_id", _id);
          BsonArray arraydsq = new BsonArray();
          var update = Builders<binhluan>.Update.Push(x => x.binhluanphu, b.binhluanphu[0]);
          var saveResult = _signalService.SaveSignalAsync(b);
          _hubContext.Clients.All.SendAsync("SignalMessageReceived", b);
          if (_blService.Updatebl(filter, update) == true)
          {
            return Ok(b);
          }
        }
        return NoContent();
      }
      catch
      {
        return NoContent();
      }

    }

    [HttpGet("get_binhluan_1day_idsp")]
    public ActionResult<List<binhluan>> Getfillter_binhluan_1day_theo_idsp(int _id_sp)
    {
      return (_blService.Getfillter_binhluan_1day_theo_idsp(_id_sp));
    }

    [HttpGet("get_binhluan_choseday_idsp")]
    public ActionResult<List<binhluan>> Getfillter_binhluan_choseday_theo_idsp(int _id_sp, String d)
    {
      return (_blService.Getfillter_binhluan_choseday_theo_idsp(_id_sp,d));
    }

    public Boolean checkktid(int id)
    {
      try
      {
        var s = _blService.Getbinhluan().Find(x => x._id == id);
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
