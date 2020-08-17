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
using static dienmayxanhapi.dienmayxanhdbcontext;

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

      [Route ("duyetdanhgia")]
      [HttpPut]

      public ActionResult<List<danhgia>> duyetdanhgia(danhgia g)
      {
        try
        {
          if (checkktid(Convert.ToInt32(g._id)) == true)
          {
            g.kiemduyet = true;
            var filter = Builders<danhgia>.Filter.Eq("_id", g._id);
            var update = Builders<danhgia>.Update.Combine(
                         Builders<danhgia>.Update.Set("kiemduyet",true)
                         );
            if (_dgService.Updatedanhgia(filter, update) == true)
            {
              var star1 = (_dgService.Getdg().Where(x => x.sosao == 1 && x._id_sanpham == g._id_sanpham).ToList().Sum(x => x.sosao));
              var star2 = (_dgService.Getdg().Where(x => x.sosao == 2 && x._id_sanpham == g._id_sanpham).ToList().Sum(x => x.sosao));
              var star3 = (_dgService.Getdg().Where(x => x.sosao == 3 && x._id_sanpham == g._id_sanpham).ToList().Sum(x => x.sosao));
              var star4 = (_dgService.Getdg().Where(x => x.sosao == 4 && x._id_sanpham == g._id_sanpham).ToList().Sum(x => x.sosao));
              var star5 = (_dgService.Getdg().Where(x => x.sosao == 5 && x._id_sanpham == g._id_sanpham).ToList().Sum(x => x.sosao));
              double sumstar = Math.Round((Convert.ToDouble(star1) + Convert.ToDouble(star2) + Convert.ToDouble(star3) + Convert.ToDouble(star4) + Convert.ToDouble(star5)) / Convert.ToDouble(_dgService.Getdetaildg(Convert.ToInt32(g._id_sanpham)).Count));
              sumstar = sumstar + Convert.ToDouble(_dgService.Getdetailsp(Convert.ToInt32(g._id_sanpham)).Find(x => true).sosao);
              if(sumstar>5)
              {
                sumstar = 5;
              }
              var filterdt = Builders<sanphamdienthoai>.Filter.Eq("_id", g._id_sanpham);
              var updatedt = Builders<sanphamdienthoai>.Update.Combine(
                     Builders<sanphamdienthoai>.Update.Set("sosao", Convert.ToInt32(sumstar))
                 );
              _dgService.Update(filterdt, updatedt);
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

      [Route ("duyetdanhgiaphu")]
      [HttpPut]

      public ActionResult<List<danhgia>> duyetdanhgiaphu(int idex, danhgia g)
      {
        try
        {
          try
          {
            g.danhgiaphu[idex].kiemduyetphu = true;
          }
          catch
          {
            return NoContent();
          }
          if (checkktid(Convert.ToInt32(g._id)) == true)
          {
            g.kiemduyet = false;
            g.ten = null;
            var filter = Builders<danhgia>.Filter.Where(x => x._id == g._id);
            var update = Builders<danhgia>.Update.Set(x => x.danhgiaphu[idex].kiemduyetphu, true);
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

      [Route ("get_danhgia_1day")]
      [HttpGet] 
      public async Task<List<bangghepsanphamdanhgia_custom>> Getfillter_danhgia_1day()
      {
        return (await _dgService.Getfillter_danhgia_1day());
      }

      [Route ("get_danhgia_choseday_idsp_day")]
      [HttpGet] 
      public async Task<List<bangghepsanphamdanhgia_custom>> Getfillter_danhgia_1day_idsp(int _id_sp, string d)
      {
        return (await _dgService.Getfillter_danhgia_1day_idsp(_id_sp, d));
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

      [HttpDelete("{id}")]
      public IActionResult deletedg(int id)
      {
        try
        {
          var b = _dgService.Getdg().Where(x => x._id == id).FirstOrDefault();
          if (checkktid(id) == true)
          {
            var deletefilter = Builders<danhgia>.Filter.Eq("_id", id);
            _dgService.deletedg(deletefilter);
            b.kiemduyet = false;
            var saveResult = _signalService.SaveSignaldgAsync(b);
            _hubContext.Clients.All.SendAsync("Signaldg", b);
          return Ok(true);
          }
          return NoContent();
        }
        catch
        {
          return NoContent();
        }
      }

    [Route("delete_danhgiaphu")]
    [HttpPut]
    public IActionResult deletedgp(int id, int idex)
    {
      try
      {
        var b = _dgService.Getdg().Where(x => x._id == id).FirstOrDefault();
        if (checkktid(id) == true)
        {
          var filter = Builders<danhgia>.Filter.Eq(x => x._id, id);
          var update = Builders<danhgia>.Update.Pull("danhgiaphu", b.danhgiaphu[idex]);

          if (_dgService.Updatedanhgia(filter, update) == true)
          {
            idex myObj = new idex();
            myObj.x = "xóa đánh giá phụ";
            myObj.id = id;
            myObj.i = idex;
            
            var saveResult = _signalService.SaveSignalidexdgAsync(myObj);
            _hubContext.Clients.All.SendAsync("Signaldg", myObj);
          }
          return Ok(true);
        }
        return NoContent();
      }
      catch
      {
        return NoContent();
      }
    }


  }
}
