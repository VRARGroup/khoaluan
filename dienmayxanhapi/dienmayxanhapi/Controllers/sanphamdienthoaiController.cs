using System;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using dienmayxanhapi.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGeneration.Contracts.Messaging;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using Newtonsoft.Json.Serialization;
using static dienmayxanhapi.dienmayxanhdbcontext;

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

        [Route("getidspkmhotloaisp")]
        [HttpGet]
        public ActionResult<List<sanphamdienthoai>> Getfillteridspkmhot_loaisp(int idloaisap)
        {
            return (_spdtService.Getfillterspkmhotidlsp(idloaisap));
        }

        [Route("get_sp_noi_bat")]
        [HttpGet]
        public ActionResult<List<sanphamdienthoai>> Getfillter_get_sp_noi_bat(int idloaisap)
        {
            return (_spdtService.Getfillter_get_sp_noi_bat());
        }

        [Route("get_product_details")]
        [HttpGet]
        public ActionResult<List<sanphamdienthoai>> Getfillter_product_details(int idsp)
        {
            return (_spdtService.Getfillter_product_details(idsp));
        }

        [Route("get_same_products")]
        [HttpGet]
        public ActionResult<List<sanphamdienthoai>> Getfillter_same_products(int idsp)
        {
            return (_spdtService.Getfillter_same_products(idsp));
        }

        [Route("get_same_price_products")]
        [HttpGet]
        public ActionResult<List<sanphamdienthoai>> Getfillter_same_price_products(int idsp)
        {
            return (_spdtService.Getfillter_same_price_products(idsp));
        }

        [Route("get_list_product")]
        [HttpGet]
        public ActionResult<List<sanphamdienthoai>> Getfillter_list_product(int idlsp)
        {
            return (_spdtService.Getfillter_list_product(idlsp));
        }

        [Route("get_more_list_product")]
        [HttpGet]
        public ActionResult<List<sanphamdienthoai>> Getfillter_more_list_product(int idlsp)
        {
            return (_spdtService.Getfillter_more_list_product(idlsp));
        }

        [Route("get_list_product_category")]
        [HttpGet]
        public ActionResult<List<string>> Getfillter_list_product_category(int idlsp)
        {
            return (_spdtService.Getfillter_list_product_category(idlsp));
        }

        [Route("get_list_product_price")]
        [HttpGet]
        public ActionResult<List<string>> Getfillter_list_product_price(int idlsp)
        {
            return (_spdtService.Getfillter_list_product_price(idlsp));
        }

        [Route("get_list_suggest_category")]
        [HttpGet]
        public ActionResult<List<sanphamdienthoai>> Getfillter_list_suggest_category(int idlsp, string arrthuonghieu)
        {
            return (_spdtService.Getfillter_list_suggest_category(idlsp, arrthuonghieu));
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
            try
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
                int id = 0;
                if (_spdtService.Get() != null && _spdtService.Get().Count != 0)
                {
                    id = Convert.ToInt32(_spdtService.Get().LastOrDefault()._id);
                }
                var v = id;
                var g = v + 1;
                var document = new BsonDocument { { "_id", g }, { "ten", spdt.ten }, { "thuonghieu", spdt.thuonghieu }, { "hinh", arrayhinhanh }, { "dacdiemnoibat", spdt.dacdiemnoibat }, { "giaban", spdt.giaban }, { "giamgia", spdt.giamgia }, { "sosao", spdt.sosao }
                };

                BsonArray arraygioithieu = new BsonArray();
                document.Add("gioithieu", arraygioithieu);
                if (spdt.hinhdaidien == null)
                {
                    document.Add("hinhdaidien", "");
                }
                else
                {
                    document.Add("hinhdaidien", spdt.hinhdaidien);
                }
                document.Add("_id_loaisanpham", spdt._id_loaisanpham);
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

                for (int i = 0; i < spdt.thongsokythuat.Count; i = i + 2)
                {
                    if (i < spdt.thongsokythuat.Count - 2)
                    {
                        string[] keynamef = spdt.thongsokythuat[i].ToString().Split('+');
                        //if (keynamef.Length > 2)
                        //{
                        //  string s = spdt.thongsokythuat[i].ToString();
                        //  StringBuilder sb = new StringBuilder(s);
                        //  sb[s.IndexOf(',')] = '~';
                        //  keynamef = sb.ToString().Split('~');

                        //}
                        string[] keynames = spdt.thongsokythuat[i + 2].ToString().Split('+');
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
                        if (i == spdt.thongsokythuat.Count - 2)
                        {
                            string[] keynamef = spdt.thongsokythuat[i].ToString().Split('+');
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
                return Ok(true);
            }
            catch (Exception e)
            {
                return NoContent();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult deletesanpham(int id)
        {
            try
            {
              if (checkktid(id) == true)
              {
                var deletefilter = Builders<BsonDocument>.Filter.Eq("_id", id);
                _spdtService.deletesp(deletefilter);
                var deletebl = Builders<binhluan>.Filter.Eq("_id", id);
                _spdtService.deletebl(deletebl);
                return Ok(true);
              }
              return NoContent();
            }
            catch
            {
              return NoContent();
            }
        }

        [Route("gt")]
        [HttpPut]
        public IActionResult update(int _id, sanphamdienthoai spdt)
        {
          try
          {
            if (checkktid(_id) == true)
            {
              var filter = Builders<sanphamdienthoai>.Filter.Eq("_id", _id);
              BsonArray arrayhinhanh = new BsonArray();
              for (int i = 0; i < spdt.gioithieu.Count; i++)
              {
                var hinh = new BsonDocument().
                Add("hinhanh", spdt.gioithieu[i].hinhanh.ToString()).
                Add("mota", spdt.gioithieu[i].mota.ToString());
                arrayhinhanh.AsBsonArray.Add(BsonValue.Create(hinh));
              }
              var update = Builders<sanphamdienthoai>.Update.Combine(
                  Builders<sanphamdienthoai>.Update.Set("gioithieu", arrayhinhanh)
              );
              _spdtService.Update(filter, update);
              return Ok(true);
            }
            return NoContent();
          }
          catch
          {
             return NoContent();
          }
        }

        [Route("updatesp")]
        [HttpPut]
        public IActionResult updatesp(int _id, sanphamdienthoai spdt)
        {
            try
            {
                if(checkktid(_id)==true)
                { 
                var filter = Builders<sanphamdienthoai>.Filter.Eq("_id", _id);
                BsonArray arraygt = new BsonArray();
                if (spdt.gioithieu != null)
                {
                    for (int i = 0; i < spdt.gioithieu.Count; i++)
                    {
                        var hinh = new BsonDocument().
                        Add("hinhanh", spdt.gioithieu[i].hinhanh.ToString()).
                        Add("mota", spdt.gioithieu[i].mota.ToString());
                        arraygt.AsBsonArray.Add(BsonValue.Create(hinh));
                    }
                }
                BsonArray arrayhinh = new BsonArray();
                for (int i = 0; i < spdt.hinh.Count; i++)
                {
                    var hinh = new BsonDocument().
                    Add("hinhanh", spdt.hinh[i].hinhanh.ToString()).
                    Add("mota", spdt.hinh[i].mota.ToString());
                    arrayhinh.AsBsonArray.Add(BsonValue.Create(hinh));
                }
                var documentthngsokythuatnd = new BsonDocument { };
                var keytskt = new BsonDocument { };

                BsonArray arraythongsokythuat = new BsonArray();
                BsonArray arrayndthongsokythuat = new BsonArray();
                for (int i = 0; i < spdt.thongsokythuat.Count; i = i + 2)
                {
                    if (i < spdt.thongsokythuat.Count - 2)
                    {
                        string[] keynamef = spdt.thongsokythuat[i].ToString().Split('+');
                        //if(keynamef.Length>2)
                        //{
                        //  string s = spdt.thongsokythuat[i].ToString();
                        //  StringBuilder sb = new StringBuilder(s);
                        //  sb[s.IndexOf(',')] = '~';
                        //  keynamef = sb.ToString().Split('~');

                        //}
                        string[] keynames = spdt.thongsokythuat[i + 2].ToString().Split('+');
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
                        if (i == spdt.thongsokythuat.Count - 2)
                        {
                            arrayndthongsokythuat = new BsonArray { };
                            string[] keynamef = spdt.thongsokythuat[i].ToString().Split('+');
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
                var update = Builders<sanphamdienthoai>.Update.Combine(
                    Builders<sanphamdienthoai>.Update.Set("ten", spdt.ten),
                    Builders<sanphamdienthoai>.Update.Set("thuonghieu", spdt.thuonghieu),
                    Builders<sanphamdienthoai>.Update.Set("hinh", arrayhinh),
                    Builders<sanphamdienthoai>.Update.Set("dacdiemnoibat", spdt.dacdiemnoibat),
                    Builders<sanphamdienthoai>.Update.Set("giaban", spdt.giaban),
                    Builders<sanphamdienthoai>.Update.Set("giamgia", spdt.giamgia),
                    Builders<sanphamdienthoai>.Update.Set("sosao", spdt.sosao),
                    Builders<sanphamdienthoai>.Update.Set("gioithieu", arraygt),
                    Builders<sanphamdienthoai>.Update.Set("hinhdaidien", spdt.hinhdaidien),
                    Builders<sanphamdienthoai>.Update.Set("_id_loaisanpham", spdt._id_loaisanpham),
                    Builders<sanphamdienthoai>.Update.Set("thongsokythuat", arraythongsokythuat)
                );
                _spdtService.Update(filter, update);
                return Ok(true);
                }

                return NoContent();
            }
            catch (Exception e)
            {
                throw;
            }
        }

        [Route("allsp")]
        [HttpGet]
        public ActionResult<List<sanphamdienthoai>> Getfillter_allsp()
        {
            return (_spdtService.Getfillter_allsp());
        }

        [Route("get_thong_ke_sp")]
        [HttpGet]
        public ActionResult<List<sanphamdienthoai>> Getfillter_get_thong_ke_sp()
        {
            return _spdtService.Getfillter_get_thong_ke_sp();
        }

        public Boolean checkktid(int id)
        {
          try
          {
            var s = _spdtService.Get().Find(x => x._id == id);
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
