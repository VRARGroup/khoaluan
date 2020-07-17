using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using dienmayxanhapi.Model;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Driver;

namespace dienmayxanhapi
{
    public class dienmayxanhdbcontext
    {
        public virtual DbSet<sanphamdienthoai> sanphamdienthoai { get; set; }
        public virtual DbSet<loaisanpham> loaisanpham { get; set; }
        public virtual DbSet<hinhanhfolder> hinhanhfolder { get; set; }
        public virtual DbSet<danhsachquyen> danhsachquyen { get; set; }
        public virtual DbSet<taikhoan> taikhoan { get; set; }
        public virtual DbSet<group> group { get; set; }
        public virtual DbSet<danhgia> danhgia { get; set; }
        private string ConnectionString = "mongodb://localhost:27017";
        private string DatabaseName = "dienmayxanh";
        private string CollectionNamesp = "sanpham";
        private string CollectionNameloaisp = "loaisanpham";
        private string CollectionNamedanhsachquyen = "danhsachquyen";
        private string CollectionNametaikhoan = "taikhoan";
        private string CollectionNametgroup = "group";
        private string CollectionNamedanhgia = "danhgia";
        private readonly IMongoCollection<sanphamdienthoai> collectionspdt;
        private readonly IMongoCollection<loaisanpham> collectionlsp;
        private readonly IMongoCollection<danhsachquyen> collectiondsq;
        private readonly IMongoCollection<taikhoan> collectiontk;
        private readonly IMongoCollection<group> collectiongroup;
        private readonly IMongoCollection<danhgia> collectiondanhgia;
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

        //bỏ
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
          var dl = collectiondanhgia.Find(x =>x._id_sanpham==_id).ToList().Take(3).ToList();
          return dl;
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
            var dl = collectionspdt.Find(x => x._id_loaisanpham == idlsp).ToList().Select(x => x.giaban).Max();
            List<string> vs = new List<string>();
            vs.Add("Dưới " + dl * 0.1);
            vs.Add("Từ " + dl * 0.1 + "-" + dl * 0.2);
            vs.Add("Từ " + dl * 0.2 + "-" + dl * 0.3);
            vs.Add("Từ " + dl * 0.3 + "-" + dl * 0.5);
            vs.Add("Từ " + dl * 0.5 + "-" + dl * 0.7);
            vs.Add("Trên " + dl * 0.7);
            return vs;
        }
        
        public List<sanphamdienthoai> Getfillter_list_suggest_category(int idlsp, string arr_thuonghieuu)
        {
            var dl = collectionspdt.Find(x => x._id_loaisanpham == idlsp && arr_thuonghieuu.Contains(x.thuonghieu)).ToList();
            return dl;
        }
    }
}
