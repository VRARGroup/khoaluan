using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using dienmayxanhapi.Model;
using MongoDB.Driver;

namespace dienmayxanhapi.SignalRHubs
{
  public class SignalHub : Hub
  {
    //private IHubContext<SignalHub> _hub;

    //public SignalHub(IHubContext<SignalHub> hub)
    //{
    //  _hub = hub;
    //}
    public override async Task OnConnectedAsync()
    {
      await Clients.Caller.SendAsync(Context.ConnectionId, "Connected");
      await base.OnConnectedAsync();
    }
    public override async Task OnDisconnectedAsync(Exception exception)
    {
      await Clients.Caller.SendAsync(Context.ConnectionId, "Disconnected");
      await base.OnDisconnectedAsync(exception);
    }

    private IMongoCollection<sanphamdienthoai> collectionspdt;

    public async Task send(string text)
    {
      var client = new MongoClient("mongodb://localhost:27017");
      var database = client.GetDatabase("dienmayxanh");
      collectionspdt = database.GetCollection<sanphamdienthoai>("sanpham");
      var dl = collectionspdt.Find(x => x.ten.Contains(text)).ToList();

      await Clients.All.SendAsync("send", dl);
    }
    public async Task resend(string text)
    {
      await Clients.All.SendAsync(text);
    }
  }
}
