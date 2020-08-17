using dienmayxanhapi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dienmayxanhapi.Hubservice
{
  public class SignalService : ISignalService
  {
    private readonly dienmayxanhdbcontext _mainDbContext;

    public SignalService(dienmayxanhdbcontext mainDbContext)
    {
      _mainDbContext = mainDbContext;
    }

    public async Task<bool> SaveSignalAsync(binhluan inputModel)
    {
      try
      {
        
        _mainDbContext.binhluan.Add(inputModel);
        return await _mainDbContext.SaveChangesAsync() > 0;
      }
      catch (Exception exception)
      {
        //log the exception or take some actions

        return false;
      }
    }
    public async Task<bool> SaveSignalidexAsync(idex inputModel)
    {
      try
      {

        _mainDbContext.idex.Add(inputModel);
        return await _mainDbContext.SaveChangesAsync() > 0;
      }
      catch (Exception exception)
      {
        //log the exception or take some actions
        return false;
      }
    }
    public async Task<bool> SaveSignaldgAsync(danhgia inputModel)
    {
      try
      {
        
        _mainDbContext.danhgia.Add(inputModel);
        return await _mainDbContext.SaveChangesAsync() > 0;
      }
      catch (Exception exception)
      {
        //log the exception or take some actions

        return false;
      }
    }

    public async Task<bool> SaveSignalidexdgAsync(idex inputModel)
    {
      try
      {

        _mainDbContext.idex.Add(inputModel);
        return await _mainDbContext.SaveChangesAsync() > 0;
      }
      catch (Exception exception)
      {
        //log the exception or take some actions

        return false;
      }
    }
  }
}
