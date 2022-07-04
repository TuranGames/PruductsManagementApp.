using Microsoft.EntityFrameworkCore;
using WebApplication2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication2.Data
{
    public class AppDBContext: DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {

        }

        public DbSet<TestDatabase> TestDb { get; set; }
        
        public DbSet<HistorytDatabase> HistoryDb { get; set; }

    }
}
