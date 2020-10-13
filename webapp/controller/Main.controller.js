sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("zgazets.zit.controller.Main", {
		onInit: function () {
		this.oRouter = this.getOwnerComponent().getRouter();
		},
		onUpdate : function (oEvent){
			debugger;	
			this.oRouter.navTo("new");
		},
		onTransfer : function (oEvent){
			debugger;	
			this.oRouter.navTo("update");
		},
		onReturn : function (oEvent){
			debugger;	
			this.oRouter.navTo("transfer");
		}
	});
});