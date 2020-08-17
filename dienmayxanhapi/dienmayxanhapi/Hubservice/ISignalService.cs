using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dienmayxanhapi.Model;

namespace dienmayxanhapi.Hubservice
{
  public interface ISignalService
  {
    Task<bool> SaveSignalAsync(binhluan inputModel);
    Task<bool> SaveSignalidexAsync(idex inputModel);
    Task<bool> SaveSignaldgAsync(danhgia inputModel);
    Task<bool> SaveSignalidexdgAsync(idex inputModel);
  }
}
