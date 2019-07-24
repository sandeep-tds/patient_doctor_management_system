sap.ui.define([
	"com/todo/demo/ui/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.todo.demo.ui.controller.Pro_Program_Seance", {

		goProProgramSeance1 : function (evt) {
    		this.getRouter().navTo("proProgSeance1Page");
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