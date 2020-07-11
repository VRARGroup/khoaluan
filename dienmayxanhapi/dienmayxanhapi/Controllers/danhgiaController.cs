using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dienmayxanhapi.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

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

      [HttpPost]
      public ActionResult<BsonDocument> Create(danhgia dg)
      {
      try
      {
        BsonArray arrayhinh = new BsonArray();
        for (int i = 0; i < dg.hinh.Count; i++)
        {
          arrayhinh.Add(dg.hinh[i]);
        }
        BsonArray arraytieuchidanhgia = new BsonArray();
        if (dg.tieuchidanhgia != null)
        {
          arraytieuchidanhgia.Add("");
        }
        BsonArray arraydanhgiaphu = new BsonArray();
        int id = 0;
        if (_dgService.Getdg() != null && _dgService.Getdg().Count != 0)
        {
          id = Convert.ToInt32(_dgService.Getdg().LastOrDefault()._id + 1);
        }
        var document = new BsonDocument {
                  { "_id", id},
                  { "sosao" , 0},
                  { "ten" , dg.ten},
                  { "sdt" , dg.sdt},
                  { "email" , dg.email},
                  { "noidung" , dg.noidung},
                  { "hinh" , arrayhinh},
                  { "luotthich", dg.luotthich},
                  { "danhgiaphu" , arraydanhgiaphu},
                  { "tieuchidanhgia" , arraytieuchidanhgia},
                  { "_id_sanpham" , dg._id_sanpham}
                  };
        _dgService.insertdg(document);
        return NoContent();
      }
      catch(Exception e)
      {
        return NoContent();
      }
      }


  }
}
