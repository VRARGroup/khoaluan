using System;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using Newtonsoft.Json.Serialization;

namespace dienmayxanhapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class sanphamdienthoaiController : ControllerBase
    {
        private readonly dienmayxanhdbcontext _spdtService;
        public sanphamdienthoaiController(dienmayxanhdbcontext spdtService)
        {
            _spdtService = spdtService;
        }

        [HttpGet]
        public ActionResult<List<sanphamdienthoai>> Get()
        {
            return (_spdtService.Get());
        }

        [HttpGet("{id}")]
        public ActionResult<List<sanphamdienthoai>> Getdetallsp(int id)
        {
          return (_spdtService.Getdetailsp(id));
        }

        [Route("hotsp")]
        [HttpGet]
        public ActionResult<List<sanphamdienthoai>> Gethotsp()
        {
          var dl = _spdtService.Gethotsp().Count();
          return (_spdtService.Gethotsp());
        }

        [Route("getsp")]
        [HttpGet]
        public ActionResult<List<sanphamdienthoai>> Getfillter(String tensp)
        {
            return (_spdtService.Getfillter(tensp));
        }

        [Route("getsp_idloaisp")]
        [HttpGet]
        public ActionResult<List<sanphamdienthoai>> Getsp_lspfillter(string tensp)
        {
          string[] arrstring = tensp.Split(',');
          return (_spdtService.Gettsp_lspfillter(Convert.ToInt32(arrstring[0]), arrstring[1]));
        }

        [Route("getidsploaisp")]
        [HttpGet]
        public ActionResult<List<sanphamdienthoai>> Getfillterid_loaisp(int idloaisap)
        {
          return (_spdtService.Getfillterspidlsp(idloaisap));
        }

    //[HttpPost]
    //public ActionResult<BsonDocument> Create(sanphamdienthoai spdt)
    //{
    //    BsonArray arrayhinhanh = new BsonArray();
    //    for (int i = 0; i < spdt.hinh.Count; i++)
    //    {
    //        var hinh = new BsonDocument().
    //               Add("hinhanh", spdt.hinh[i].hinhanh.ToString()).
    //               Add("mota", spdt.hinh[i].mota.ToString());
    //        arrayhinhanh.AsBsonArray.Add(BsonValue.Create(hinh));
    //    }

    //    //var d = spdt.thongsokythuat[4].GetProperty("Bộ nhớ & Lưu trữ").Lenght;
    //    var document = new BsonDocument {
    //         { "_id", spdt._id},
    //         { "ten" , spdt.ten},
    //         { "thuonghieu", spdt.thuonghieu},
    //         { "hinh", arrayhinhanh},
    //         { "dacdiemnoibat",spdt.dacdiemnoibat},
    //         { "giaban", spdt.giaban},
    //         { "giamgia", spdt.giamgia},
    //         { "sosao", spdt.sosao},
    //         { "_id_loaisanpham", spdt._id_loaisanpham}
    //         };
    //    //var v=spdt.thongsokythuat[4].GetProperty("Bộ nhớ & Lưu trữ");
    //    var documentthngsokythuatmanhinh = new BsonDocument { };
    //    BsonArray arraymanhinh = new BsonArray();
    //    var remark = new BsonDocument().Add("Công nghệ màn hình", spdt.thongsokythuat[0].GetProperty("Màn hình")[0].GetProperty("Công nghệ màn hình").ToString());
    //    arraymanhinh.AsBsonArray.Add(BsonValue.Create(remark));
    //    remark = new BsonDocument().Add("Độ phân giải", spdt.thongsokythuat[0].GetProperty("Màn hình")[1].GetProperty("Độ phân giải").ToString());
    //    arraymanhinh.AsBsonArray.Add(BsonValue.Create(remark));
    //    remark = new BsonDocument().Add("Màn hình rộng", spdt.thongsokythuat[0].GetProperty("Màn hình")[2].GetProperty("Màn hình rộng").ToString());
    //    arraymanhinh.AsBsonArray.Add(BsonValue.Create(remark));
    //    remark = new BsonDocument().Add("Mặt kính cảm ứng", spdt.thongsokythuat[0].GetProperty("Màn hình")[3].GetProperty("Mặt kính cảm ứng").ToString());
    //    arraymanhinh.AsBsonArray.Add(BsonValue.Create(remark));
    //    documentthngsokythuatmanhinh.Add("Màn hình",arraymanhinh);

    //    var documentthngsokythuatcamerasau = new BsonDocument { };
    //    BsonArray arraycamerasau = new BsonArray();
    //    var remark1 = new BsonDocument().Add("Độ phân giải", spdt.thongsokythuat[1].GetProperty("Camera sau")[0].GetProperty("Độ phân giải").ToString());
    //    arraycamerasau.AsBsonArray.Add(BsonValue.Create(remark1));
    //    remark1 = new BsonDocument().Add("Quay Phim", spdt.thongsokythuat[1].GetProperty("Camera sau")[1].GetProperty("Quay Phim").ToString());
    //    arraycamerasau.AsBsonArray.Add(BsonValue.Create(remark1));
    //    remark1 = new BsonDocument().Add("Đèn Flash", spdt.thongsokythuat[1].GetProperty("Camera sau")[2].GetProperty("Đèn Flash").ToString());
    //    arraycamerasau.AsBsonArray.Add(BsonValue.Create(remark1));
    //    remark1 = new BsonDocument().Add("Chụp ảnh nâng cao", spdt.thongsokythuat[1].GetProperty("Camera sau")[3].GetProperty("Chụp ảnh nâng cao").ToString());
    //    arraycamerasau.AsBsonArray.Add(BsonValue.Create(remark1));
    //    documentthngsokythuatcamerasau.Add("Camera sau", arraycamerasau);

    //    var documentthngsokythuatcameratrc = new BsonDocument { };
    //    BsonArray arraycameratrc = new BsonArray();
    //    var remark2 = new BsonDocument().Add("Độ phân giải", spdt.thongsokythuat[2].GetProperty("Camera trước")[0].GetProperty("Độ phân giải").ToString());
    //    arraycameratrc.AsBsonArray.Add(BsonValue.Create(remark2));
    //    remark2 = new BsonDocument().Add("Videocall", spdt.thongsokythuat[2].GetProperty("Camera trước")[1].GetProperty("Videocall").ToString());
    //    arraycameratrc.AsBsonArray.Add(BsonValue.Create(remark2));
    //    remark2 = new BsonDocument().Add("Thông tin khác", spdt.thongsokythuat[2].GetProperty("Camera trước")[2].GetProperty("Thông tin khác").ToString());
    //    arraycameratrc.AsBsonArray.Add(BsonValue.Create(remark2));
    //    documentthngsokythuatcameratrc.Add("Camera trước", arraycameratrc);

    //    var documentthngsokythuathdhcpu = new BsonDocument { };
    //    BsonArray arrayhdhcpu = new BsonArray();
    //    var remark3 = new BsonDocument().Add("Hệ điều hành", spdt.thongsokythuat[3].GetProperty("Hệ điều hành - CPU")[0].GetProperty("Hệ điều hành").ToString());
    //    arrayhdhcpu.AsBsonArray.Add(BsonValue.Create(remark3));
    //    remark3 = new BsonDocument().Add("Chipset (hãng SX CPU)", spdt.thongsokythuat[3].GetProperty("Hệ điều hành - CPU")[1].GetProperty("Chipset (hãng SX CPU)").ToString());
    //    arrayhdhcpu.AsBsonArray.Add(BsonValue.Create(remark3));
    //    remark3 = new BsonDocument().Add("Tốc độ CPU", spdt.thongsokythuat[3].GetProperty("Hệ điều hành - CPU")[2].GetProperty("Tốc độ CPU").ToString());
    //    arrayhdhcpu.AsBsonArray.Add(BsonValue.Create(remark3));
    //    remark3 = new BsonDocument().Add("Chip đồ họa (GPU)", spdt.thongsokythuat[3].GetProperty("Hệ điều hành - CPU")[3].GetProperty("Chip đồ họa (GPU)").ToString());
    //    arrayhdhcpu.AsBsonArray.Add(BsonValue.Create(remark3));
    //    documentthngsokythuathdhcpu.Add("Hệ điều hành - CPU", arrayhdhcpu);

    //    var documentthngsokythuatbnlt = new BsonDocument { };
    //    BsonArray arraybnlt = new BsonArray();
    //    var remark4 = new BsonDocument();
    //    remark4 = new BsonDocument().Add("RAM", spdt.thongsokythuat[4].GetProperty("Bộ nhớ & Lưu trữ")[0].GetProperty("RAM").ToString());
    //    arraybnlt.AsBsonArray.Add(BsonValue.Create(remark4));
    //    remark4 = new BsonDocument().Add("Bộ nhớ trong", spdt.thongsokythuat[4].GetProperty("Bộ nhớ & Lưu trữ")[1].GetProperty("Bộ nhớ trong").ToString());
    //    arraybnlt.AsBsonArray.Add(BsonValue.Create(remark4));
    //    remark4 = new BsonDocument().Add("Bộ nhớ còn lại (khả dụng)", spdt.thongsokythuat[4].GetProperty("Bộ nhớ & Lưu trữ")[2].GetProperty("Bộ nhớ còn lại (khả dụng)").ToString());
    //    arraybnlt.AsBsonArray.Add(BsonValue.Create(remark4));
    //    documentthngsokythuatbnlt.Add("Bộ nhớ & Lưu trữ", arraybnlt);

    //    var documentthngsokythuatkn = new BsonDocument { };
    //    BsonArray arraykn = new BsonArray();
    //    var remark5 = new BsonDocument().Add("Mạng di động", spdt.thongsokythuat[5].GetProperty("Kết nối")[0].GetProperty("Mạng di động").ToString());
    //    arraykn.AsBsonArray.Add(BsonValue.Create(remark5));
    //    remark5 = new BsonDocument().Add("SIM", spdt.thongsokythuat[5].GetProperty("Kết nối")[1].GetProperty("SIM").ToString());
    //    arraykn.AsBsonArray.Add(BsonValue.Create(remark5));
    //    remark5 = new BsonDocument().Add("HOT", spdt.thongsokythuat[5].GetProperty("Kết nối")[2].GetProperty("HOT").ToString());
    //    arraykn.AsBsonArray.Add(BsonValue.Create(remark5));
    //    remark5 = new BsonDocument().Add("Wifi", spdt.thongsokythuat[5].GetProperty("Kết nối")[3].GetProperty("Wifi").ToString());
    //    arraykn.AsBsonArray.Add(BsonValue.Create(remark5));
    //    remark5 = new BsonDocument().Add("GPS", spdt.thongsokythuat[5].GetProperty("Kết nối")[4].GetProperty("GPS").ToString());
    //    arraykn.AsBsonArray.Add(BsonValue.Create(remark5));
    //    remark5 = new BsonDocument().Add("Bluetooth", spdt.thongsokythuat[5].GetProperty("Kết nối")[5].GetProperty("Bluetooth").ToString());
    //    arraykn.AsBsonArray.Add(BsonValue.Create(remark5));
    //    remark5 = new BsonDocument().Add("Cổng kết nối/sạc", spdt.thongsokythuat[5].GetProperty("Kết nối")[6].GetProperty("Cổng kết nối/sạc").ToString());
    //    arraykn.AsBsonArray.Add(BsonValue.Create(remark5));
    //    remark5 = new BsonDocument().Add("Jack tai nghe", spdt.thongsokythuat[5].GetProperty("Kết nối")[7].GetProperty("Jack tai nghe").ToString());
    //    arraykn.AsBsonArray.Add(BsonValue.Create(remark5));
    //    remark5 = new BsonDocument().Add("Kết nối khác", spdt.thongsokythuat[5].GetProperty("Kết nối")[8].GetProperty("Kết nối khác").ToString());
    //    arraykn.AsBsonArray.Add(BsonValue.Create(remark5));
    //    documentthngsokythuatkn.Add("Kết nối", arraykn);

    //    var documentthngsokythuattk = new BsonDocument { };
    //    BsonArray arraytk = new BsonArray();
    //    var remark6 = new BsonDocument().Add("Thiết kế", spdt.thongsokythuat[6].GetProperty("Thiết kế & Trọng lượng")[0].GetProperty("Thiết kế").ToString());
    //    arraytk.AsBsonArray.Add(BsonValue.Create(remark6));
    //    remark6 = new BsonDocument().Add("Chất liệu", spdt.thongsokythuat[6].GetProperty("Thiết kế & Trọng lượng")[1].GetProperty("Chất liệu").ToString());
    //    arraytk.AsBsonArray.Add(BsonValue.Create(remark6));
    //    remark6 = new BsonDocument().Add("Kích thước", spdt.thongsokythuat[6].GetProperty("Thiết kế & Trọng lượng")[2].GetProperty("Kích thước").ToString());
    //    arraytk.AsBsonArray.Add(BsonValue.Create(remark6));
    //    remark6 = new BsonDocument().Add("Trọng lượng", spdt.thongsokythuat[6].GetProperty("Thiết kế & Trọng lượng")[3].GetProperty("Trọng lượng").ToString());
    //    arraytk.AsBsonArray.Add(BsonValue.Create(remark6));
    //    documentthngsokythuattk.Add("Thiết kế & Trọng lượng", arraytk);

    //    var documentthngsokythuatpin = new BsonDocument { };
    //    BsonArray arraypin = new BsonArray();
    //    var remark7 = new BsonDocument().Add("Loại pin", spdt.thongsokythuat[7].GetProperty("Thông tin pin & Sạc")[0].GetProperty("Loại pin").ToString());
    //    arraypin.AsBsonArray.Add(BsonValue.Create(remark7));
    //    remark7 = new BsonDocument().Add("Dung lượng pin", spdt.thongsokythuat[7].GetProperty("Thông tin pin & Sạc")[1].GetProperty("Dung lượng pin").ToString());
    //    arraypin.AsBsonArray.Add(BsonValue.Create(remark7));
    //    remark7 = new BsonDocument().Add("Công nghệ pin", spdt.thongsokythuat[7].GetProperty("Thông tin pin & Sạc")[2].GetProperty("Công nghệ pin").ToString());
    //    arraypin.AsBsonArray.Add(BsonValue.Create(remark7));
    //    documentthngsokythuatpin.Add("Thông tin pin & Sạc", arraypin);

    //    var documentthngsokythuattich = new BsonDocument { };
    //    BsonArray arraytich = new BsonArray();
    //    var remark8 = new BsonDocument().Add("Bảo mật nâng cao", spdt.thongsokythuat[8].GetProperty("Tiện ích")[0].GetProperty("Bảo mật nâng cao").ToString());
    //    arraytich.AsBsonArray.Add(BsonValue.Create(remark8));
    //    remark8 = new BsonDocument().Add("Tính năng đặc biệt", spdt.thongsokythuat[8].GetProperty("Tiện ích")[1].GetProperty("Tính năng đặc biệt").ToString());
    //    arraytich.AsBsonArray.Add(BsonValue.Create(remark8));
    //    remark8 = new BsonDocument().Add("Ghi âm", spdt.thongsokythuat[8].GetProperty("Tiện ích")[2].GetProperty("Ghi âm").ToString());
    //    arraytich.AsBsonArray.Add(BsonValue.Create(remark8));
    //    remark8 = new BsonDocument().Add("Xem phim", spdt.thongsokythuat[8].GetProperty("Tiện ích")[3].GetProperty("Xem phim").ToString());
    //    arraytich.AsBsonArray.Add(BsonValue.Create(remark8));
    //    remark8 = new BsonDocument().Add("Nghe nhạc", spdt.thongsokythuat[8].GetProperty("Tiện ích")[4].GetProperty("Nghe nhạc").ToString());
    //    arraytich.AsBsonArray.Add(BsonValue.Create(remark8));
    //    documentthngsokythuattich.Add("Tiện ích", arraytich);

    //    var documentthngsokythuatkhac = new BsonDocument { };
    //    BsonArray arraykhac = new BsonArray();
    //    var remark9 = new BsonDocument().Add("Thời điểm ra mắt", spdt.thongsokythuat[9].GetProperty("Thông tin khác")[0].GetProperty("Thời điểm ra mắt").ToString());
    //    arraykhac.AsBsonArray.Add(BsonValue.Create(remark9));
    //    documentthngsokythuatkhac.Add("Thông tin khác", arraykhac);

    //    BsonArray arraythongsokythuat = new BsonArray();
    //    //var remarktskt = new BsonDocument().
    //    //       Add("Màn hình", arraymanhinh).
    //    //       Add("Camera sau", arraycamerasau).
    //    //       Add("Camera trước", arraycameratrc).
    //    //       Add("Bộ nhớ & Lưu trữ", arraybnlt).
    //    //       Add("Kết nối", arraykn).
    //    //       Add("Thiết kế & Trọng lượng", arraytk).
    //    //       Add("Thông tin pin & Sạc", arraypin).
    //    //       Add("Tiện ích", arraytich).
    //    //       Add("Thông tin khác", arraykhac);
    //    arraythongsokythuat.AsBsonArray.Add(BsonValue.Create(documentthngsokythuatmanhinh));
    //    arraythongsokythuat.AsBsonArray.Add(BsonValue.Create(documentthngsokythuatcamerasau));
    //    arraythongsokythuat.AsBsonArray.Add(BsonValue.Create(documentthngsokythuatcameratrc));
    //    arraythongsokythuat.AsBsonArray.Add(BsonValue.Create(documentthngsokythuathdhcpu));
    //    arraythongsokythuat.AsBsonArray.Add(BsonValue.Create(documentthngsokythuatbnlt));
    //    arraythongsokythuat.AsBsonArray.Add(BsonValue.Create(documentthngsokythuatkn));
    //    arraythongsokythuat.AsBsonArray.Add(BsonValue.Create(documentthngsokythuattk));
    //    arraythongsokythuat.AsBsonArray.Add(BsonValue.Create(documentthngsokythuatpin));
    //    arraythongsokythuat.AsBsonArray.Add(BsonValue.Create(documentthngsokythuattich));
    //    arraythongsokythuat.AsBsonArray.Add(BsonValue.Create(documentthngsokythuatkhac));

    //    document.Add("thongsokythuat", arraythongsokythuat);

    //    _spdtService.insert(document);
    //    return NoContent();
    //}

        [HttpPost]
        public ActionResult<BsonDocument> Create(sanphamdienthoai spdt)
        {
            BsonArray arrayhinhanh = new BsonArray();
            for (int i = 0; i < spdt.hinh.Count; i++)
            {
               
                var hinh = new BsonDocument().
                             Add("hinhanh", spdt.hinh[i].hinhanh.ToString()).
                             Add("mota", spdt.hinh[i].mota.ToString());
                      arrayhinhanh.AsBsonArray.Add(BsonValue.Create(hinh));
            }
            
            //var hinh = new BsonDocument().
            //                Add("hinhanh", "h1").
            //                Add("mota", "h2");
            //arrayhinhanh.AsBsonArray.Add(BsonValue.Create(hinh));
            var g = _spdtService.Get().Count;
            var document = new BsonDocument {
                 { "_id", _spdtService.Get().Count},
                 { "ten" , spdt.ten},
                 { "thuonghieu", spdt.thuonghieu},
                 { "hinh", arrayhinhanh},
                 { "dacdiemnoibat",spdt.dacdiemnoibat},
                 { "giaban", spdt.giaban},
                 { "giamgia", spdt.giamgia},
                 { "sosao", spdt.sosao},
                 { "_id_loaisanpham", spdt._id_loaisanpham}
                 };

            BsonDocument d = new BsonDocument();
            BsonArray arraythongsokythuat = new BsonArray();
            BsonArray arrayndthongsokythuat = new BsonArray();

            //for (int i = 0; i < spdt.thongsokythuat.Count; i++)
            //{
            //    var json = spdt.thongsokythuat[i].ToString();
            //    d = BsonDocument.Parse(json);
            //    var documentthngsokythuattich = new BsonDocument { };
            //    documentthngsokythuattich.Add(d);
            //    arraythongsokythuat.AsBsonArray.Add(BsonValue.Create(d));
            //}

            var documentthngsokythuatnd = new BsonDocument { };
            var keytskt = new BsonDocument { };
            for (int i = 0; i < spdt.thongsokythuat.Count; i=i+2)
            {
                if (i < spdt.thongsokythuat.Count-2)
                {
                  string[] keynamef = spdt.thongsokythuat[i].ToString().Split(',');
                  string[] keynames = spdt.thongsokythuat[i + 2].ToString().Split(',');
                  if (keynamef[0] == keynames[0])
                  {
                   
                    documentthngsokythuatnd.Add(keynamef[1], spdt.thongsokythuat[i + 1].ToString());
                    arrayndthongsokythuat.AsBsonArray.Add(BsonValue.Create(documentthngsokythuatnd));
                    documentthngsokythuatnd = new BsonDocument { };
                  }
                  else
                  {
                    documentthngsokythuatnd.Add(keynamef[1], spdt.thongsokythuat[i + 1].ToString());
                    arrayndthongsokythuat.AsBsonArray.Add(BsonValue.Create(documentthngsokythuatnd));
                    documentthngsokythuatnd = new BsonDocument { };
                    
                    keytskt.Add(keynamef[0], arrayndthongsokythuat);
                    arraythongsokythuat.AsBsonArray.Add(BsonValue.Create(keytskt));
                    arrayndthongsokythuat = new BsonArray { };
                    keytskt = new BsonDocument { };
                  } 
                }
                else
                {
                  if(i == spdt.thongsokythuat.Count - 2)
                  {
                    arrayndthongsokythuat = new BsonArray { };
                    string[] keynamef = spdt.thongsokythuat[i].ToString().Split(',');
                    documentthngsokythuatnd.Add(keynamef[1], spdt.thongsokythuat[i + 1].ToString());
                    arrayndthongsokythuat.AsBsonArray.Add(BsonValue.Create(documentthngsokythuatnd));
                    documentthngsokythuatnd = new BsonDocument { };

                    keytskt.Add(keynamef[0], arrayndthongsokythuat);
                    arraythongsokythuat.AsBsonArray.Add(BsonValue.Create(keytskt));
                    arrayndthongsokythuat = new BsonArray { };
                    keytskt = new BsonDocument { };
                  }
                }
            }

            document.Add("thongsokythuat", arraythongsokythuat);

            _spdtService.insert(document);
            return NoContent();
        }

        //[HttpPut("{_id}")]
        //public IActionResult update(int _id, sanphamdienthoai spdt)
        //{
        //  var filter = Builders<BsonDocument>.Filter.Eq("_id", _id.ToString());
        //  var update = Builders<BsonDocument>.Update.Combine(
        //               Builders<BsonDocument>.Update.Set("username", sv.username),
        //               Builders<BsonDocument>.Update.Set("chuyennganh", sv.chuyennganh),
        //               Builders<BsonDocument>.Update.Set("dtb_tichluy", sv.dtb_tichluy),
        //               Builders<BsonDocument>.Update.Set("chuyennganh", sv.chuyennganh),
        //               Builders<BsonDocument>.Update.Set("contanct.$.phone", p),
        //               Builders<BsonDocument>.Update.Set("contanct.$.email", e)
        //      );
        //  _spdtService.Update(filter, update);
        //  return NoContent();
        //}
  }
}
