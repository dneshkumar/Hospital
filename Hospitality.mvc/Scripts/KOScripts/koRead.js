

$(function () {
    debugger;
    ko.applyBindings(modelView);
    modelView.viewPatients();
});

//function: to display all the patients on pageload
var modelView = {
    Patients: ko.observableArray([]),
    viewPatients: function () {
        var thisObj = this;
        try {
            debugger;
            $.ajax({
                url: '/Patients/ShowPatients',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    thisObj.Patients(data); //Here we are assigning values to KO Observable array
                },
                error: function (err) {
                    alert(err.status + " : " + err.statusText);
                }
            });
        } catch (e) {
            alert(e);
        }
    }
};