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
var empCompCode= '';
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
var empId = '';
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/m/MessageBox',
	'sap/ui/model/Filter',
	'sap/ui/core/Fragment'
], function (Controller,MessageBox,Filter,Fragment) {
	"use strict";

	return Controller.extend("zgazets.zit.controller.update", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf zgazets.zit.view.update
		 */
		onInit: function () {

		},

		onDatePickerChange: function (oEvent) {
			// Format date to remove UTC issue
			var oDatePicker = oEvent.getSource();
			var oBinding = oDatePicker.getBinding("dateValue");
			var oNewDate = oDatePicker.getDateValue();
			if (oNewDate) {
				var sPath = oBinding.getContext().getPath() + "/" + oBinding.getPath();
				var oFormatDate = sap.ui.core.format.DateFormat.getDateTimeInstance({
					pattern: "yyyy-MM-ddTKK:mm:ss"
				});
				oBinding.getModel().setProperty(sPath, new Date(oFormatDate.format(oNewDate)));
			}
		},

		onItemPress: function (oItem) {
			debugger;

		},
		date: function (ovalue) {
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "yyyy-MM-dd"
			});
			return oDateFormat.format(ovalue);
		},
		handleChangeLocal : function(oEvent){
			toDate = this.getView().byId("idDate").getValue();
			this.getView().byId('idDate').setValueState(sap.ui.core.ValueState.none);
			
		},
		
		handleValueHelp : function (oEvent) {
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
		
		handleValueHelpTo : function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogTo) {
				this._valueHelpDialogTo = sap.ui.xmlfragment(
					"zgazets.zit.fragments.DialogTo",
					this
				);
				this.getView().addDependent(this._valueHelpDialogTo);
			}

			// create a filter for the binding
			this._valueHelpDialogTo.getBinding("items").filter([new Filter(
				"empId",
				sap.ui.model.FilterOperator.EQ, sInputValue
			)]); 

			// open value help dialog filtered by the input value
			this._valueHelpDialogTo.open(sInputValue);
		},
		
		_handleValueHelpSearch : function (evt) {
			debugger;
			var sValue = evt.getParameter("value");
			var oFilter = new Filter(
				"empId",
				sap.ui.model.FilterOperator.EQ, sValue 
			);
			evt.getSource().getBinding("items").filter([oFilter]);
		},
		
			_handleValueHelpSearchTo : function (evt) {
			debugger;
			var sValue = evt.getParameter("value");
			var oFilter = new Filter(
				"empId",
				sap.ui.model.FilterOperator.EQ, sValue 
			);
			evt.getSource().getBinding("items").filter([oFilter]);
		},
		
		_handleValueHelpClose : function (evt) {
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
		
		_handleValueHelpCloseTo : function (evt) {
			debugger;
			this.name = "";
			var that = this;
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputId);
				productInput.setValue(oSelectedItem.getTitle());
				that.name = oSelectedItem.getDescription();
			}
			evt.getSource().getBinding("items").filter([]);
		},
		
		onSave: function (oSave) {
			debugger;
			var oTable = this.getView().byId("idAssetTable");
			var table = this.getView().byId("idAssetTable").getSelectedItems();
			//var length = table.length;
			var i;
			var assetId;
			var fromempid;
			var toempid;
			
			var that = this;

			var oModel = that.getOwnerComponent().getModel();
		   var idx;
			//looping will start here
			for (i = 0; i < table.length; i++) {
				idx = i;
				if ( table[i].oBindingContexts.undefined.oModel.oData.results[i].futureId === "") {
				assetId = table[i].oBindingContexts.undefined.oModel.oData.results[i].assetId; //get asset id
				fromempid =  that.getView().byId("idEmpid").getValue();
				toempid = table[i].mAggregations.cells[4].mProperties.value; //get asset id
				toDate = table[i].mAggregations.cells[5].mProperties.value; //table[i].oBindingContexts.undefined.oModel.oData.results[i].transferdate;
				var newDate = new Date(toDate);
				// update to the SAP table ////

				var assetEntry = {
					fromEmpId: fromempid,
					toEmpId: toempid,
					assetId: assetId,
					date: newDate
				};
				
				oModel.create("/assetUpdateSet",
							assetEntry ,  {

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
												//	location.reload();
												}
											}

										);
										flag = "X";
									//	location.reload();
									} else {
										debugger;
								//	oTable.removeItem(idx);
								that.onSubmit();
								//	oTable.refreshItems();
								//oTable.splice(idx,1);
							//	oTable.refresh();
											msg = data.message;
											sap.m.MessageBox.success(
											msg, {
												//			styleClass: bCompact ? "sapUiSizeCompact" : ""
												onClose: function (oAction) {
													//	window.print();
													//location.reload();
													that.onSubmit();
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

				// update to SAP end //

			} //loop ends here
			 else {
				sap.m.MessageBox.success(
											"Asset already assigned. Further assignment not possible", {
												//			styleClass: bCompact ? "sapUiSizeCompact" : ""
												onClose: function (oAction) {
													//	window.print();
													//location.reload();
													that.onSubmit();
												}
											}

										);
			}
		}
		},

		onSubmit: function (oEvent) {
			debugger;

			//empId = oEvent.getSource().getValue();
			empId = this.getView().byId("idEmpid").getValue();
		//	this.getView().byId("idAssetTable").destroy(true);
			this.getView().byId('idEmpid').setValueState(sap.ui.core.ValueState.none);
			this.getOwnerComponent().getModel().refresh();
			this.getView().byId("idEmpName").setText(this.name);
			this.getView().byId("toempId").setValue("");
			//that.getView().byId("idEmpName").setText(oModel6.oData.results[0].empName);
		//	this.getView().byId("idAssetTable").unbindItems(); 
			var that = this;
			var oModel = that.getOwnerComponent().getModel();
			//var sPath = "/assetRecordsSet('" + empId + "')";
			
			
			debugger;
			var sPath2 = "/assetRecordsSet"; //?$filter=EMPLOYEEID eq '" + Pernr + "'";
			var filter = [];
			//var Pernr = id;
			empId = "'" + empId + "'";
			var myFilter = new sap.ui.model.Filter("empId", sap.ui.model.FilterOperator.EQ, (empId));
			filter.push(myFilter);
			that = this ;
			oModel.read(sPath2, {
				filters: filter,

				success: function (oData, response) {
					debugger;
					var oModel6 = new sap.ui.model.json.JSONModel(oData);
					var osf3 = that.getView().byId("idAssetTable");
					osf3.setModel(oModel6);
				    that.getView().byId("idEmpName").setText(oModel6.oData.results[0].empName);
				//	oModel6.refresh();
				},
				error: function (oError) {
					debugger;
					that.getView().byId("idAssetTable").destroyItems();
					msg = 'No data retreived';
					sap.m.MessageBox.error(
											msg, {
												//			styleClass: bCompact ? "sapUiSizeCompact" : ""
												onClose: function (oAction) {
													//	window.print();
												//	location.reload();
												
												}
											}

										);

				}

			});

		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf zgazets.zit.view.update
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf zgazets.zit.view.update
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf zgazets.zit.view.update
		 */
		//	onExit: function() {
		//
		//	}

	});

});