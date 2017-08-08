/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'data/appVariables', 'ojs/ojrouter', 'ojs/ojarraytabledatasource', 'ojs/ojoffcanvas', 'ojs/ojbutton'],
        function (oj, ko, appVar) {
            function ControllerViewModel() {
                var self = this;
                self.isLoading = ko.observable(false);
                self.showOffCanv = ko.observable(true);
                self.showBack = ko.observable(false);
                // Router setup
                self.router = oj.Router.rootInstance;
                self.router.configure({
                    'login': {label: 'Login', isDefault: true},
                    'home': {label: 'Loan Transaction History'},
                    'incidents': {label: 'Incidents'},
                    'customers': {label: 'Customers'},
                    'profile': {label: 'Profile'}
                });
                oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();
                self.moduleConfig = self.router.moduleConfig;

                // Navigation setup
                self.navData = [
                    {name: '首页', id: 'home', show: true,
                        iconClass: 'oj-navigationlist-item-icon fa fa-home demo-icon-font-24'}
//                    {name: 'Incidents', id: 'incidents',
//                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'},
//                    {name: 'Customers', id: 'customers',
//                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'},
//                    {name: 'Profile', id: 'profile',
//                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-person-icon-24'},
//                    {name: '待审批列表', id: 'approve_list', show: false,
//                        iconClass: 'oj-navigationlist-item-icon fa fa-thumbs-up demo-icon-font-24'},
                ];
                self.navDataSource = new oj.ArrayTableDataSource(self.navData, {idAttribute: 'id'});

                // Drawer setup
                self.toggleDrawer = function () {
                    if(appVar.userRole === 'manager'){
                        self.navData[2].show = true;
                        self.navDataSource.reset(self.navData);
                    }
                    return oj.OffcanvasUtils.toggle({selector: '#navDrawer', modality: 'modal', content: '#pageContent'});
                }
                // Add a close listener so we can move focus back to the toggle button when the drawer closes
                $("#navDrawer").on("ojclose", function () {
                    $('#drawerToggleButton').focus();
                });

                // Header Setup
                self.getHeaderModel = function () {
                    var headerFactory = {
                        createViewModel: function (params, valueAccessor) {
                            var model = {
                                pageTitle: self.router.currentState().label,
                                showOffCanv: self.showOffCanv,
                                showBack: self.showBack,
                                handleBindingsApplied: function (info) {
                                    // Adjust content padding after header bindings have been applied
                                    self.adjustContentPadding();
                                },
                                toggleDrawer: self.toggleDrawer
                            };
                            return Promise.resolve(model);
                        }
                    }
                    return headerFactory;
                }

                // Method for adjusting the content area top/bottom paddings to avoid overlap with any fixed regions. 
                // This method should be called whenever your fixed region height may change.  The application
                // can also adjust content paddings with css classes if the fixed region height is not changing between 
                // views.
                self.adjustContentPadding = function () {
                    var topElem = document.getElementsByClassName('oj-applayout-fixed-top')[0];
                    var contentElem = document.getElementsByClassName('oj-applayout-content')[0];
                    var bottomElem = document.getElementsByClassName('oj-applayout-fixed-bottom')[0];

                    if (topElem) {
                        contentElem.style.paddingTop = topElem.offsetHeight + 'px';
                    }
                    if (bottomElem) {
                        contentElem.style.paddingBottom = bottomElem.offsetHeight + 'px';
                    }
                    // Add oj-complete marker class to signal that the content area can be unhidden.
                    // See the override.css file to see when the content area is hidden.
                    contentElem.classList.add('oj-complete');
                };

                // implement in login.js
                self.logout = null;
            }

            return new ControllerViewModel();
        }
);
