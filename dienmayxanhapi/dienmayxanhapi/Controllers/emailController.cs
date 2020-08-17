using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using dienmayxanhapi.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace dienmayxanhapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class emailController : ControllerBase
    {
      private readonly dienmayxanhdbcontext _eService;
      public emailController(dienmayxanhdbcontext eService)
      {
        _eService = eService;
      }
      [HttpPost]
      [Route("send-email")]
      public async Task SendEmail([FromBody]emailmode email)
      {
        var e = _eService.Getemail();
        for (int i = 0; i < e.Count; i++)
        {
          var message = new MailMessage();
          message.To.Add(new MailAddress("Some one,<" + e[i].email + ">"));
          message.From = new MailAddress("Website dienmayxanh  <ddienmmayxanh@gmail.com>");
          message.Subject = "I send mail for me";
          message.Body = "Thông báo từ website ĐIỆN MÁY XANH: khách hàng " + email.subject;
          message.Subject = "Thông báo từ website ĐIỆN MÁY XANH";
          SmtpClient client = new SmtpClient("smtp.gmail.com");
          client.Port = 587;
          client.UseDefaultCredentials = true;
          client.EnableSsl = true;
          client.Credentials = new System.Net.NetworkCredential("ddienmmayxanh@gmail.com", "ngay12thang08");
          await client.SendMailAsync(message);
        }
    }
  }
}
