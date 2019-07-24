sap.ui.define([
	"sap/ui/test/Opa5"
], function(Opa5) {
	"use strict";

	function getFrameUrl (sHash, sUrlParameters) {
		var sUrl = jQuery.sap.getResourcePath("com/todo/demo/ui/app", ".html");
		sUrlParameters = sUrlParameters ? "?" + sUrlParameters : "";

		if (sHash) {
			sHash = "#" + (sHash.indexOf("/") === 0 ? sHash.substring(1) : sHash);
		} else {
			sHash = "";
		}

	return sUrl + sUrlParameters + sHash;
}

	return Opa5.extend("com.todo.demo.ui.test.integration.pages.Common", {

		iStartMyApp : function (oOptions) {
			var sUrlParameters;
			oOptions = oOptions || {};

			// Start the app with a minimal delay to make tests run fast but still async to discover basic timing issues
			var iDelay = oOptions.delay || 50;

			sUrlParameters = "serverDelay=" + iDelay;

			this.iStartMyAppInAFrame(getFrameUrl(oOptions.hash, sUrlParameters));
		}
	});
});
