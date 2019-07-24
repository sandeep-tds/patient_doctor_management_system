sap.ui.define([
	"com/todo/demo/ui/controller/BaseController",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function(BaseController, MessageToast, JSONModel) {
	"use strict";
//	var that = this;

	return BaseController.extend("com.todo.demo.ui.controller.StatPatient", {
		onInit: function() {
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
    		
		},
		goPageChart1 : function (evt) {
    		this.getRouter().navTo("chart1ProPage");
    		
		},
		goPageChart2 : function (evt) {
    		this.getRouter().navTo("chart2ProPage");
    		
		}
	});
});