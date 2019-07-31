sap.ui.define([
	"com/todo/demo/ui/controller/BaseController",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/odata/v4/ODataModel",
], function (BaseController, MessageToast, JSONModel, ODataModel) {
	"use strict";

	return BaseController.extend("com.todo.demo.ui.controller.Inscription", {
		onInit: function () {
			var user = {
				USER_FIRST_NAME: "testtt"
			};
			var userModel = new JSONModel(user);
			this.getView().setModel(userModel);

			// $.ajax({

			//         url : '/patient_service/hopeteameast/insert_sign_in.xsjs?command=getcoachName',
			//         type : 'GET',
			//         // dataType : 'json',   // pas nécessaire mais au cas où..
			//         async: true,
			//         success : function(data){
			//         	console.log("ajax call working");
			//         	console.log(data);
			//         	var oData = data;
			// 			var oModel = new JSONModel(oData);
			// 			that.getView().setModel(oModel,"patient");
			//         },
			//   error: function(xhr, status, errorThrown) {
			//           console.log(xhr);
			//           console.log(status);
			//           console.log(errorThrown);
			//         }
			// });


		},

		inscriptionOK: function (evt) {
			console.log("in");

			var jsonObject = {};
			var patients = [];
			jsonObject.patients = patients;
			console.log(jsonObject);
			console.log("hey");

			var firstName = this.getView().byId("idFirstName").getValue();
			var email = this.getView().byId("email").getValue();
			var password = this.getView().byId("password").getValue();
			var street = this.getView().byId("street").getValue();
			var addressnum = this.getView().byId("addressnum").getValue();
			var town = this.getView().byId("town").getValue();
			var zipcode = this.getView().byId("zipcode").getValue();
			var country = this.getView().byId("country").getValue();
			var doctorId = this.getView().byId("doctorId").getSelectedItem().getKey();


			var patients = {
				"firstName": firstName,
				"email": email,
				"password": password,
				"street": street,
				"addressnum": addressnum,
				"town": town,
				"zipcode": zipcode,
				"country": country,
			}

			jsonObject.patients.push(patients);
			console.log(jsonObject);


			var url = '/pdmsbackend/dbtask/addPatient';

			jQuery.ajax({
				url: url, // Add product URL
				type: "PUT", // Request Type - PUT
				headers: {
					'x-csrf-token': sap.ui.getCore().AppContext.token // CSRF token
				},
				data: jsonObject, // Details of the product entered by the user
				contentType: "application/json", // The format of the data sent
				success: function (result) {
					// API call was successful
					console.log(response);
					if (status == 200)
						console.log('reussi');
				},
				error: function (e) {
					// API call failed
					console.log(e.message);
				}
			});

			// var manager = "Jane Doe";
			// jsonObject.patients[0].manager = manager;
			// console.log(jsonObject);

			// console.log(JSON.stringify(jsonObject));

			// console.log(firstname);
			// console.log(email);
			// console.log(password);
			// console.log(street);
			// console.log(addressnum);
			// console.log(town);
			// console.log(zipcode);
			// console.log(country);

			// $.ajax({

			//         url : '/patient_service/hopeteameast/insert_sign_in.xsjs?command=insertuser&username='+firstname+'&useremail='+email+'&userpassword='+password+'&useraddress='+street+'&usernumber='+addressnum+'&usercity='+town+'&userzip='+zipcode+'&usercountry='+country,  // fichier xsjs
			//         type : 'GET',
			//         // dataType : 'json',   // pas nécessaire mais au cas où..
			//         async: false,
			//         success : function(data){
			//         	console.log("ajax call working");
			//         	console.log(data);
			//         },
			//   error: function(xhr, status, errorThrown) {
			//           console.log(xhr);
			//           console.log(status);
			//           console.log(errorThrown);
			//         }
			// });

		}

	});

});