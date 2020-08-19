using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using dienmayxanhapi.Model;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;

namespace dienmayxanhapi
{
    public class dienmayxanhdbcontext : DbContext
    {
        public virtual DbSet<sanphamdienthoai> sanphamdienthoai { get; set; }
        public virtual DbSet<loaisanpham> loaisanpham { get; set; }
        public virtual DbSet<hinhanhfolder> hinhanhfolder { get; set; }
        public virtual DbSet<danhsachquyen> danhsachquyen { get; set; }
        public virtual DbSet<taikhoan> taikhoan { get; set; }
        public virtual DbSet<group> group { get; set; }
        public virtual DbSet<danhgia> danhgia { get; set; }
        public virtual DbSet<binhluan> binhluan { get; set; }
        public virtual DbSet<idex> idex { get; set; }
        private string ConnectionString = "mongodb://localhost:27017";
        private string DatabaseName = "dienmayxanh";
        private string CollectionNamesp = "sanpham";
        private string CollectionNameloaisp = "loaisanpham";
        private string CollectionNamedanhsachquyen = "danhsachquyen";
        private string CollectionNametaikhoan = "taikhoan";
        private string CollectionNametgroup = "group";
        private string CollectionNamedanhgia = "danhgia";
        private string CollectionNamebinhluan = "binhluan";
        private readonly IMongoCollection<sanphamdienthoai> collectionspdt;
        private readonly IMongoCollection<loaisanpham> collectionlsp;
        private readonly IMongoCollection<danhsachquyen> collectiondsq;
        private readonly IMongoCollection<taikhoan> collectiontk;
        private readonly IMongoCollection<group> collectiongroup;
        private readonly IMongoCollection<danhgia> collectiondanhgia;
        private readonly IMongoCollection<binhluan> collectionbinhluan;
        public dienmayxanhdbcontext()
        {
            var client = new MongoClient(ConnectionString);
            var database = client.GetDatabase(DatabaseName);
            collectionspdt = database.GetCollection<sanphamdienthoai>(CollectionNamesp);
            collectionlsp = database.GetCollection<loaisanpham>(CollectionNameloaisp);
            collectiondsq = database.GetCollection<danhsachquyen>(CollectionNamedanhsachquyen);
            collectiontk = database.GetCollection<taikhoan>(CollectionNametaikhoan);
            collectiongroup = database.GetCollection<group>(CollectionNametgroup);
            collectiondanhgia = database.GetCollection<danhgia>(CollectionNamedanhgia);
            collectionbinhluan = database.GetCollection<binhluan>(CollectionNamebinhluan);
            _ = CreateIndexSP(ConnectionString,DatabaseName, CollectionNamesp);
            _ = CreateIndexNameSP(ConnectionString,DatabaseName, CollectionNamesp);
        }
        public class bangghepsanphamdanhgia : sanphamdienthoai
        {
            public danhgia[] Danhgias { get; set; }
            public danhgiaphu[] Danhgiaphus { get; set; }
        }
        public class bangghepsanphamdanhgia1 : danhgia
        {
            public danhgia[] Danhgias { get; set; }
            public danhgiaphu[] Danhgiaphus { get; set; }
        }
        public class banggheploaisanphamsanpham : loaisanpham
        {
            public sanphamdienthoai[] Sanphams { get; set; }
        }
        public class thongke
        {
            public string _id { get; set; }
            public int? count { get; set; }
            public int? sum { get; set; }
        }

        public class thongke5sao
        {
            public int? _id { get; set; }
            public int? count { get; set; }

        }
       
        public class danhsachthuonghieu
        {
          public List<string> listthuonghieu { get; set; }
        }
        public class nav_lsp
        {
          public int? id_lsp { get; set; }
          public string tenlsp { get; set; }
          public List<string> listthuonghieu { get; set; }
        }
    public class bangghepsanphamdanhgia_custom
        {
            public int? _id { get; set; }
            public int? _id_sanpham { get; set; }
            public string _tensp { get; set; }
            public string _tenth { get; set; }
            public int? _id_loaisanpham { get; set; }
            public int? _int_tb { get; set; }
        }
        public List<sanphamdienthoai> Get()
        {
            var dl = collectionspdt.Find(x => true).ToList();
            return dl;
        }

        public List<sanphamdienthoai> Gethotsp()
        {
            var dl = collectionspdt.Find(x => true && (x.giamgia != 0 && x.giamgia != null)).ToList().OrderByDescending(t => t.giamgia);
            return dl.Take(11).ToList();
        }

        public List<sanphamdienthoai> Getfillter(string tensp)
        {
            var dl = collectionspdt.Find(x => x.ten == tensp).ToList();
            return dl;
        }

