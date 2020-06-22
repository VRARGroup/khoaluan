using System;
using System.Collections.Generic;
using System.Linq;
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
            var dl = collectionspdt.Find(x => true && (x.giamgia != 0 || x.giamgia != null)).ToList().OrderByDescending(t=>t.giamgia);
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
            var dl = collectionspdt.Find(x => x._id_loaisanpham == idlsp && (x.giamgia != 0 || x.giamgia !=null)).ToList().Take(10).ToList();
            return dl;
        }
        public List<sanphamdienthoai> Getfillter_get_sp_noi_bat()
        {
          var dl = collectionspdt.Find(x => (x.giamgia != 0 || x.giamgia != null)).ToList().Take(10).ToList();
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
        public List<sanphamdienthoai> Update(FilterDefinition<BsonDocument> filter, UpdateDefinition<BsonDocument> update)
        {
            var client = new MongoClient(ConnectionString);
            var database = client.GetDatabase(DatabaseName);
            var collectionsvupdate = database.GetCollection<BsonDocument>(CollectionNamesp);
            collectionsvupdate.UpdateOne(filter, update);
            var dl = collectionspdt.Find(x => true).ToList();
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
  }


}
