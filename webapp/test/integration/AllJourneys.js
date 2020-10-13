/* global QUnit*/

sap.ui.define([
	"sap/ui/test/Opa5",
	"zgazets/zit/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"zgazets/zit/test/integration/pages/Main",
	"zgazets/zit/test/integration/navigationJourney"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "zgazets.zit.view.",
		autoWait: true
	});
});