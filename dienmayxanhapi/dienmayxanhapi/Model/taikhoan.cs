using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dienmayxanhapi.Model
{
  public class taikhoan
  {
    public int? _id { get; set; }
    public string username { get; set; }
    public string password { get; set; }
    public string tennv { get; set; }
    public string email { get; set; }
    public Boolean hoatdong { get; set; }
    public Boolean giayphep { get; set; }
    public int? _id_group { get; set; }
  }
}
