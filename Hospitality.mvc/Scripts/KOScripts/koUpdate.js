var parsedSelectedPatient = $.parseJSON(selectedPatient);
$(function () {
    ko.validation.init({
        errorElementClass: "errorStyle",
        errorClass: 'errorStyle'
    }, true);
    ko.applyBindings(new modelUpdate());
});

//assign dropdown value
var availableStatus = [
    {
        "Value": "Admitted",
        "Text": "Admitted"
    },
    {
        "Value": "Discharged",
        "Text": "Discharged"
    }
];
var availableGender = [
    {
        "Value": "Male",
        "Text": "Male"
    },
    {
        "Value": "Female",
        "Text": "Female"
    },
    {
        "Value": "Others",
        "Text": "Others"
    }
];


//function: viewmodal initialisation and call when update button is clicked
function modelUpdate() {
    var self = this;
   // var serialisedDate = new Date(parseInt(parsedSelectedPatient.DateOfJoin.substr(6)));
   // var dateFormat = serialisedDate.toISOString().substring(0,10);    //minus one day

    //for date convertion
    var fullDate = new Date(parseInt(parsedSelectedPatient.DateOfJoin.substr(6)));
    var twoDigitMonth = (fullDate.getMonth() + 1) + ""; if (twoDigitMonth.length == 1) twoDigitMonth = "0" + twoDigitMonth;
    var twoDigitDate = fullDate.getDate() + ""; if (twoDigitDate.length == 1) twoDigitDate = "0" + twoDigitDate;
    var currentDate = fullDate.getFullYear() +"-" + twoDigitMonth + "-" + twoDigitDate;
    //end of date convertion


    self.showErrors = ko.observable(false);
    self.validateNow = ko.observable(false);
    self.Patients = ko.observable();
    self.ID = ko.observable(parsedSelectedPatient.ID),
    self.Name = ko.observable(parsedSelectedPatient.Name).extend({ required: { message: "Required" } }),
        self.Age = ko.observable(parsedSelectedPatient.Age).extend({ required: { message: "Required" } }).extend({ number: true }),
        self.DateOfJoin = ko.observable(currentDate).extend({ required: { message: "Required" } }),
        self.Address = ko.observable(parsedSelectedPatient.Address).extend({ required: { message: "Required" } }),
        self.Gender = ko.observable(parsedSelectedPatient.Gender).extend({ required: { message: "Required" } }),
        self.Mobile = ko.observable(parsedSelectedPatient.Mobile).extend({
            required: { message: "Required" },
        }).extend({ number: true }),
        self.Disease = ko.observable(parsedSelectedPatient.Disease).extend({
        required: { message: "Required" }, minLength: { params: 2, message: "Minimum 2 words" },
        maxLength: { params: 40, message: "Maximum 40 words" }
        }),
        self.Status = ko.observable(parsedSelectedPatient.Status),

        self.updatePatient = function () {
            if (self.errors().length === 0) {
                self.Patients(new _Patient({
                    ID:self.ID(),
                    Name: self.Name(),
                    Age: self.Age(),
                    DateOfJoin: self.DateOfJoin(),
                    Address: self.Address(),
                    Gender: self.Gender(),
                    Mobile: self.Mobile(),
                    Disease: self.Disease(),
                    Status: self.Status(),
                }));
                //clear all the fields
                self.ID(""),
                self.Name(""),
                    self.Age(""),
                    self.DateOfJoin(""),
                    self.Address(""),
                    self.Gender(""),
                    self.Mobile(""),
                    self.Disease(""),
                    self.Status("")
                self.showErrors(false);
                self.errors.showAllMessages(false);
                try {
                    $.ajax({
                        url: '/Patients/Update',
                        type: 'POST',
                        dataType: 'html',
                        data: ko.toJSON(self.Patients), //Here the data wil be converted to JSON
                        contentType: 'application/json; charset=utf-8',
                        success: successCallback,
                        error: errorCallback
                    });
                }
                catch (e) {
                    CallPopUp(e, 'error');
                }
            }
            else {
                self.showErrors(true);
                self.errors.showAllMessages(true);
            }
        }
    self.errors = ko.validation.group(self);
}


function successCallback(data) {
    if (data == "1") {
        CallPopUp("Patient Updated Successfully", 'success');
        
    }
        else
            CallPopUp("Enter the Required Fields", 'error');
}
function errorCallback(err) {
    CallPopUp(err, 'error');
}

//function: to show popup
function CallPopUp(data, icon) {
    Swal.fire({
        position: 'center',
        icon: icon,
        title: data,
        showConfirmButton: false,
        timer: 3000
    }).then(function () {
        debugger;
        if(icon == "success")
        location.href = "/";
    });
}

//function: to create patient object
function _Patient(data) {
    this.ID = ko.observable(data.ID);
    this.Name = ko.observable(data.Name);
    this.Age = ko.observable(data.Age);
    this.DateOfJoin = ko.observable(data.DateOfJoin);
    this.Address = ko.observable(data.Address);
    this.Gender = ko.observable(data.Gender);
    this.Mobile = ko.observable(data.Mobile);
    this.Disease = ko.observable(data.Disease);
    if (data.Status != undefined)
        this.Status = ko.observable(data.Status);
    else
        this.Status = ko.observable();
}