        public List<sanphamdienthoai> Gettsp_lspfillter(int id, string tensp)
        {
            if (tensp != "v")
            {
                var dl = collectionspdt.Find(x => x._id_loaisanpham == id && x.thuonghieu == tensp).ToList();
                return dl;
            }
            else
            {
                var dl = collectionspdt.Find(x => x._id_loaisanpham == id).ToList();
                return dl;
            }
        }

        public List<sanphamdienthoai> Getfillterspidlsp(int idlsp)
        {
            var dl = collectionspdt.Find(x => x._id_loaisanpham == idlsp).ToList();
            return dl;
        }
        public List<sanphamdienthoai> Getfillterspkmhotidlsp(int idlsp)
        {
            var dl = collectionspdt.Find(x => x._id_loaisanpham == idlsp && (x.giamgia != 0 && x.giamgia != null)).ToList().Take(20).ToList();
            return dl;
        }
        public List<sanphamdienthoai> Getfillter_get_sp_noi_bat()
        {
            var dl = collectionspdt.Find(x => (x.giamgia != 0 && x.giamgia != null)).ToList().OrderByDescending(t => t.sosao).ToList().Take(30).OrderByDescending(t => t.giaban).Take(20).ToList();
            return dl;
        }

        public List<sanphamdienthoai> Getdetailsp(int id)
        {
            var dl = collectionspdt.Find(x => x._id == id).ToList();
            return dl;
        }
        public BsonDocument insert(BsonDocument sv)
        {
            var client = new MongoClient(ConnectionString);
            var database = client.GetDatabase(DatabaseName);
            var collectionspdt = database.GetCollection<BsonDocument>(CollectionNamesp);
            collectionspdt.InsertOne(sv);
            return sv;
        }
        public List<sanphamdienthoai> Update(FilterDefinition<sanphamdienthoai> filter, UpdateDefinition<sanphamdienthoai> update)
        {
            collectionspdt.UpdateOne(filter, update);
            var dl = collectionspdt.Find(x => true).ToList();
            return dl;
        }

        public List<loaisanpham> deletesp(FilterDefinition<BsonDocument> filter)
        {
            var client = new MongoClient(ConnectionString);
            var database = client.GetDatabase(DatabaseName);
            var collectionspdt = database.GetCollection<BsonDocument>(CollectionNamesp);
            collectionspdt.DeleteOne(filter);
            var dl = collectionlsp.Find(x => true).ToList();
            return dl;
        }
        public List<loaisanpham> Getlsp()
        {
            var dl = collectionlsp.Find(x => true).ToList();
            return dl;
        }
        public List<string> Getthuonghieu()
        {
            List<string> thuonghieulist = new List<string>();
            var query = (from th in Getlsp().Select(x => x.thuonghieu).ToList().Distinct().ToList().AsQueryable() select new danhsachthuonghieu { listthuonghieu=th }).ToList().Distinct().ToList();
            var maxthuongheu = query.OrderByDescending(x => x.listthuonghieu.Count).First();
            for(int i=0;i< query.Count;i++)
            {
              var s = query[i].listthuonghieu;
              thuonghieulist.AddRange(s);
            }
            var sth= (from l in thuonghieulist select l).ToList().Distinct().ToList();
            return sth;
        }
        public List<loaisanpham> Getfillterlsp(int id)
        {
            var dl = collectionlsp.Find(x => x._id == id).ToList();
            return dl;
        }
        public BsonDocument insertls(BsonDocument lsp)
        {
            var client = new MongoClient(ConnectionString);
            var database = client.GetDatabase(DatabaseName);
            var collectionlsp = database.GetCollection<BsonDocument>(CollectionNameloaisp);
            collectionlsp.InsertOne(lsp);
            return lsp;
        }
        public List<loaisanpham> deletels(FilterDefinition<BsonDocument> filter)
        {
            var client = new MongoClient(ConnectionString);
            var database = client.GetDatabase(DatabaseName);
            var collectionlspc = database.GetCollection<BsonDocument>(CollectionNameloaisp);
            collectionlspc.DeleteOne(filter);
            var dl = collectionlsp.Find(x => true).ToList();
            return dl;
        }
        public List<sanphamdienthoai> Getfillter_product_details(int idsp)
        {
            var dl = collectionspdt.Find(x => x._id == idsp).ToList();
            return dl;
        }

        public List<loaisanpham> Updatelsp(FilterDefinition<loaisanpham> filter, UpdateDefinition<loaisanpham> update)
        {
            collectionlsp.UpdateOne(filter, update);
            var dl = collectionlsp.Find(x => true).ToList();
            return dl;
        }

