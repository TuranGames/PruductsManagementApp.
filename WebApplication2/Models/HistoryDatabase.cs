using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApplication2.Data;

namespace WebApplication2.Models
{
    public class HistorytDatabase
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public int Id { get; set; }
        public string cashOwned { get; set; }
        public string client { get; set; }
        public string date { get; set; }
        public string amount { get; set; }
        public string comment { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [DefaultValue(0)]
        public int confirmed { get; set; }
        public string productId { get; set; }


    }
}
