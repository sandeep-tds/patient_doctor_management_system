sap.ui.define([
	"com/todo/demo/ui/controller/BaseController"
], function (BaseController) {
	"use strict";
	
	
	return BaseController.extend("com.todo.demo.ui.controller.PagePro", {
		
		goPagePatient : function (evt) {
    		this.getRouter().navTo("PatientPage");
		},
		
		goPageModifPro : function (evt) {
    		this.getRouter().navTo("modifProPage");
		}
	});

});