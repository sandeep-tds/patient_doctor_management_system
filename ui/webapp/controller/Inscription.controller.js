sap.ui.define([
	"com/todo/demo/ui/controller/BaseController",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/odata/v4/ODataModel",
], function (BaseController, MessageToast, JSONModel, ODataModel) {
	"use strict";

	return BaseController.extend("com.todo.demo.ui.controller.Inscription", {
		onInit: function () {
			this.setPageInfoMessage();
		},

		setPageInfoMessage: function () {
			var userDetails = this.getOwnerComponent().getModel("userInfo").getProperty("/data");
			var docFirstName = userDetails.givenName;
			var docLastName = userDetails.familyName;
			var pageInfoMessage = "Entrez les détails pour " + docFirstName + " " + docLastName;
			this.getView().byId("Title3").setText(pageInfoMessage)
		},

		inscriptionOK: function (evt) {

			var jsonObject = {};
			var patients = [];
			jsonObject.patients = patients;
			console.log(jsonObject);

			var firstName = this.getView().byId("idFirstName").getValue();
			var email = this.getView().byId("email").getValue();
			var password = this.getView().byId("password").getValue();
			var street = this.getView().byId("street").getValue();
			var addressnum = this.getView().byId("addressnum").getValue();
			var town = this.getView().byId("town").getValue();
			var zipcode = this.getView().byId("zipcode").getValue();
			var country = this.getView().byId("country").getValue();
			var doctorId = this.getOwnerComponent().getModel("userInfo").getProperty("/data").email;

			var patientsSet = {
				"firstName": firstName,
				"email": email,
				"password": password,
				"street": street,
				"addressnum": addressnum,
				"town": town,
				"zipcode": zipcode,
				"country": country,
				"doctorId": doctorId
			}

			jsonObject.patients.push(patientsSet);
			var patientJSONString = JSON.stringify(jsonObject);
			console.log("JSON Object: ", patientJSONString);

			var url = '/pdmsbackend/dbtask/addPatient';

			jQuery.ajax({
				url: url, // Add product URL
				type: "PUT", // Request Type - PUT
				headers: {
					'x-csrf-token': sap.ui.getCore().AppContext.token // CSRF token
				},
				data: patientJSONString, // Details of the product entered by the user
				contentType: "application/json", // The format of the data sent
				success: function (result) {
					// API call was successful
					console.log(result);
					if (status == 200)
						console.log('reussi');
				},
				error: function (e) {
					// API call failed
					console.log(e.message);
				}
			});

		}

	});

});