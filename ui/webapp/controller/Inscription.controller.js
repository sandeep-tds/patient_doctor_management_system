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
			
			//selection practicien
			// var oData = {
			// 	"SelectedPracticien": "1",
			// 	"PracticienList": [
			// 		{
			// 			"PracticienId": "1",
			// 			"Name": "Julien"
			// 		},
			// 		{
			// 			"PracticienId": "2",
			// 			"Name": "Hevet Sandrine"
			// 		},
			// 		{
			// 			"PracticienId": "3",
			// 			"Name": "Christian Vault"
			// 		}
			// 	             ]
			// };
			
			var that = this;
			$.ajax({
			        
			        url : '/patient_service/hopeteameast/insert_sign_in.xsjs?command=getcoachName',
			        type : 'GET',
			        // dataType : 'json',   // pas nécessaire mais au cas où..
			        async: true,
			        success : function(data){
			        	console.log("ajax call working");
			        	console.log(data);
			        	var oData = data;
						var oModel = new JSONModel(oData);
						that.getView().setModel(oModel,"patient");
			        },
			  error: function(xhr, status, errorThrown) {
			           console.log(xhr);
			           console.log(status);
			           console.log(errorThrown);
			        }
			});
			
			
		},
		inscriptionOK: function (evt) {
			console.log("inside");
			
			//console.log(this.getView().byId("idFirstName").getValue());
			var firstname = this.getView().byId("idFirstName").getValue();
			var email = this.getView().byId("email").getValue();
			var password = this.getView().byId("password").getValue();
			var street = this.getView().byId("street").getValue();
			var addressnum = this.getView().byId("addressnum").getValue();
			var town = this.getView().byId("town").getValue();
			var zipcode = this.getView().byId("zipcode").getValue();
			var country = this.getView().byId("country").getValue();
			
			
			
			// var country = this.getView().byId("country");
			// var country = oList.getSelectedItems();
			// var country = this.getView().byId("country").getSelectedItem();
			console.log(firstname);
			console.log(email);
			console.log(password);
			console.log(street);
			console.log(addressnum);
			console.log(town);
			console.log(zipcode);
			console.log(country);
			// var that = this;
			// setInterval( function() { that.getInscriptionData(that); }, 300 ); 
			
			$.ajax({
			        // url : '/patient_service/HOPETEAMEAST_package/insert_sign_in.xsjs?command=insertuser&userid=50&username='+firstname+'&useremail='+email+'&userpassword='+password+'&useraddress='+street+'&usernumber='+addressnum+'&usercity='+town+'&userzip='+zipcode+'&usercountry='+country,  // fichier xsjs
			        url : '/patient_service/hopeteameast/insert_sign_in.xsjs?command=insertuser&username='+firstname+'&useremail='+email+'&userpassword='+password+'&useraddress='+street+'&usernumber='+addressnum+'&usercity='+town+'&userzip='+zipcode+'&usercountry='+country,  // fichier xsjs
			        type : 'GET',
			        // dataType : 'json',   // pas nécessaire mais au cas où..
			        async: false,
			        success : function(data){
			        	console.log("ajax call working");
			        	console.log(data);
			        },
			  error: function(xhr, status, errorThrown) {
			           console.log(xhr);
			           console.log(status);
			           console.log(errorThrown);
			        }
			});
			// var user = this.getView().getModel();
			// var oModel = new ODataModel({
			// 	groupId: "$direct",
			// 	synchronizationMode: "None",
			// 	serviceUrl: "/odata/v4/todo/"
			// });
			// oModel.submitBatch("userId").then(function(){
			// // var oParameters = {
			// // 	"userId" : this.getCore().getElementById('idFirstName')
			
				
			// // }
			// ;
			
			// // oModel.loadData("/odata/v4/todo/",oParameters,true,'POST');
				
			// 	console.log(oParameters.userId);
			// });
		}
			
	});

});