        public List<sanphamdienthoai> Getfillter_same_products(int idsp)
        {
            var name = collectionspdt.Find(x => x._id == idsp).First();
            int size = name.ten.Length;
            var same = get_same_name(name.ten);
            if (same != null)
            {
                var dl = collectionspdt.Find(x => x._id_loaisanpham == name._id_loaisanpham && x._id != idsp && x.ten.Contains(same) && x.ten.Length > size - 2 && x.ten.Length < size + 2).ToList();
                return dl;
            }
            return null;
        }
        private string get_same_name(string name)
        {
            int count = -1;
            if (name.Contains("inch"))
            {
                var array_name = name.Split(" ").ToList();
                count = array_name.IndexOf("inch");
                array_name.RemoveRange(count - 1, array_name.Count() - count + 1);
                name = string.Join(" ", array_name);
                return name;
            }
            if (name.Contains(" HP "))
            {
                var array_name = name.Split(" ").ToList();
                count = array_name.IndexOf("HP");
                array_name.RemoveRange(count, array_name.Count() - count);
                name = string.Join(" ", array_name);
                return name;
            }
            if (name.Contains("GB") || name.Contains("Gb"))
            {
                var array_name = name.Split(" ").ToList();
                for (int i = 0; i < array_name.Count; i++)
                {
                    if (array_name[i].Contains("GB"))
                        count = i;
                }
                if (count == -1)
                    return null;
                array_name.RemoveRange(count, array_name.Count() - count);
                name = string.Join(" ", array_name);
                return name;
            }

            return null;
        }
        public List<sanphamdienthoai> Getfillter_same_price_products(int idsp)
        {
            var name = collectionspdt.Find(x => x._id == idsp).First();
            var dl = collectionspdt.Find(x => x._id_loaisanpham == name._id_loaisanpham && x._id != idsp && x.giaban > name.giaban * 0.6 && x.giaban < name.giaban * 1.4).ToList().Take(5).ToList();
            return dl;
        }

        public List<sanphamdienthoai> Getfillter_list_product(int idlsp)
        {
            var dl = collectionspdt.Find(x => x._id_loaisanpham == idlsp).ToList();
            return dl;
        }

        public List<sanphamdienthoai> Getfillter_more_list_product(int idlsp)
        {
            var dl = collectionspdt.Find(x => x._id_loaisanpham == idlsp).ToList();
            if (dl.Skip(20).ToList() != null)
                return dl.Skip(20).ToList();
            else
                return null;
        }

        public List<danhsachquyen> Getdsq()
        {
            var dl = collectiondsq.Find(x => true).ToList();
            return dl;
        }

        public List<danhsachquyen> Getdetaildsq(int id)
        {
            var dl = collectiondsq.Find(x => x._id == id).ToList();
            return dl;
        }

        public List<danhsachquyen> deletedsq(FilterDefinition<BsonDocument> filter)
        {
            var client = new MongoClient(ConnectionString);
            var database = client.GetDatabase(DatabaseName);
            var collectiondeletedsq = database.GetCollection<BsonDocument>(CollectionNamedanhsachquyen);
            collectiondeletedsq.DeleteOne(filter);
            var dl = collectiondsq.Find(x => true).ToList();
            return dl;
        }
        public BsonDocument insertdsq(BsonDocument dsq)
        {
            var client = new MongoClient(ConnectionString);
            var database = client.GetDatabase(DatabaseName);
            var collectiondeletedsq = database.GetCollection<BsonDocument>(CollectionNamedanhsachquyen);
            collectiondeletedsq.InsertOne(dsq);
            return dsq;
        }

        public List<taikhoan> Gettk()
        {
            var dl = collectiontk.Find(x => true).ToList();
            return dl;
        }

        public List<taikhoan> Getemail()
        {
          var dl = collectiontk.Find(x => x._id_group==1 || x._id_group == 3 && x.giayphep==true).ToList();
          dl = dl.Where(x => x.email.Length > 1).ToList();
          return dl;
        }

        public List<taikhoan> Getgrouptk()
        {
            var dl = collectiontk.Find(x => x._id_group == 9999).ToList();
            return dl;
        }
        public List<taikhoan> Getdetailtk(string u, string p)
        {
            var dl = collectiontk.Find(x => x.username == u && x.password == p).ToList();
            return dl;
        }

        public List<taikhoan> Getdetailtk_id(int id)
        {
            var dl = collectiontk.Find(x => x._id == id).ToList();
            return dl;
        }
        public List<taikhoan> Getdetailtk_id_group(int id_group)
        {
            var dl = collectiontk.Find(x => x._id_group == id_group).ToList();
            return dl;
        }

