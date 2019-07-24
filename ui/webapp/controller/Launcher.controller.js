sap.ui.define([
	"com/todo/demo/ui/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/format/DateFormat",
	"com/todo/demo/ui/model/formatter",
	"sap/m/MessageToast"
], function(BaseController, JSONModel, Filter, FilterOperator, DateFormat, Formatter, MessageToast) {
	"use strict";
//	var that = this;

	return BaseController.extend("com.todo.demo.ui.controller.Launcher", {
		Formatter: Formatter,
		onInit: function() {
			// set mock model
			/*var oJSONModel = this.initSampleDataModel();
			this.getView().setModel(oJSONModel);*/
		},
		goPageInscription : function (evt) {
		    //var router = sap.ui.core.UIComponent.getRouterFor(that);
    		//router.navTo("Inscription");
    		this.getRouter().navTo("inscriptionPage");
    		MessageToast.show("OK");
    
		},
		goPageFeedback : function (evt) {
		    //var router = sap.ui.core.UIComponent.getRouterFor(that);
    		//router.navTo("Inscription");
    		this.getRouter().navTo("feedback2Page");
    		MessageToast.show("OK");
    
		},
		goPagePro : function (evt) {
		    //var router = sap.ui.core.UIComponent.getRouterFor(that);
    		//router.navTo("Inscription");
    		this.getRouter().navTo("ProPage");
    		MessageToast.show("OK");
    
		},
		goPatient : function (evt) {
		    //var router = sap.ui.core.UIComponent.getRouterFor(that);
    		//router.navTo("Inscription");
    		this.getRouter().navTo("PatientPage");
    		MessageToast.show("OK");
    
		},
		goModif : function (evt) {
		    //var router = sap.ui.core.UIComponent.getRouterFor(that);
    		//router.navTo("Inscription");
    		this.getRouter().navTo("modifPage");
    		MessageToast.show("OK");
    
		},
		/*initSampleDataModel: function() {
			var oModel = new JSONModel();
			jQuery.ajax(sap.ui.require.toUrl("htetest/mockdata") + "/data.json", {
				dataType: "json",
				success: function(oData) {
					oModel.setData(oData);
				},
				error: function() {
					jQuery.sap.log.error("failed to load json");
				}
			});
			return oModel;
		}*/
	});
});