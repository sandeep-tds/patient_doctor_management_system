sap.ui.define([
		"com/todo/demo/ui/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("com.todo.demo.ui.controller.App", {

			onInit : function () {
				// apply content density mode to root view
				this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			}
		});

	}
);