        public Boolean Updatetk(FilterDefinition<taikhoan> filter, UpdateDefinition<taikhoan> update)
        {
            collectiontk.UpdateOne(filter, update);
            return true;
        }
        public BsonDocument inserttk(BsonDocument tk)
        {
            var client = new MongoClient(ConnectionString);
            var database = client.GetDatabase(DatabaseName);
            var collectiontk = database.GetCollection<BsonDocument>(CollectionNametaikhoan);
            collectiontk.InsertOne(tk);
            return tk;
        }
        public List<taikhoan> deletetk(FilterDefinition<BsonDocument> filter)
        {
            var client = new MongoClient(ConnectionString);
            var database = client.GetDatabase(DatabaseName);
            var collectiondeletetk = database.GetCollection<BsonDocument>(CollectionNametaikhoan);
            collectiondeletetk.DeleteOne(filter);
            var dl = collectiontk.Find(x => true).ToList();
            return dl;
        }
        public List<group> Getgroup()
        {
            var dl = collectiongroup.Find(x => true).ToList();
            return dl;
        }

        public List<group> Getdetailgroup(int id)
        {
            var dl = collectiongroup.Find(x => x._id == id).ToList();
            return dl;
        }

        public Boolean Updategroup(FilterDefinition<group> filter, UpdateDefinition<group> update)
        {
            collectiongroup.UpdateOne(filter, update);
            return true;
        }

        public List<danhgia> Getdg()
        {
            var dl = collectiondanhgia.Find(x => true).ToList();
            return dl;
        }

        public List<danhgia> Getdetaildg(int _id)
        {
            var dl = collectiondanhgia.Find(x => x._id_sanpham == _id && x.kiemduyet==true).ToList().OrderByDescending(x => x.ngaydanhgia).ToList();
            return dl;
        }

        public List<danhgia> Getalldetaildg_idsp(int _id)
        {
            var dl = collectiondanhgia.Find(x => x._id_sanpham == _id ).ToList();
            return dl;
        }

        public List<danhgiaphu> Getdetaildgphu(int _id)
        {
            var dl = collectiondanhgia.Find(x => x._id == _id).ToList();
            var danhgiaphu = dl.Find(x => true).danhgiaphu.ToList();
            return danhgiaphu;
        }

        public Boolean Updatedanhgia(FilterDefinition<danhgia> filter, UpdateDefinition<danhgia> update)
        {
            collectiondanhgia.FindOneAndUpdate(filter, update);
            return true;
        }

        public BsonDocument insertdg(danhgia dg)
        {
            collectiondanhgia.InsertOne(dg);
            return null;
        }

        public List<string> check_tieuchidanhgia(int id)
        {
            try
            {
                var dl = collectionlsp.Find(x => x._id == id).ToList().Select(t => t.tieuchidanhgia).First();
                return dl;
            }
            catch
            {
                return null;
            }
        }

        public List<string> Getfillter_list_product_category(int idlsp)
        {
            var dl = collectionspdt.Find(x => x._id_loaisanpham == idlsp).ToList().GroupBy(t => t.thuonghieu).ToList().Select(x => x.Key).ToList();
            return dl;
        }

        public List<string> Getfillter_list_product_price(int idlsp)
        {
            try
            {
              var dl = collectionspdt.Find(x => x._id_loaisanpham == idlsp).ToList().Select(x => x.giaban).Max(); var d1 = (dl * 0.1).ToString();
              var d2 = Math.Round((double)(dl * 0.2)).ToString();
              var d3 = Math.Round((double)(dl * 0.3)).ToString();
              var d5 = Math.Round((double)(dl * 0.5)).ToString();
              var d7 = Math.Round((double)(dl * 0.7)).ToString();
              var d8 = Math.Round((double)(dl * 0.8)).ToString();
              var dl1 = d1.Length > 5 ? d1.Substring(0, d1.Length - 5) + "00000" : d1;
              var dl2 = d2.Length > 5 ? d2.Substring(0, d2.Length - 5) + "00000" : d2;
              var dl3 = d3.Length > 5 ? d3.Substring(0, d3.Length - 5) + "00000" : d3;
              var dl5 = d5.Length > 5 ? d5.Substring(0, d5.Length - 5) + "00000" : d5;
              var dl7 = d7.Length > 5 ? d7.Substring(0, d7.Length - 5) + "00000" : d7;
              var dl8 = d8.Length > 5 ? d8.Substring(0, d8.Length - 5) + "00000" : d8;

              List<string> vs = new List<string>();
              vs.Add("Dưới " + dl1);
              vs.Add("Từ " + dl1 + "-" + dl2);
              vs.Add("Từ " + dl2 + "-" + dl3);
              vs.Add("Từ " + dl3 + "-" + dl5);
              vs.Add("Từ " + dl5 + "-" + dl7);
              vs.Add("Trên " + dl7);
              return vs;
            }
            catch
            {
              return null;
            }
        }

        public List<sanphamdienthoai> Getfillter_list_suggest_category(int idlsp, string arr_thuonghieuu)
        {
            var dl = collectionspdt.Find(x => x._id_loaisanpham == idlsp && arr_thuonghieuu.Contains(x.thuonghieu)).ToList();
            return dl;
        }

