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
    public class danhsachquyenController : ControllerBase
    {
        private readonly dienmayxanhdbcontext _dsqService;
        public danhsachquyenController(dienmayxanhdbcontext dsqService)
        {
          _dsqService = dsqService;
        }

        [HttpGet]
        public ActionResult<List<danhsachquyen>> Get()
        {
          return (_dsqService.Getdsq());
        }

        [HttpGet("{id}")]
        public ActionResult<List<danhsachquyen>> Getdetaildanhsachquyen(int id)
        {
          return (_dsqService.Getdetaildsq(id));
        }

        [HttpDelete("{id}")]
        public IActionResult deletequyen(int id)
        {
          try
          {
            if (checkktid(id))
            {
              var deletefilter = Builders<BsonDocument>.Filter.Eq("_id", id);
              _dsqService.deletedsq(deletefilter);
              return Ok(true);
            }
            return NoContent();
          }
          catch
          {
            return NoContent();
          }
        }

        [HttpPost]
        public ActionResult<BsonDocument> Create(danhsachquyen dsq)
        {
          try
          {
            int id = 0;
            if (_dsqService.Get() != null && _dsqService.Get().Count != 0)
            {
              id = Convert.ToInt32(_dsqService.Get().LastOrDefault()._id + 1);
            }
            var document = new BsonDocument {
                          { "_id", id},
                          { "tenquyen" , dsq.tenquyen}
                          };
            _dsqService.insertdsq(document);
            return Ok(dsq);
          }
          catch(Exception e)
          {
            return NoContent();
          }
        }
        public Boolean checkktid(int id)
        {
          try
          {
            var s = _dsqService.Getdsq().Find(x => x._id == id);
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
