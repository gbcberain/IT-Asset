function initModel() {
	var sUrl = "/sap/opu/odata/sap/ZIT_ASSET_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}