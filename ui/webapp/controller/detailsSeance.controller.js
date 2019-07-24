sap.ui.define([
	"com/todo/demo/ui/controller/BaseController",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function(BaseController, MessageToast, JSONModel) {
	"use strict";
//	var that = this;

	return BaseController.extend("htetest.controller.Modif", {
		onInit: function() {
		},
		goPageInscription : function (evt) {
    		this.getRouter().navTo("inscriptionPage");
		},
			onAfterRendering: function () {
			//this.getView().setModel("/USER");

		//	var sServiceUrl = ("https://hdvuq9s9kgd0bdtb-todo-service.cfapps.eu10.hana.ondemand.com/odata/v4/todo/USER");

		//	var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);

		//	this.getView().setModel(oModel);

			this.getView().byId("smartForm").bindElement("/CONSIGNE('1')");
			this.getView().byId("smartForm2").bindElement("/CONSIGNE('2')");
			//this.getView().bindElement("/USER(1)");
		},
		goPageProgSeance : function (evt) {
    		this.getRouter().navTo("userProgPage");
		},
		onSelect : function (evt){
			var oSelectedItem = evt.getParameter("item");
			var tab = oSelectedItem.toString().split("--");
			this.getRouter().navTo(tab[tab.length-1]);
		}
	});
});