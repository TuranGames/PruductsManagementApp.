using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplication2.Data;

namespace WebApplication2.Models
{
    public class TestDatabase
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public int Id { get; set; }
        public string product { get; set; }
        public string initialAmount { get; set; }
        public string currentAmount { get; set; }
        public string date { get; set; }
        public string containerNumber { get; set; }
        public string qrImage { get; set; }
        public string image { get; set; }


    }
}
