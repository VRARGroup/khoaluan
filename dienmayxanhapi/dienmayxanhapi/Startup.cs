using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.AspNet.SignalR;
using dienmayxanhapi.SignalRHubs;
using dienmayxanhapi.Hubservice;

namespace dienmayxanhapi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<dienmayxanhdbcontext>();
            services.AddControllers();
            services.AddCors();
            services.Configure<FormOptions>(o => {
              o.ValueLengthLimit = int.MaxValue;
              o.MultipartBodyLengthLimit = int.MaxValue;
              o.MemoryBufferThreshold = int.MaxValue;
            });
            
            services.AddTransient<ISignalService, SignalService > ();

            services.AddSignalR();
            services.AddCors(o => o.AddPolicy("CorsPolicy", builder =>
            {
              builder
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials()
              .WithOrigins("http://localhost:4200");
            }));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            

            app.UseAuthorization();
            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions()
            {
              FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
              RequestPath = new PathString("/Resources")
            });

            app.UseCors("CorsPolicy");

            //signalR service configured
            app.UseSignalR(routes =>
            {
              routes.MapHub<SignalHub>("/signalHub");
            });

            app.UseEndpoints(endpoints =>
                  {
                      endpoints.MapControllers();
                  });
        }
    }
}
