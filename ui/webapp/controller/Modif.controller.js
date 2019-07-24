sap.ui.define([
	"com/todo/demo/ui/controller/BaseController",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function (BaseController, MessageToast, JSONModel) {
	"use strict";
	//	var that = this;

	return BaseController.extend("com.todo.demo.ui.controller.Modif", {
		onInit: function () {
			// var oModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.demo.mock", "/products.json"));
			// this.getView().setModel(oModel);
			//this.getView().byId("smartFormPage").bindElement("/USER(1)");
		},
		onAfterRendering: function () {
			//this.getView().setModel("/USER");

		//	var sServiceUrl = ("https://hdvuq9s9kgd0bdtb-todo-service.cfapps.eu10.hana.ondemand.com/odata/v4/todo/USER");

		//	var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);

		//	this.getView().setModel(oModel);

			this.getView().byId("smartFormPage").bindElement("/USER(1)");
			//this.getView().bindElement("/USER(1)");
		},
		goPageInscription: function (evt) {
			this.getRouter().navTo("inscriptionPage");
		},
		onSelect: function (evt) {
			var oSelectedItem = evt.getParameter("item");
			var tab = oSelectedItem.toString().split("--");
			this.getRouter().navTo(tab[tab.length - 1]);
		}
	});
});