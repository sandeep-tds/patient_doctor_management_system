sap.ui.define([
	"com/todo/demo/ui/controller/BaseController",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function(BaseController, MessageToast, JSONModel) {
	"use strict";
//	var that = this;

	return BaseController.extend("com.todo.demo.ui.controller.Modif", {
		onInit: function() {
		
		},
		goPageInscription : function (evt) {
    		this.getRouter().navTo("inscriptionPage");
		},
		returnStat : function (evt) {
    		this.getRouter().navTo("userStatPage");
		},
		onSelect : function (evt){
			var oSelectedItem = evt.getParameter("item");
			var tab = oSelectedItem.toString().split("--");
			this.getRouter().navTo(tab[tab.length-1]);
		}
	});
});