        public List<binhluan> Getbinhluan()
        {
            var dl = collectionbinhluan.Find(x => true).ToList();
            return dl;
        }

        public List<binhluan> Getdetaibinhluan_idsp(int id_sp)
        {
            var dl = collectionbinhluan.Find(x => x._id_sanpham == id_sp && x.kiemduyet == true).ToList();
            return dl;
        }

        public BsonDocument insertbinhluan(binhluan bl)
        {
            collectionbinhluan.InsertOne(bl);
            return bl.ToBsonDocument();
        }
        public Boolean Updatebl(FilterDefinition<binhluan> filter, UpdateDefinition<binhluan> update)
        {
            collectionbinhluan.FindOneAndUpdate(filter, update);
            return true;
        }

        public Boolean deletebl(FilterDefinition<binhluan> filter)
        {
            collectionbinhluan.FindOneAndDelete(filter);
            return true;
        }

        public Boolean deletedg(FilterDefinition<danhgia> filter)
        {
            collectiondanhgia.FindOneAndDelete(filter);
            return true;
        }

        public async Task<List<bangghepsanphamdanhgia_custom>> Getfillter_danhgia_1day()
        {
          await Task.Delay(500);
          var dl = collectiondanhgia.Find(x => x.ngaydanhgia >= DateTime.Today).ToList();
          
          //var dl1 = collectionspdt.Aggregate()
          //                     .Lookup<sanphamdienthoai, danhgia, bangghepsanphamdanhgia>(
          //                          collectiondanhgia,
          //                          x => x._id,
          //                          y => y._id_sanpham,
          //                          x => x.Danhgias).ToList().Select(x => new bangghepsanphamdanhgia_custom {_id = x._id, _id_loaisanpham= x._id_loaisanpham, _int_tb=x.Danhgias.Where(p => p.ngaydanhgia >= Convert.ToDateTime("17-07-2020") && p.danhgiaphu.Where(c=>c.chucdanh==false ).ToList().Count>0 ).ToList().Count}).ToList<bangghepsanphamdanhgia_custom>();
          //return dl1;
          var dl1= Get();
          var query = (from p in dl.AsQueryable()
                      join c in dl1.AsQueryable() on p._id_sanpham equals c._id
                      select new bangghepsanphamdanhgia_custom {
                        _id = p._id,
                        _id_sanpham = p._id_sanpham,
                        _tensp = c.ten,
                        _tenth = c.thuonghieu,
                        _id_loaisanpham = c._id_loaisanpham,
                        //_int_tb = p.danhgiaphu.Where(x => x.chucdanh == true).ToList().Count > 0 ? 0 :
                        //          p.danhgiaphu.Where(x => x.chucdanh == false).ToList().Count > 0 ? 1 :
                        //          p.danhgiaphu.Count==0 ? 1 : 0
                        _int_tb = p.kiemduyet == false ? 1 :
                                  p.danhgiaphu.Where(x => x.kiemduyetphu == true).ToList().Count > 0 ? 0 :
                                  p.danhgiaphu.Where(x => x.kiemduyetphu == false).ToList().Count > 0 ? 1 :
                                  p.danhgiaphu.Count == 0 ? 1 : 0
                      }).ToList();
            return query.ToList();
        }

        public async Task<List<bangghepsanphamdanhgia_custom>> Getfillter_danhgia_1day_idsp(int _id_sp, String d)
        {
          await Task.Delay(500);
          var dl = collectiondanhgia.Find(x => x._id_sanpham==_id_sp && x.ngaydanhgia >= Convert.ToDateTime(d)).ToList();
          var dl1= Get();
          var query = (from p in dl.AsQueryable()
                      join c in dl1.AsQueryable() on p._id_sanpham equals c._id
                      select new bangghepsanphamdanhgia_custom {
                        _id = p._id,
                        _id_sanpham = p._id_sanpham,
                        _tensp = c.ten,
                        _tenth = c.thuonghieu,
                        _id_loaisanpham = c._id_loaisanpham,
                        //_int_tb = p.danhgiaphu.Where(x => x.chucdanh == true).ToList().Count > 0 ? 0 :
                        //          p.danhgiaphu.Where(x => x.chucdanh == false).ToList().Count > 0 ? 1 :
                        //          p.danhgiaphu.Count==0 ? 1 : 0
                        _int_tb = p.kiemduyet == false ? 1 :
                                  p.danhgiaphu.Where(x => x.kiemduyetphu == true).ToList().Count > 0 ? 0 :
                                  p.danhgiaphu.Where(x => x.kiemduyetphu == false).ToList().Count > 0 ? 1 :
                                  p.danhgiaphu.Count == 0 ? 1 : 0
                      }).ToList();
              return query.ToList();
        }

