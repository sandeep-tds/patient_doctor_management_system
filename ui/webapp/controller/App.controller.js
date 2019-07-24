sap.ui.define([
		"com/todo/demo/ui/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("com.todo.demo.ui.controller.App", {

			onInit : function () {
				// apply content density mode to root view
				this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());

			var url = '/pdmsbackend/getUserInfo';

			jQuery
				.ajax({
					url: url, // Get tenant specific products url
					type: "GET", // Request type - Get
					dataType: "json", // Return datatype
					headers: {
						'x-csrf-token': 'fetch' // Fetch CSRF token header
					},
					complete: function (xhr) {
						sap.ui.getCore().AppContext.token = xhr.getResponseHeader("x-csrf-token"); // Set the CSRF token to a global context
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
			}
		});

	}
);