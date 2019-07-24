sap.ui.define([
	"sap/ui/test/Opa5",
	"com/todo/demo/ui/test/integration/arrangements/Arrangement",
	"com/todo/demo/ui/test/integration/NavigationJourney",
	"sap/ui/test/opaQunit"
], function (Opa5, Arrangement) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Arrangement(),
		viewNamespace: "com.todo.demo.ui.view."
	});

});