        public List<sanphamdienthoai> Getfillter_allsp()
        {
            var dl = collectionspdt.Find(x => true).ToList();
            return dl;
        }

        public List<danhgia> Getfillter_danhgia_1day_theo_idsp(int _id_sp)
        {
            var dl = collectiondanhgia.Find(x => x._id_sanpham == _id_sp && x.ngaydanhgia >= DateTime.Today).ToList();
            return dl;
        }
        public List<binhluan> Getfillter_binhluan_1day_theo_idsp(int _id_sp)
        {
            var dl = collectionbinhluan.Find(x => x._id_sanpham == _id_sp && x.ngaybinhluan >= DateTime.Today).ToList();
            return dl;
        }
        public List<binhluan> Getfillter_binhluan_choseday_theo_idsp(int _id_sp, String d)
        {
            var dl = collectionbinhluan.Find(x => x._id_sanpham == _id_sp && x.ngaybinhluan >= Convert.ToDateTime(d) && x.ngaybinhluan < Convert.ToDateTime(d).AddDays(1)).ToList();
            return dl;
        }

        public async Task<List<bangghepsanphamdanhgia_custom>> Getfillter_binhluan_idsp_1dayAsync(int _id_sp, String d)
        {
          await Task.Delay(500);
          
          var dl = collectionbinhluan.Find(x => x._id_sanpham==_id_sp && x.ngaybinhluan >= Convert.ToDateTime(d)).ToList();
          var dl1= Get();
          var query = (from p in dl.AsQueryable()
                      join c in dl1.AsQueryable() on p._id_sanpham equals c._id
                      select new bangghepsanphamdanhgia_custom {
                        _id = p._id,
                        _id_sanpham = p._id_sanpham,
                        _tensp = c.ten,
                        _tenth = c.thuonghieu,
                        _id_loaisanpham = c._id_loaisanpham,
                        //_int_tb = p.binhluanphu.Where(x => x.chucdanh == true).ToList().Count > 0 ? 0 :
                        //          p.binhluanphu.Where(x => x.chucdanh == false).ToList().Count > 0 ? 1 :
                        //          p.binhluanphu.Count==0 ? 1 : 0
                        _int_tb = p.kiemduyet == false ? 1 :
                                  p.binhluanphu.Where(x => x.kiemduyetphu == true).ToList().Count > 0 ? 0 :
                                  p.binhluanphu.Where(x => x.kiemduyetphu == false).ToList().Count > 0 ? 1 :
                                  p.binhluanphu.Count == 0 ? 1 : 0
                      }).ToList();
              return query.ToList();
        }
        public List<danhgia> Getfillter_danhgia_choseday_theo_idsp(int _id_sp, String d)
        {
            var dl = collectiondanhgia.Find(x => x._id_sanpham == _id_sp && x.ngaydanhgia >= Convert.ToDateTime(d) && x.ngaydanhgia < Convert.ToDateTime(d).AddDays(1)).ToList();
            return dl;
        }
        public List<taikhoan> Gettennv_id(int id)
        {
            var dl = collectiontk.Find(x => x._id == id).ToList().Take(1).ToList();
            return dl;
        }

        public List<thongke> Getfillter_get_thong_ke_sp()
        {
            try
            {
                var dl = collectionspdt.Aggregate()
                                                .Lookup(
                                                    foreignCollection: collectiondanhgia,
                                                    localField: e => e._id,
                                                    foreignField: f => f._id_sanpham,
                                                    @as: (bangghepsanphamdanhgia eo) => eo.Danhgias
                                                )
                                                .Project(new BsonDocument()
                                                {
                                                    { "_id", "$ten" },
                                                    { "count", new BsonDocument() { { "$size", "$Danhgias" } } },
                                                    { "sum", new BsonDocument() { { "$sum", "$Danhgias.sosao" } } },
                                                })
                                                .Sort(new BsonDocument() { { "count", -1 } })
                                                .Match(new BsonDocument() { { "count", new BsonDocument() { { "$gte", 1 } } } })
                                                .ToList();

                List<thongke> returnValue = new List<thongke>();
                returnValue.AddRange(dl.Select(x => BsonSerializer.Deserialize<thongke>(x)));
                return returnValue;
            }
            catch { return null; }
        }

