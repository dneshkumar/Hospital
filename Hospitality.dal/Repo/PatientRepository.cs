using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Hospitality.Interface.Interface;
using Hospitality.Interface.Models;

namespace Hospitality.dal.Repo
{
   public class PatientRepository : IPatient
    {
        private List<Patient> patient = new List<Patient>();
        private readonly PatientContext _db = new PatientContext();
        public IEnumerable<Patient> GetAll()
        {
            // TO DO : Code to get the list of all the records in database
            return _db.Patients.ToList();
        }

        public Patient Get(int id)
        {
            // TO DO : Code to find a record in database
             return _db.Patients.FirstOrDefault(p => p.ID == id);          
        }

        public string Add(Patient item)
        {
            try
            {
                if (item == null)
                {
                    throw new ArgumentNullException("item");
                }
                // TO DO : Code to save record into database
                _db.Patients.Add(item);
                _db.SaveChanges();
                return "Success";
            }
            catch (Exception ex)
            {
                return ex.Message.ToString();
            }
        }

        public string Update(Patient item)
        {
            try
            {
                Patient patientUpdate = _db.Patients.FirstOrDefault(p => p.ID == item.ID);
                if (patientUpdate == null)
                {
                    return "Invalid Input";
                }
                else
                {
                    patientUpdate.Name = item.Name;
                    patientUpdate.Age = item.Age;
                    patientUpdate.Address = item.Address;
                    patientUpdate.DateOfJoin = item.DateOfJoin;
                    patientUpdate.Disease = item.Disease;
                    patientUpdate.Gender = item.Gender;
                    patientUpdate.Status = item.Status;
                    patientUpdate.Mobile = item.Mobile;
                    _db.SaveChanges();
                    return "Success";
                }
            }
            catch (Exception ex)
            {
                return ex.Message.ToString();
            }
           }
    }
}
