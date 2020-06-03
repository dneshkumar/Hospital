

$(function () {
    ko.validation.init({
        errorElementClass: "errorStyle",
        decorateElement: true,
        errorClass: 'errorStyle'
        //, insertMessages: false
    }, true);
    ko.applyBindings(new modelCreate());
});

//assign dropdown values
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


//function: viewmodel initialisation and call when new patient is creadted
function modelCreate() {
    var self = this;
    self.showErrors = ko.observable(false);
    self.validateNow = ko.observable(false);
    self.Patients = ko.observable();
    self.Name = ko.observable().extend({ required: { message: "Required" } }),
        self.Age = ko.observable().extend({ required: { message: "Required" } }).extend({ number: true }),
        self.DateOfJoin = ko.observable().extend({ required: { message: "Required" } }),
        self.Address = ko.observable().extend({ required: { message: "Required" } }),
        self.Gender = ko.observable().extend({ required: { message: "Required" } }),
        self.Mobile = ko.observable().extend({
            required: { message: "Required" },
            //    pattern: {
            //        message: 'Invalid phone number',
            //        params: '^06-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}$'
            //}
        }).extend({ number: true }),
        self.Disease = ko.observable().extend({
            required: { message: "Required" }, minLength: {params: 2,  message: "Minimum 2 words" },
                                               maxLength: {params: 40,  message: "Maximum 40 words" }
        }),
        self.Status = ko.observable(),

        self.createPatient = function () {
            debugger;
            if (self.errors().length === 0) {
                    self.Patients(new _Patient({
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
                            url: '/Patients/Create',
                            type: 'POST',
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'html',
                            data: ko.toJSON(self.Patients), //Here the data wil be converted to JSON
                            success: function (data) {
                                if (data == "1")
                                    CallPopUp("Patient Created Successfully", 'success');
                                else
                                    CallPopUp("Enter the Required Fields", 'error');
                            },
                            error: function (err) {
                                CallPopUp(err, 'error');
                            }
                        });
                    } catch (e) {
                        CallPopUp(e, 'error');
                    }
                }
                else {
                    debugger;
                    self.showErrors(true);
                    self.errors.showAllMessages(true);
                }
            }
            self.errors = ko.validation.group(self);
        };

//function: to show up message
    function CallPopUp(data, icon) {
        Swal.fire({
            position: 'center',
            icon: icon,
            title: data,
            showConfirmButton: false,
            timer: 2000
        })
}

//function: to create patient object
    function _Patient(data) {
        this.Name = ko.observable(data.Name);
        this.Age = ko.observable(data.Age);
        this.DateOfJoin = ko.observable(data.DateOfJoin);
        this.Address = ko.observable(data.Address);
        this.Gender = ko.observable(data.Gender.Value);
        this.Mobile = ko.observable(data.Mobile);
        this.Disease = ko.observable(data.Disease);
        if (data.Status != undefined)
            this.Status = ko.observable(data.Status.Value);
        else
            this.Status = ko.observable();
    }

