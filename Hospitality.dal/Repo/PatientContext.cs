using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using Hospitality.Interface.Models;

namespace Hospitality.dal
{
   public class PatientContext : DbContext
    {

        public PatientContext() : base("PatientContext")
        {
           // Database.SetInitializer(new DropCreateDatabaseIfModelChanges<PatientContext>());
        }


        // create a patient table
        public DbSet<Patient> Patients { get; set; }
    }
}