        public async Task<List<bangghepsanphamdanhgia_custom>> Getfillter_binhluan_1dayAsync()
        {
          await Task.Delay(500);
          
          var dl = collectionbinhluan.Find(x => x.ngaybinhluan >= DateTime.Today).ToList();
          var dl1= Get();
          var query = (from p in dl.AsQueryable()
                      join c in dl1.AsQueryable() on p._id_sanpham equals c._id
                      select new bangghepsanphamdanhgia_custom {
                        _id = p._id,
                        _id_sanpham = p._id_sanpham,
                        _tensp = c.ten,
                        _tenth = c.thuonghieu,
                        _id_loaisanpham = c._id_loaisanpham,
                        //_int_tb = p.binhluanphu.Where(x => x.chucdanh == true).ToList().Count > 0 ? 0 :
                        //          p.binhluanphu.Where(x => x.chucdanh == false).ToList().Count > 0 ? 1 :
                        //          p.binhluanphu.Count==0 ? 1 : 0
                        _int_tb = p.kiemduyet == false ? 1 :
                                  p.binhluanphu.Where(x => x.kiemduyetphu == true).ToList().Count > 0 ? 0 :
                                  p.binhluanphu.Where(x => x.kiemduyetphu == false).ToList().Count > 0 ? 1 :
                                  p.binhluanphu.Count == 0 ? 0 : 0
                      }).ToList();
              return query.ToList();
        }

        public async Task<List<nav_lsp>> Getloaisp_nav()
        {
          var nav = (from p in Getlsp().AsQueryable() select new nav_lsp { id_lsp=p._id, tenlsp = p.tendanhmuc, listthuonghieu = p.thuonghieu}).ToList();
          return nav;
        }
        
        public Boolean export_sanpham()
        {
            try
            {
                // --fields _id,ten,thuonghieu,hinh,dacdiemnoibat,giaban,giamgia,sosao,gioithieu,hinhdaidien,_id_loaisanpham,thongsokythuat
                ProcessStartInfo startInfo = new ProcessStartInfo();
                startInfo.FileName = @"C:\Program Files\MongoDB\Server\4.2\bin\mongoexport.exe";
                startInfo.Arguments = @"-d dienmayxanh -c sanpham --out " + Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) + @"\export_data\sanpham.json";
                startInfo.UseShellExecute = false;
                startInfo.RedirectStandardOutput = true;
                startInfo.RedirectStandardError = true;
                startInfo.RedirectStandardInput = true;
                startInfo.RedirectStandardError = true;
                startInfo.StandardOutputEncoding = Encoding.UTF8;
                startInfo.StandardErrorEncoding = Encoding.UTF8;
                startInfo.StandardInputEncoding = Encoding.UTF8;
                startInfo.WindowStyle = ProcessWindowStyle.Normal;

                Process proc = new Process();
                proc.StartInfo = startInfo;
                proc.Start();
                proc.WaitForExit();
                return true;
            }
            catch { return false; }
        }

