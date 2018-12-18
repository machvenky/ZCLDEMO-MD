sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/venkyZDB/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, formatter, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("com.venkyZDB.controller.Home", {
		myformatter: formatter,
		onItemSelected: function (oEvent) {
			var oSelectedItem = oEvent.getSource();
			var oContext = oSelectedItem.getBindingContext();
			var sPath = oContext.getPath();
			var oProductDetailPanel = this.byId("productDetailsPanel");

			oProductDetailPanel.bindElement({
				path: sPath
			});
			this.byId("productDetailsPanel").setVisible(true);
		},
		onFilterProductsTable: function (oEvent) {
			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");

			if (sQuery) {
				var oFilterID = new Filter("ProductID", sap.ui.model.FilterOperator.Contains, sQuery);
				var oFilterCategory = new Filter("Category", sap.ui.model.FilterOperator.Contains, sQuery);

				aFilter.push(new Filter({
					filters: [oFilterID, oFilterCategory],
					And: false
				}));
			}
			this.getView().byId("productsTable").getBinding("items").filter(aFilter, "Application");

		},
		onFilterProductsList: function (oEvent) {
			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery.length > 0) {
				var oFilterID = new Filter("ProductID", sap.ui.model.FilterOperator.Contains, sQuery);
				var oFilterCategory = new Filter("Category", sap.ui.model.FilterOperator.Contains, sQuery);
				var oFilterTypeCode = new Filter("TypeCode", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilter.push(new Filter({
					filters: [oFilterID, oFilterCategory, oFilterTypeCode],
					And: false
				}));
			}
			this.getView().byId("productsList").getBinding("items").filter(aFilter, "Application");

		},

		onTabChangeEvent: function (oEvent) {

			if (oEvent.getSource().getSelectedKey() === "Tab2") {
			
				if(!this.frag){
					
				this.frag = sap.ui.xmlfragment(this.getView().getId(),"com.venkyZDB.view.second", this);
			//	var myFragment= sap.ui.xmlfragment(this.getView().getId(), "com.venkyZDB.view.second", this);
				this.getView().addDependent(this.frag);
				this.getView().byId("tab2id").insertContent(this.frag);	
				}
			
			/*	var sServiceURL = this.getOwnerComponent().getMetadata().getManifestEntry("sap.app").dataSources["ES5"]["uri"];
				// instantiate the model
				var oDataModel = new sap.ui.model.odata.v2.ODataModel(sServiceURL);
				var oTable = sap.ui.getCore().byId("venkyFrag--idProductsTable");
			//	var oTable = sap.ui.core.Fragment.byId("venkyFrag", "idProductsTable") ;
			//	var oTable = this.getView().byId("idProductsTable");
				var oModel = new sap.ui.model.json.JSONModel();
				oDataModel.read("/ProductSet", {
					success: function (oData, response) {
						oModel.setData(oData.results);
						oTable.setModel(oModel,"myModel");
				//	sap.ui.getCore().byId("idProductsTable").setModel(oModel, "myModel");
					}
				});*/

			}

		},
		handleValueHelp : function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialog) {
				this._valueHelpDialog = sap.ui.xmlfragment(
					"com.venkyZDB.view.Dialog",
					this
				);
				this.getView().addDependent(this._valueHelpDialog);
			}
		
			// create a filter for the binding
			if(sInputValue){
					this._valueHelpDialog.getBinding("items").filter([new Filter(
				"Name",
				sap.ui.model.FilterOperator.Contains, sInputValue
			)]);
			
			// open value help dialog filtered by the input value
			this._valueHelpDialog.open(sInputValue);
			}else {
					this._valueHelpDialog.open();
			}
	

		},
		_handleValueHelpSearch : function (evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter(
				"Name",
				sap.ui.model.FilterOperator.Contains, sValue
			);
			evt.getSource().getBinding("items").filter([oFilter]);
		},

		_handleValueHelpClose : function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputId);
				productInput.setValue(oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);
		}

	});
});