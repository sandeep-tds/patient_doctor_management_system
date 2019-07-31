sap.ui.define([
	"com/todo/demo/ui/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.todo.demo.ui.controller.App", {

		onInit: function () {
			// apply content density mode to root view
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			this.getUserInfo();
		},

		getUserInfo: function () {
			var url = '/pdmsbackend/getUserInfo';
			var that = this;

			jQuery
				.ajax({
					url: url, // Get tenant specific products url
					type: "GET", // Request type - Get
					dataType: "json", // Return datatype
					headers: {
						'x-csrf-token': 'fetch' // Fetch CSRF token header
					},
					complete: function (xhr) {
						sap.ui.getCore().AppContext.token = xhr.getResponseHeader("x-csrf-token");
						that.testPutFunction();// Set the CSRF token to a global context
					},
					success: function (response) {
						// API call was successful
						console.log(response);
					},
					error: function (e) {
						// API call failed
						console.log(e.message);
					}
				});
		},

		testPutFunction: function () {
			var jsonObject = '{ "employees" : [' +
				'{ "firstName":"John" , "lastName":"Doe" },' +
				'{ "firstName":"Anna" , "lastName":"Smith" },' +
				'{ "firstName":"Peter" , "lastName":"Jones" } ]}';
			var url = '/pdmsbackend/dbtask/testPut';

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

}
);