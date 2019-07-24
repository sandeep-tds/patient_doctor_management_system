sap.ui.define([
	"com/todo/demo/ui/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController,JSONModel) {
	"use strict";

	return BaseController.extend("com.todo.demo.ui.controller.Pro_Program_Seance_1", {
	
		onInit: function () {

			// set explored app's demo model on this sample
			var oModel = new JSONModel("./mockdata/data.json");
			this.getView().setModel(oModel);

			oModel.attachRequestCompleted(function() {
				var oData = oModel.getData();
				oData.ProductCollection.length = 10;
				oModel.setData(oData);
			});

			// add buttons with javaScript (yet not possible with XML views)
		},
	
		goproProgSeance2 : function (evt) {
    		this.getRouter().navTo("proProgSeance2Page");
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