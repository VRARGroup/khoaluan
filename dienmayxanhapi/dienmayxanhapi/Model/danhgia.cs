using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dienmayxanhapi.Model
{
  public class danhgia
  {
    public int? _id { get; set; }
    public int? sosao { get; set; }
    public string ten { get; set; }
    public string sdt { get; set; }
    public string email { get; set; }
    public string noidung { get; set; }
    public List<string> hinh { get; set; }
    public int? luotthich { get; set; }
    public IList<danhgiaphu> danhgiaphu { get; set; }
    public List<Boolean> tieuchidanhgia { get; set; }
    public int? _id_sanpham { get; set; }
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime ngaydanhgia { get; set; }

  }

  public class danhgiaphu
  {
    public string noidung { get; set; }
    public int? luotthich { get; set; }
    public string ten { get; set; }
    public Boolean gioitinh { get; set; }
    public string email { get; set; }
    public DateTime ngaydanhgiaphu { get; set; }
  }
}
