using Hospitality.Interface.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hospitality.Interface.Interface
{
    public interface IPatient
    {
        IEnumerable<Patient> GetAll();
        Patient Get(int id);
        string Add(Patient item);
        string Update(Patient item);
    }
}
