sap.ui.define([
	"com/todo/demo/ui/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController,JSONModel) {
	"use strict";

	return BaseController.extend("com.todo.demo.ui.controller.ModifPro", {
	
	onInit : function () {
			// set explored app's demo model on this sample
			var oModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.demo.mock", "/products.json"));
			this.getView().setModel(oModel);
	},
	
	goProProgramSeance : function (evt) {
    	this.getRouter().navTo("proProgSeancePage");
	},
		
	goPageCalendar: function (evt) {
    	this.getRouter().navTo("PatientPage");
	},
		
	goPageInfPat: function (evt) {
    	this.getRouter().navTo("infoPatientPage");
	},
		
	goPageStat: function (evt) {
    	this.getRouter().navTo("statPatientPage");
	},
		
	goPageParam: function (evt) {
    	this.getRouter().navTo("modifProPage");
	},
		
	goPageConnec : function (evt) {
    	this.getRouter().navTo("appHome");
	}
	});

});