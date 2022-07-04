using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebApplication2.Data;
using WebApplication2.Models;
using static System.Net.Mime.MediaTypeNames;


namespace WebApplication2.Controllers
{
    public class HomeController : Controller
    {
        
        private readonly AppDBContext _db;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public HomeController( AppDBContext db, IWebHostEnvironment webHostEnvironment)
        {

            _db = db;
            _webHostEnvironment = webHostEnvironment;
        }

        public string GetName(string surname = "")
        {
            string res = _db
            .TestDb
            .Where(u => u.qrImage == surname)
            .Select(u => u.image)
            .FirstOrDefault();

            return res;
        }

        public IActionResult Index()
        {
            ViewBag.name = GetName("surname");
            IEnumerable<TestDatabase> objList = _db.TestDb;
            return View(objList);
        }

        public IActionResult Products()
        {
           
            IEnumerable<TestDatabase> objList = _db.TestDb;
            return View(objList);
        }
        public IActionResult New()
        {
            var objList = _db
            .HistoryDb
            .Where(u => u.confirmed == 0).Select(u => u);
            return View(objList.ToList());
        }

        public List<HistorytDatabase> getContent(int divsNumber)
        {
         
                var total = _db
                .HistoryDb
                .Where(u => u.confirmed == 0).Select(u => u).Count();
      
                if (divsNumber >= total)
                {
                    return null;
                    
                }
                else
                {
                    var objList = _db
                .HistoryDb.OrderByDescending(p => p.Id);
                    return objList.ToList();
                }
        
                       

        }
        public IActionResult Insert()
        {
            return View(); 
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Create(TestDatabasetr td)
        {
            string imageFilePath = "";
            string uniqueFileName = "";
            string uploadFolder = "";




            if (td.photo != null)
            {
                uploadFolder = Path.Combine(_webHostEnvironment.WebRootPath, "images");
                uniqueFileName = td.product + "-" + td.photo.FileName;
                 imageFilePath = Path.Combine(uploadFolder, uniqueFileName);
                td.photo.CopyTo(new FileStream(imageFilePath,FileMode.Create));
            }
            var author = new TestDatabase { initialAmount = td.initialAmount, currentAmount = td.currentAmount, product = td.product, date = td.date, image = uniqueFileName,  containerNumber = td.containerNumber };
             _db.Add<TestDatabase>(author);
            _db.SaveChanges();
            return RedirectToAction("Products"); 
        }

        public ActionResult DownloadPic(int? id)
        {
            string res = _db
           .TestDb
           .Where(u => u.Id == id)
           .Select(u => u.image)
           .FirstOrDefault();
            string path = Path.Combine(_webHostEnvironment.WebRootPath, "images/"+ res);
            byte[] imageByteData = System.IO.File.ReadAllBytes(path);
            string base22 = Convert.ToBase64String(imageByteData);
            return Content("data:image/png;base64,"+base22);
        }
        [HttpGet("{productId}/{amount}/{client}/{cashOwned}/{comment}")]
        public void GetQuery(string productId, string amount, string client, string cashOwned, string comment)
        {
            var date = DateTime.Now.ToString("yyyy-MM-dd");
            var author = new HistorytDatabase { productId = productId, date = date, amount = amount, client = client, cashOwned = cashOwned, comment = comment };
            _db.Add<HistorytDatabase>(author);
            _db.SaveChanges();
        }

        public string doCmd(string comd,int id)
        {
            if(comd == "cancel")
            {
                HistorytDatabase customer = new HistorytDatabase() { Id = id };
                _db.HistoryDb.Attach(customer);
                _db.HistoryDb.Remove(customer);
                _db.SaveChanges();
                return "canceled";
            }
            else if (comd == "confirm")
            {
                var result = _db.HistoryDb.SingleOrDefault(b => b.Id == id);
             
                    result.confirmed = 1;
                    _db.SaveChanges();
                    return "confirmed";
               
            }
            return "sfs";
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
