using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace dienmayxanhapi.Model
{
    public class loaisanpham
    {
        public int? _id { get; set; }
        public string tendanhmuc { get; set; }
        public List<string> thuonghieu { get; set; }
        public IList<dynamic> dactrung { get; set; }
        public List<string> tieuchidanhgia { get; set; }

    }
}
