using System;
using System.Collections.Generic;
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
        private string ConnectionString = "mongodb://localhost:27017";
        private string DatabaseName = "dienmayxanh";
        private string CollectionNamesp = "sanpham";
        private string CollectionNameloaisp = "loaisanpham";
        private readonly IMongoCollection<sanphamdienthoai> collectionspdt;
        private readonly IMongoCollection<loaisanpham> collectionlsp;

        public dienmayxanhdbcontext()
        {
            var client = new MongoClient(ConnectionString);
            var database = client.GetDatabase(DatabaseName);
            collectionspdt = database.GetCollection<sanphamdienthoai>(CollectionNamesp);
            collectionlsp = database.GetCollection<loaisanpham>(CollectionNameloaisp);
        }
        public List<sanphamdienthoai> Get()
        {
            var dl = collectionspdt.Find(x =>true).ToList();
            return dl;
        }

        public List<sanphamdienthoai> Gethotsp()
        {
            var dl = collectionspdt.Find(x => true && (x.giamgia != 0 && x.giamgia != null)).ToList().OrderByDescending(t=>t.giamgia);
            return dl.Take(11).ToList();
        }

        public List<sanphamdienthoai> Getfillter(string tensp)
        {
            var dl = collectionspdt.Find(x =>x.ten==tensp).ToList();
            return dl;
        }

        public List<sanphamdienthoai> Gettsp_lspfillter(int id, string tensp)
        {
          
          var dl = collectionspdt.Find(x => x._id_loaisanpham==id && x.thuonghieu == tensp).ToList();
          return dl;
        }

        public List<sanphamdienthoai> Getfillterspidlsp(int idlsp)
        {
            var dl = collectionspdt.Find(x => x._id_loaisanpham == idlsp).ToList();
            return dl;
        }
        public List<sanphamdienthoai> Getfillterspkmhotidlsp(int idlsp)
        {
            var dl = collectionspdt.Find(x => x._id_loaisanpham == idlsp && (x.giamgia != 0 && x.giamgia !=null)).ToList().Take(20).ToList();
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
            if(same!=null)
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
                array_name.RemoveRange(count -1,array_name.Count()- count+1);
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
                for(int i=0;i<array_name.Count;i++)
                {
                    if(array_name[i].Contains("GB"))
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
            var dl = collectionspdt.Find(x => x._id_loaisanpham == name._id_loaisanpham && x._id != idsp && x.giaban > name.giaban*0.6 && x.giaban < name.giaban*1.4).ToList().Take(5).ToList();
            return dl;
        }

        public List<sanphamdienthoai> Getfillter_list_product(int idlsp)
        {
            var dl = collectionspdt.Find(x => x._id_loaisanpham == idlsp).ToList().Take(20).ToList();
            return dl;
        }
        public List<sanphamdienthoai> Getfillter_list_product2(int idlsp)
        {
          var dl = collectionspdt.Find(x => x._id_loaisanpham == idlsp).ToList().Skip(20).ToList();
          return dl;
        }
    }
}
