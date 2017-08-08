/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'mbe/mbe',
    'ojs/ojbutton', 'ojs/ojinputtext'],
        function (oj, ko, $, app, mbe) {

            function DashboardViewModel() {
                var self = this;
                self.user_name = ko.observable();
                self.transaction_name = ko.observable();
                self.loan_amount = ko.observable();
                self.date_created = ko.observable();
                self.contract_expiration_date = ko.observable();
                self.last_payment_date = ko.observable();
                self.last_payment_amount = ko.observable();
                self.remaining_loan_amount = ko.observable();
                self.qr_url = ko.observable();
                self.notice = ko.observable();
                self.additionLoan = ko.observable();

                // Header Config
                self.headerConfig = {'viewName': 'header', 'viewModelFactory': app.getHeaderModel()};

                // Below are a subset of the ViewModel methods invoked by the ojModule binding
                // Please reference the ojModule jsDoc for additionaly available methods.


                function init() {
                    //app.isLoading(true);
                    var setValues = function(message){
                        self.user_name(message.user_name);
                        self.transaction_name(message.transaction_name);
                        self.user_name(message.user_name);
                        self.loan_amount(message.loan_amount);
                        self.date_created(message.date_created);
                        self.contract_expiration_date(message.contract_expiration_date);
                        self.last_payment_date(message.last_payment_date);
                        self.last_payment_amount(message.last_payment_amount);
                        self.remaining_loan_amount(message.remaining_loan_amount);
                        self.qr_url(message.qr_url);
                        self.notice(message.notice);
                    };
                    var successCallback = function (statusCode, message) {
                        console.log(message);
                        setValues(message);
                        app.isLoading(false);
                    };
                    var errorCallback = function (statusCode, message) {
                        console.error("Get loan history fail!" + message);
                        alert("Fail to get result from MCS, using dummy data instead!");
                        $.getJSON("js/data/loanRes.json",
                                function (data)
                                {
                                    //    console.log(data);
                                    setValues(data);
                                    app.isLoading(false);
                                });
                    };
                    mbe.invokeCustomAPI("ForEsysAPIs/loan", "GET", null, successCallback, errorCallback);
                }
                /**
                 * Optional ViewModel method invoked when this ViewModel is about to be
                 * used for the View transition.  The application can put data fetch logic
                 * here that can return a Promise which will delay the handleAttached function
                 * call below until the Promise is resolved.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
                 * the promise is resolved
                 */
                self.handleActivated = function (info) {
                    // Implement if needed
                };

                /**
                 * Optional ViewModel method invoked after the View is inserted into the
                 * document DOM.  The application can put logic that requires the DOM being
                 * attached here.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
                 */
                self.handleAttached = function (info) {
                    // Implement if needed
                    init();
                };


                /**
                 * Optional ViewModel method invoked after the bindings are applied on this View. 
                 * If the current View is retrieved from cache, the bindings will not be re-applied
                 * and this callback will not be invoked.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 */
                self.handleBindingsApplied = function (info) {
                    // Implement if needed
                };

                /*
                 * Optional ViewModel method invoked after the View is removed from the
                 * document DOM.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
                 */
                self.handleDetached = function (info) {
                    // Implement if needed
                };
            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new DashboardViewModel();
        }
);
