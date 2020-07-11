using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dienmayxanhapi.Model
{
  public class group
  {
    public int? _id { get; set; }
    public string tengroup { get; set; }
    public IList<danhsachquyentruycap> danhsachquyentruycap { get; set; }
  }

  public class danhsachquyentruycap
  {
    public int? _id_quyen { get; set; }
  }
}
