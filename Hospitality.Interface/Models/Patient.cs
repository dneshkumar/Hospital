using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hospitality.Interface.Models
{
    public class Patient
    {
        public int ID { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int Age { get; set; }

        [Required]
        public DateTime DateOfJoin { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string Mobile { get; set; }

        [Required]
        [MaxLength(50, ErrorMessage = "Disease content cannot be greater than 40")]
        [MinLength(2, ErrorMessage = "Disease content cannot be lesser than 2")]
        public string Disease { get; set; }
        public string Status { get; set; }
    }
}