        public Boolean import_sanpham(string filepath)
        {
            try
            {
                //filepath = @".\export_data\sanpham1.json";
                //FileInfo f = new FileInfo(filepath);
                //string fullname = f.FullName;
                //string file1 = Path.GetFullPath(filepath);
                //string file2 = Path.Combine(Directory.GetCurrentDirectory(), filepath);

                //string filePath = AppDomain.CurrentDomain.BaseDirectory + filepath;
                //string file3 = filePath;


                //string basePath = Environment.CurrentDirectory;
                //string relativePath = "" + filepath;
                //string fullPath = Path.GetFullPath(relativePath, basePath);

                string docPath1 = Environment.GetFolderPath(Environment.SpecialFolder.Windows) + filepath;
                string docPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) + @"\export_data\" + filepath.Replace("/", @"\");
                //List<string> dirs = new List<string>(Directory.EnumerateDirectories(docPath));

                //string currentDirectory = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
                //string[] fullFilePath = Directory.GetFiles(currentDirectory, "sanpham1.json", SearchOption.AllDirectories);

                //string exeFile = new System.Uri(Assembly.GetEntryAssembly().CodeBase).AbsolutePath;
                //string Dir = Path.GetDirectoryName(exeFile);
                //string path = Path.GetFullPath(Path.Combine(Dir, @"..\export_data\sanpham1.json"));


                //string file11 = Path.GetFullPath("C:export_data");
                //string file12 = Path.GetFullPath(@"export_data");
                //string file13 = Path.GetFullPath("sanpham1.json");

                //string AssemblyPath = Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location).ToString();
                //System.Diagnostics.Process.Start(path);
                string result = "";
                ProcessStartInfo startInfo = new ProcessStartInfo();
                startInfo.FileName = @"C:\Program Files\MongoDB\Server\4.2\bin\mongoimport.exe";
                startInfo.Arguments = @"-d dienmayxanh -c sanpham --file " + docPath;

                Process proc = new Process();
                proc.StartInfo = startInfo;
                proc.StartInfo.UseShellExecute = false;
                proc.StartInfo.RedirectStandardOutput = true;
                proc.OutputDataReceived += new DataReceivedEventHandler((sender, e) =>
                {
                    if (!String.IsNullOrEmpty(e.Data))
                    {
                        result += e.Data;
                    }
                });
                proc.Start();
                proc.BeginOutputReadLine();
                proc.WaitForExit();
                proc.Close();
                //string command = ""; //enter any command you want
                //System.Diagnostics.Process process = new System.Diagnostics.Process();
                //System.Diagnostics.ProcessStartInfo startInfo = new System.Diagnostics.ProcessStartInfo();
                //startInfo.WindowStyle = System.Diagnostics.ProcessWindowStyle.Hidden;
                //startInfo.FileName = "cmd.exe";
                //startInfo.Arguments = "/C " + command;
                //process.StartInfo = startInfo;
                //process.Start();
                return true;
            }
            catch { return false; }
        }

        public List<thongke5sao> thong_ke_sosao()
        {
            try
            {
                var dl = collectionspdt.Aggregate()
                                        .Group(new BsonDocument()
                                        {
                                            { "_id", "$sosao" },
                                            { "count", new BsonDocument("$sum",1)},
                                        })
                                        .Sort(new BsonDocument() { { "_id", 1 } })
                                        .ToList();

                List<thongke5sao> returnValue = new List<thongke5sao>();
                returnValue.AddRange(dl.Select(x => BsonSerializer.Deserialize<thongke5sao>(x)));
                return returnValue;
            }
            catch { return null; }
        }
        public List<thongke> thong_ke_loaisp()
        {
            try
            {
                var dl = collectionlsp.Aggregate()
                                         .Lookup(
                                              foreignCollection: collectionspdt,
                                              localField: e => e._id,
                                              foreignField: f => f._id_loaisanpham,
                                              @as: (banggheploaisanphamsanpham eo) => eo.Sanphams
                                          )
                                          .Project(new BsonDocument()
                                          {
                                              { "_id", "$tendanhmuc" },
                                              { "count", new BsonDocument() { { "$size", "$Sanphams" } } },
                                              { "sum", new BsonDocument() { { "$size", "$thuonghieu" } } },
                                          })
                                          .Sort(new BsonDocument() { { "count", -1 } })
                                          .Match(new BsonDocument() { { "count", new BsonDocument() { { "$gte", 1 } } } })
                                          .ToList();

                List<thongke> returnValue = new List<thongke>();
                returnValue.AddRange(dl.Select(x => BsonSerializer.Deserialize<thongke>(x)));
                return returnValue;
            }
            catch { return null; }
        }

        //         var results = memberCollection.Aggregate()
        // .Match(query)
        // .Group(new BsonDocument()
        // {
        // { "_id", "$_Ten" },
        // { "administrators",
        // new BsonDocument(
        // "$sum",
        // new BsonDocument("$cond", BsonSerializer.Deserialize<BsonArray>("[{ $eq: [ 
        // \"$role\", \"Administrator\"]}, 1, 0]") ))},
        // { "contributors",
        // new BsonDocument(
        // "$sum",
        // new BsonDocument("$cond", BsonSerializer.Deserialize<BsonArray>("[{ $eq: [ 
        // \"$role\", \"Contributor\"]}, 1, 0]") ))},
        // { "visitors",
        // new BsonDocument(
        // "$sum",
        // new BsonDocument("$cond", BsonSerializer.Deserialize<BsonArray>("[{ $eq: [ 
        // \"$role\", \"Visitor\"]}, 1, 0]") ))}
        // }).ToList();




        //var listNames = new[] { "A", "B" };

        //var query = entities.Aggregate()
        //    .Match(p => listNames.Contains(p.name))
        //    .Lookup(
        //      foreignCollection: others,
        //      localField: e => e.id,
        //      foreignField: f => f.entity,
        //      @as: (EntityWithOthers eo) => eo.others
        //    )
        //    .Project(p => new { p.id, p.name, other = p.others.First() })
        //    .Sort(new BsonDocument("other.name", -1))
        //    .ToList();

        static async Task CreateIndexSP(string connectionstring,string databasename, string collectionnamne)
        {
            var client = new MongoClient(connectionstring);
            var database = client.GetDatabase(databasename);
            var collection = database.GetCollection<sanphamdienthoai>(collectionnamne);
            await collection.Indexes.CreateOneAsync(Builders<sanphamdienthoai>.IndexKeys.Ascending(_ => _._id));
        }
        static async Task CreateIndexNameSP(string connectionstring, string databasename, string collectionnamne)
        {
            var client = new MongoClient(connectionstring);
            var database = client.GetDatabase(databasename);
            var collection = database.GetCollection<sanphamdienthoai>(collectionnamne);
            await collection.Indexes.CreateOneAsync(Builders<sanphamdienthoai>.IndexKeys.Ascending(_ => _.ten));
        }
    }
  
}
