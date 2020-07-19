using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace dienmayxanhapi.Model
{
  public class binhluan
  {
    public int? _id { get; set; }
    public string ten { get; set; }
    public Boolean gioitinh { get; set; }
    public string email { get; set; }
    public string noidung { get; set; }
    public List<string> hinh { get; set; }
    public int? luotthich { get; set; }
    public IList<binhluanphu> binhluanphu { get; set; }
    public int? _id_sanpham { get; set; }
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime ngaybinhluan { get; set; }
  }

  public class binhluanphu
  {
    public string noidung { get; set; }
    public List<string> hinh { get; set; }
    public int? luotthich { get; set; }
    public string ten { get; set; }
    public Boolean chucdanh { get; set; }
    public Boolean gioitinh { get; set; }
    public string email { get; set; }
    public DateTime ngaybinhluanphu { get; set; }
  }
}
