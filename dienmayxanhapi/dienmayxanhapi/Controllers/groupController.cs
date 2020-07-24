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
    public class groupController : ControllerBase
    {
      private readonly dienmayxanhdbcontext _gService;
      public groupController(dienmayxanhdbcontext gService)
      {
        _gService = gService;
      }

      [HttpGet]
      public ActionResult<List<group>> Get()
      {
        return (_gService.Getgroup());
      }

      [HttpGet("{_id}")]
      public ActionResult<List<group>> Getdetailgroup(int _id)
      {
        return (_gService.Getdetailgroup(_id));
      }

      [HttpPut("{_id}")]
      public ActionResult<List<group>> putgroup(int _id, group g)
      {
        try
        {
          if (checkktid(_id) == true)
          {
            var filter = Builders<group>.Filter.Eq("_id", _id);
            BsonArray arraydsq = new BsonArray();
            for (int i = 0; i < g.danhsachquyentruycap.Count; i++)
            {
              var hinh = new BsonDocument().Add("_id_quyen", g.danhsachquyentruycap[i]._id_quyen);
              arraydsq.AsBsonArray.Add(BsonValue.Create(hinh));
            }
            var update = Builders<group>.Update.Combine(
                         Builders<group>.Update.Set("danhsachquyentruycap", arraydsq)
                );
            if (_gService.Updategroup(filter, update) == true)
            {
              return Ok(g);
            }
          }
          return NoContent();
        }
        catch
        {
          return NoContent();
        }

      }
      public Boolean checkktid(int id)
      {
        try
        {
          var s = _gService.Getgroup().Find(x => x._id == id);
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
