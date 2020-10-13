var contractType = '';
var submitted = '';
var factor = '';
var type = '';
var empId = '';
var currentBalance = '';
var startDate = '';
var endDate = '';
var today;
var msg = '';
var futureBalance = '';
var value = '';
// var LeaveEntry = '';
var flag = '';
var empCompCode = '';
var todayDate = '';
var Requestor = '';
var fromDate = '';
var toDate = '';
var flag1 = '';
var flag2 = '';
var flag3 = '';
var flag4 = '';
var flag5 = '';
var flag6 = '';
var flag7 = '';
var flag8 = '';
var flagAd = '';
var flag_c = '';
var totalDays = '';
var city1 = '';
var city2 = '';
var exitDays = '';
var mobileNum = '';
var that1 = '';
var value1 = '';
var exitDaysStr = '';
var adYes = '';
var adNo = '';
var adYN = '';
var reqDate = '';
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/m/MessageBox',
	'sap/ui/model/Filter',
	'sap/ui/core/Fragment'
], function (Controller, MessageBox, Filter, Fragment) {
	"use strict";

	return Controller.extend("zgazets.zit.controller.new", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf zgazets.zit.view.new
		 */
		onInit: function () {

		},
		handleValueHelp: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialog) {
				this._valueHelpDialog = sap.ui.xmlfragment(
					"zgazets.zit.fragments.Dialog",
					this
				);
				this.getView().addDependent(this._valueHelpDialog);
			}

			// create a filter for the binding
			this._valueHelpDialog.getBinding("items").filter([new Filter(
				"empId",
				sap.ui.model.FilterOperator.EQ, sInputValue
			)]);

			// open value help dialog filtered by the input value
			this._valueHelpDialog.open(sInputValue);
		},
		_handleValueHelpSearch: function (evt) {
			debugger;
			var sValue = evt.getParameter("value");
			var oFilter = new Filter(
				"empId",
				sap.ui.model.FilterOperator.EQ, sValue
			);
			evt.getSource().getBinding("items").filter([oFilter]);
		},

		_handleValueHelpClose: function (evt) {
			debugger;
			this.name = "";
			var that = this;
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputId);
				productInput.setValue(oSelectedItem.getTitle());
				that.name = oSelectedItem.getDescription();
				that.onSubmit();
			}
			evt.getSource().getBinding("items").filter([]);
		},

		onSubmit: function (oEvent) {
			debugger;

			//	var Pernr = oEvent.getSource().getValue();
			var Pernr = this.getView().byId("idEmpid").getValue();
			var that = this;
			this.getView().byId('idEmpid').setValueState(sap.ui.core.ValueState.none);
			that.getView().byId("idCompany").setText(" ");
			that.getView().byId("idAsset").setValue(" ");
			//	that.getView().byId("idAsset").setvalue(" ");
			that.getView().byId("idDescription").setText("");
			that.getView().byId("idCompDescrAsset").setText("");
			that.getView().byId("idCompCodeAsset").setText("");

			var oModel = that.getOwnerComponent().getModel();
			var sPath = "/getEmpDetailsSet('" + Pernr + "')";

			oModel.read(sPath, {
				success: function (oData, response) {
					var oModel3 = new sap.ui.model.json.JSONModel(oData);
					var osf = that.getView().byId("idNew");
					osf.setModel(oModel3);
					empCompCode = oModel3.compCode;

				},
				error: function () {

					sap.m.MessageToast.show("No Data retreived");
				}

			});

		},

		onSubmitAsset: function (oEvent) {
			debugger;
			this.error = "";
			//var asset = oEvent.getSource().getValue();
			var asset = this.getView().byId("idAsset").getValue();
			var that = this;
			this.getView().byId('idAsset').setValueState(sap.ui.core.ValueState.none);

			var oModel = that.getOwnerComponent().getModel();
			var sPath = "/assetDataSet('" + asset + "')";

			//filters
			var filter1 = new sap.ui.model.Filter({
				path: "asset",
				operator: sap.ui.model.FilterOperator.EQ,
				value1: asset  
			});
			var filter2 = new sap.ui.model.Filter({
				path: "compCode",
				operator: sap.ui.model.FilterOperator.EQ,
				value1: this.getView().byId('idCompCode').getText()
			});

			this.getView().getModel().read("/assetDataSet", {
				filters: [filter1, filter2],
				success: function (oData, response) {
					//var oModel3 = new sap.ui.model.json.JSONModel(oData);
					if (oData.results[0].error === "X") {
						that.error = "X";
						that.getView().byId('idAsset').setValueState(sap.ui.core.ValueState.Error);
						msg = oData.results[0].message;
						MessageBox.error(msg, {
							actions: [sap.m.MessageBox.Action.CLOSE],
							//styleClass: bCompact ? "sapUiSizeCompact" : "",
							onClose: function (sAction) {
								//	location.reload();

							}
						});
					} else {

						empCompCode = that.getView().byId("idCompCode").getText();
						if (empCompCode !== oData.results[0].compCode) {
							that.error = "X";
							that.getView().byId('idAsset').setValueState(sap.ui.core.ValueState.Error);
							msg = 'Employee and Asset doesnt belong to same Company';

							MessageBox.error(msg, {
								actions: [sap.m.MessageBox.Action.CLOSE],
								//styleClass: bCompact ? "sapUiSizeCompact" : "",
								onClose: function (sAction) {
									//location.reload();

								}
							});
						} else {
							that.error = "";
							that.getView().byId("idCompany").setText(oData.results[0].compCode);
							that.getView().byId("idDescription").setText(oData.results[0].description);
							that.getView().byId("idCompDescrAsset").setText(oData.results[0].compDescr);
							that.getView().byId("idCompCodeAsset").setText(oData.results[0].compCode);
						}
					}
				},

				error: function () {

					sap.m.MessageToast.show("No Data retreived");
				}

			});

			/*oModel.read(sPath, {
				success: function (oData, response) {
					//var oModel3 = new sap.ui.model.json.JSONModel(oData);
					if (oData.error === "X") {
						that.error = "X";
						that.getView().byId('idAsset').setValueState(sap.ui.core.ValueState.Error);
						msg = oData.message;
						MessageBox.error(msg, {
							actions: [sap.m.MessageBox.Action.CLOSE],
							//styleClass: bCompact ? "sapUiSizeCompact" : "",
							onClose: function (sAction) {
								//	location.reload();

							}
						});
					} else {

						empCompCode = that.getView().byId("idCompCode").getText();
						if (empCompCode !== oData.compCode) {
							that.error = "X";
							that.getView().byId('idAsset').setValueState(sap.ui.core.ValueState.Error);
							msg = 'Employee and Asset doesnt belong to same Company';

							MessageBox.error(msg, {
								actions: [sap.m.MessageBox.Action.CLOSE],
								//styleClass: bCompact ? "sapUiSizeCompact" : "",
								onClose: function (sAction) {
									//location.reload();

								}
							});
						} else {
							that.error = "";
							that.getView().byId("idCompany").setText(oData.compCode);
							that.getView().byId("idDescription").setText(oData.description);
							that.getView().byId("idCompDescrAsset").setText(oData.compDescr);
							that.getView().byId("idCompCodeAsset").setText(oData.compCode);
						}
					}
				},

				error: function () {

					sap.m.MessageToast.show("No Data retreived");
				}

			});*/

		},
		onChangeLocal: function (oEvent) {
			type = oEvent.getSource().getSelectedKey();
			this.getView().byId('CB').setValueState(sap.ui.core.ValueState.none);
		},
		handleChangeLocal: function (oEvent) {
			toDate = this.getView().byId("idDate").getValue();
			this.getView().byId('idDate').setValueState(sap.ui.core.ValueState.none);

		},

		date: function (value) {
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "yyyy-MM-dd"
			});
			return oDateFormat.format(value);
		},

		onSave: function (oEvent) {
			if (this.error !== "X") {
				debugger;
				var empid = this.getView().byId('idEmpid').getValue();
				var asset = this.getView().byId('idAsset').getValue();
				var newDate = new Date(toDate);

				if (empid !== "" & asset !== "" & newDate !== "") {

					var that = this;

					var oModel = that.getOwnerComponent().getModel();

					var LeaveEntry = {
						empId: empid,
						asset: asset,
						type: type,
						date: newDate

					};

					oModel.create("/assetPostSet",
						LeaveEntry, {

							success: function (data) {
								debugger;
								flag = "";
								if (data.error === 'X') {
									//sap.m.MessageToast.show("Duplicate Request being submitted.");
									msg = data.message;
									sap.m.MessageBox.error(
										msg, {
											//			styleClass: bCompact ? "sapUiSizeCompact" : ""
											onClose: function (oAction) {
												//	window.print();
												location.reload();
											}
										}

									);
									flag = "X";
									//	location.reload();
								} else {

									msg = data.message;
									sap.m.MessageBox.success(
										msg, {
											//			styleClass: bCompact ? "sapUiSizeCompact" : ""
											onClose: function (oAction) {
												//	window.print();
												location.reload();
											}
										}

									);
									flag = "X";
									//	location.reload();

								}

							},
							error: function (oError) {
								debugger;
								sap.m.MessageToast.show("Error while submitting request. Please Try again.", {
									duration: 9000, // default
									width: "30em", // default
									my: "CenterCenter", // default
									at: "CenterCenter", // default
									of: window, // default
									offset: "0 0", // default
									collision: "fit fit", // default
									onClose: null, // default
									autoClose: true, // default
									animationTimingFunction: "ease", // default
									animationDuration: 1000, // default
									closeOnBrowserNavigation: true // default
								});
							}

						});

				}

				/**
				 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
				 * (NOT before the first rendering! onInit() is used for that one!).
				 * @memberOf zgazets.zit.view.new
				 */
				//	onBeforeRendering: function() {
				//
				//	},

				/**
				 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
				 * This hook is the same one that SAPUI5 controls get after being rendered.
				 * @memberOf zgazets.zit.view.new
				 */
				//	onAfterRendering: function() {
				//
				//	},

				/**
				 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
				 * @memberOf zgazets.zit.view.new
				 */
				//	onExit: function() {
				//
				//	}
				else {
					if (empid === "") {
						this.getView().byId('idEmpid').setValueState(sap.ui.core.ValueState.Error);
					} else {
						this.getView().byId('idEmpid').setValueState(sap.ui.core.ValueState.none);
					}
					if (asset === "") {
						this.getView().byId('idAsset').setValueState(sap.ui.core.ValueState.Error);
					} else {
						this.getView().byId('idAsset').setValueState(sap.ui.core.ValueState.none);
					}

					if (type === "") {
						this.getView().byId('CB').setValueState(sap.ui.core.ValueState.Error);
					} else {
						this.getView().byId('CB').setValueState(sap.ui.core.ValueState.none);
					}

					if (toDate === "") {
						this.getView().byId('idDate').setValueState(sap.ui.core.ValueState.Error);
					} else {
						this.getView().byId('idDate').setValueState(sap.ui.core.ValueState.none);
					}
					sap.m.MessageBox.alert(
						"Please enter mandatory details", {
							//			styleClass: bCompact ? "sapUiSizeCompact" : ""
							onClose: function (oAction) {
								//	window.print();

							}
						}

					);
				}

			} else {
				sap.m.MessageBox.error(
					"Please check the asset code and other mandatory details", {
						//			styleClass: bCompact ? "sapUiSizeCompact" : ""
						onClose: function (oAction) {
							//	window.print();

						}
					}

				);
			}
		}
	});

});