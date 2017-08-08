/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your about ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'mbe/mbe', 'data/appVariables',
    'ojs/ojbutton', 'ojs/ojinputtext'],
        function (oj, ko, $, app, mbe, appVar) {

            function LoginViewModel() {
                var self = this;
                self.isLoggedIn = ko.observable(false);
                self.username = ko.observable("mile2017");
                self.password = ko.observable("A%xo&CYG%4j");
                // Header Config
                self.headerConfig = {'viewName': 'header', 'viewModelFactory': app.getHeaderModel()};

                // Below are a subset of the ViewModel methods invoked by the ojModule binding
                // Please reference the ojModule jsDoc for additionaly available methods.
                self.loginSuccess = function (response, data) {
                    app.isLoading(false);
                    console.log(response);
                    alert("Login Successfully!");
                    mbe.isLoggedIn = true;
                    self.isLoggedIn(mbe.isLoggedIn);
                    appVar.mcsLoginUser = self.username();
                    appVar.mcsLoginPassword = self.password();
                    oj.Router.rootInstance.go('home');
                };

                self.loginFailure = function (statusCode, data) {
                    app.isLoading(false);
                    mbe.isLoggedIn = false;
                    self.isLoggedIn(mbe.isLoggedIn);
                    alert("Login failed! statusCode:" + statusCode + " Message: " + JSON.stringify(data));
                };

                app.logout = function () {
                    if (confirm("是否確定登出？"))
                    {
                        //    mbe.logout();
                        mbe.isLoggedIn = false;
                        self.isLoggedIn(false);
                        appVar.mcsLoginUser = "employee";
                        appVar.mcsLoginPassword = "";
                        appVar.userRole = "employee";
                        oj.Router.rootInstance.go('login').then(function () {
                            window.location.reload(true);
                        });
                    }
                };

                self.login = function (data, event) {
                    app.isLoading(true);
                    setTimeout(function () {
                        mbe.authenticate(self.username(), self.password()).then(self.loginSuccess, self.loginFailure);
                    }, 200);
                    //    self.loginSuccess();
                    return true;
                };
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
                    if (self.isLoggedIn()) {
                        alert();
                        self.logout();
                    }
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
            return new LoginViewModel();
        }
);
