sap.ui.define([
    "sap/ui/base/ManagedObject",
    "sap/ui/core/Fragment"
], function (ManagedObject, Fragment) {
    "use strict";

    return ManagedObject.extend("sap.ui.walkthrough.controller.HelloDialog", {
        constructor: function (oView) {
            this._oView = oView; // Use consistent naming for private variables
        },

        exit: function () {
            delete this._oView;
        },

        open: function () {
            var oView = this._oView; // Access the view from the private variable

            // Create the dialog lazily
            if (!oView.byId("helloDialog")) {
                var oFragmentController = {
                    onCloseDialog: function () {
                        oView.byId("helloDialog").close(); // Close the dialog when button pressed
                    }
                };

                // Load the XML fragment asynchronously
                Fragment.load({
                    id: oView.getId(),
                    name: "sap.ui.demo.walkthrough.view.HelloDialog",
                    controller: oFragmentController
                }).then(function (oDialog) {
                    // Connect dialog to the root view of this component (models, lifecycle)
                    oView.addDependent(oDialog);
                    oDialog.open(); // Open the dialog after it's created
                });

            } else {
                oView.byId("helloDialog").open(); // Open the dialog if it already exists
            }
        }
    });
});
