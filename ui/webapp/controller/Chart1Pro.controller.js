sap.ui.define([
	"com/todo/demo/ui/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController,JSONModel) {
	"use strict";

	return BaseController.extend("com.todo.demo.ui.controller.Chart1Pro", {
	
	onInit : function () {
			// set explored app's demo model on this sample
			var oModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.demo.mock", "/products.json"));
			this.getView().setModel(oModel);
	},
	returnStat : function (evt) {
    	this.getRouter().navTo("statPatientPage");
	}
	});

});