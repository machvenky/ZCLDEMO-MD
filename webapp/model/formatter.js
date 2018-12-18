sap.ui.define([], function () {
	"use strict";
  return {

    /**
     * Formats a given string to uppercase.
     *
     * @function
     * @param {string} sName string to be formatted
     * @public
     */
    formatUpperCase: function(sCategory) {
       var upperCasecat = sCategory && sCategory.toUpperCase();
       return upperCasecat+"SAP";
    }
  };

});