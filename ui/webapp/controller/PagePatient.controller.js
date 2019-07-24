sap.ui.define([
		'jquery.sap.global',
		'com/todo/demo/ui/controller/BaseController',
		'sap/ui/model/json/JSONModel',
		"sap/m/MessageToast"
	], function(jQuery, Controller, JSONModel, Msg) {
	"use strict";

	var ResponsiveSplitterController = Controller.extend("sap.ui.layout.sample.ResponsiveSplitter.C", {

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
    		
		},
		
	changeToOneWeek: function () {
        var oCalendar = this.getView().byId("durationCalendar");
        oCalendar.setMonthsPerRow(1);
        oCalendar.setWeeksPerRow(1);
        oCalendar.setSingleRow(true);
    },

    changeToTwoWeeks: function () {
        var oCalendar = this.getView().byId("durationCalendar");
        oCalendar.setMonthsPerRow(1);
        oCalendar.setWeeksPerRow(2);
        oCalendar.setSingleRow(true);
    },

    changeToOneMonth: function () {
        var oCalendar = this.getView().byId("durationCalendar");
        oCalendar.setSingleRow(false);
        oCalendar.setMonthsToDisplay(1);
        oCalendar.setWeeksPerRow(1);
        oCalendar.setMonthsPerRow(1);
    },

    changeToTwoMonths: function () {
        var oCalendar = this.getView().byId("durationCalendar");
        oCalendar.setSingleRow(false);
        oCalendar.setMonthsToDisplay(2);
        oCalendar.setWeeksPerRow(1);
        oCalendar.setMonthsPerRow(2);
    }

	});

	return ResponsiveSplitterController;

});

// sap.ui.define([
// 	"htetest/controller/BaseController"
// ], function (BaseController) {
// 	"use strict";

// 	return BaseController.extend("htetest.controller.PagePatient", {
		
// 		goProProgramSeance : function (evt) {
//     		this.getRouter().navTo("proProgSeancePage");
// 		}
// 	});

// });