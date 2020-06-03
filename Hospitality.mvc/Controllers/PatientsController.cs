using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Hospitality.Interface.Models;
using Hospitality.dal.Repo;
using System.Web.Script.Serialization;

namespace Hospitality.mvc.Controllers
{
    public class PatientsController : Controller
    {
        PatientRepository objRepo = new PatientRepository();


        //show the initial page
        public ActionResult Index()
        {
            try
            {
                return View();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //GET
        //Show all the patients
        public JsonResult ShowPatients()
        {
            try
            {
                return Json(objRepo.GetAll().ToList(), JsonRequestBehavior.AllowGet);
                // return View(PatientList);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // GET:
        //Patients/Create
        //Create new patient Screen
        public ActionResult Create()
        {
            try
            {
                return View();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // POST: 
        //Patients/Create?patient
        // Create a new patient and save it
        [HttpPost]
        public string Create(Patient patient)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    objRepo.Add(patient);
                    return "1";
                }
                else
                {
                    return "0";
                }
            }
            catch (Exception ex)
            {
                return ex.ToString();
                throw ex;
            }

            //return Json(objRepo.GetAll().ToList(), JsonRequestBehavior.AllowGet);
        }


        // GET: 
        //Patients/Edit/5
        //get the selected patient for edit based on selected id
        public ActionResult Edit(int id)
        {
            Patient patientById = null;
            var serializer = new JavaScriptSerializer();
            try
            {
                if (id == null)
                {
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
                }
                else
                {
                    patientById = objRepo.Get(id);
                    if (patientById == null)
                    {
                        return HttpNotFound();
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            ViewBag.SelectedPatient = serializer.Serialize(patientById);
            return View();
        }

        // POST: 
        //Patients/Edit/5
        // Update the existing patient details and save it.
        [HttpPost]
        public string Update(Patient patient)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    objRepo.Update(patient);
                    return "1";
                }
                else
                {
                    return "0";

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}
