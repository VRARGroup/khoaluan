using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dienmayxanhapi.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Core.Authentication;

namespace dienmayxanhapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class taikhoanController : ControllerBase
    {
        private readonly dienmayxanhdbcontext _tkService;
        public taikhoanController(dienmayxanhdbcontext tkService)
        {
            _tkService = tkService;
        }

        [HttpGet]
        public ActionResult<List<taikhoan>> Get()
        {
          return (_tkService.Gettk());
        }

        [HttpGet("{_id}")]
        public ActionResult<List<taikhoan>> Getcttk(int _id)
        {
          return (_tkService.Getdetailtk_id(_id));
        }

        [Route("detailtkgroup")]
        [HttpGet]
        public ActionResult<List<taikhoan>> Getcttkgroup()
        {
          return (_tkService.Getgrouptk());
        }
        
        [Route("detailtk_id_group")]
        [HttpGet]
        public ActionResult<List<taikhoan>> Gettk_id_group(int _id_group)
        {
          return (_tkService.Getdetailtk_id_group(_id_group));
        }

        [Route("detailtk")]
        [HttpGet]
        public ActionResult<List<taikhoan>> Get(string u, string p )
        {
            var tttk = _tkService.Getdetailtk(u, p);
            if (tttk.Count > 0)
            {
              var filter = Builders<taikhoan>.Filter.Eq("_id", tttk.FirstOrDefault()._id);
              var update = Builders<taikhoan>.Update.Combine(
                           Builders<taikhoan>.Update.Set("hoatdong", true)
                  );
              _tkService.Updatetk(filter, update);
              return (_tkService.Getdetailtk(u, p));
            }
            return null;
        }

        [Route("dangxuattk")]
        [HttpPut]
        public ActionResult<List<taikhoan>> puthoatdong(int _id)
        {
          try
          {
            if (checkktid(_id) == true)
            {
              var filter = Builders<taikhoan>.Filter.Eq("_id", _id);
              var update = Builders<taikhoan>.Update.Combine(
                           Builders<taikhoan>.Update.Set("hoatdong", false)
                  );
              _tkService.Updatetk(filter, update);
              return Ok(true);
            }
            return NoContent();
          }
          catch
          {
            return NoContent();
          }
        }

        [Route("quyen")]
        [HttpPut]
        public ActionResult<List<taikhoan>> putquyen(int _id, taikhoan gp)
        {
          try
          {
            if (checkktid(_id) == true)
            {
              var filter = Builders<taikhoan>.Filter.Eq("_id", _id);
              var update = Builders<taikhoan>.Update.Combine(
                           Builders<taikhoan>.Update.Set("hoatdong", gp.hoatdong),
                           Builders<taikhoan>.Update.Set("giayphep", gp.giayphep)
                  );
              _tkService.Updatetk(filter, update);
              return Ok(true);
            }
            return NoContent();
          }
          catch
          {
            return NoContent();
          }
        }

        [Route("doipass")]
        [HttpPut]
        public ActionResult<List<taikhoan>> putpass(int _id, taikhoan gp)
        {
          try
          {
            if (checkktid(_id) == true)
            {
              var filter = Builders<taikhoan>.Filter.Eq("_id", _id);
              var update = Builders<taikhoan>.Update.Combine(
                           Builders<taikhoan>.Update.Set("password", gp.password)
                  );
              _tkService.Updatetk(filter, update);
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
        public ActionResult<BsonDocument> Create(taikhoan tk)
        {
            try
            {
              int id = 0;
              if (_tkService.Gettk() != null && _tkService.Gettk().Count != 0)
              {
                id = Convert.ToInt32(_tkService.Gettk().LastOrDefault()._id + 1);
              }
              var document = new BsonDocument {
                        { "_id", id},
                        { "username" , tk.username},
                        { "password" , tk.password},
                        { "tennv" , tk.tennv },
                        { "email" , tk.email },
                        { "hoatdong" , tk.hoatdong},
                        { "giayphep" , tk.giayphep},
                        { "_id_group" , tk._id_group}
                        };
              _tkService.inserttk(document);
              return Ok(true);
            }
            catch(Exception e)
            {
              return NoContent();
            }
        }

        [HttpPut("{_id}")]
        public ActionResult<taikhoan> Put(int _id, taikhoan tk)
        {
          try
          {
            if (checkktid(_id) == true)
            {
              var filter = Builders<taikhoan>.Filter.Eq("_id", _id);
              var update = Builders<taikhoan>.Update.Combine(
                            Builders<taikhoan>.Update.Set("username", tk.username),
                            Builders<taikhoan>.Update.Set("password", tk.password),
                            Builders<taikhoan>.Update.Set("tennv", tk.tennv),
                            Builders<taikhoan>.Update.Set("email", tk.email),
                            Builders<taikhoan>.Update.Set("hoatdong", tk.hoatdong),
                            Builders<taikhoan>.Update.Set("giayphep", tk.giayphep),
                            Builders<taikhoan>.Update.Set("_id_group", tk._id_group)

                          );
              _tkService.Updatetk(filter, update);
              return Ok(true);
            }
            return NoContent();
          }
          catch {
            return NoContent();
          }
        }

        [HttpDelete("{id}")]
        public IActionResult deletetaikhoan(int id)
        {
          try
          {
            if(checkktid(id)==true)
            { 
              var deletefilter = Builders<BsonDocument>.Filter.Eq("_id", id);
              _tkService.deletetk(deletefilter);
              return Ok(true);
            }
            return NoContent();
          }
          catch
          {
            return NoContent();
          }
        }

        [Route("gettennv")]
        [HttpGet]
        public ActionResult<List<taikhoan>> gettennv(int id)
        {
          return _tkService.Gettennv_id(id);
        }
        public Boolean checkktid(int id)
        {
          try
          {
            var s = _tkService.Gettk().Find(x => x._id == id);
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
