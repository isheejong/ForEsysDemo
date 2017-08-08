/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'hammerjs', 'promise', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojdialog'],
        function (oj, ko, $, Hammer)
        {
            var dialogID = "#modalDialog";
            
            function AppUIHelper() {
                var self = this;

                function init() {
                    self.dialogModel = new DialogModel();
                    ko.applyBindings(self.dialogModel, document.getElementById('dialogWrapper'));
                }
                
                self.openDialog = function (titleText, messageText) {
                    self.dialogModel.title(titleText);
                    self.dialogModel.content(messageText);
                    self.dialogModel.open();
                };

                init();
            }
            
            function DialogModel() {
                var self = this;
                var getTranslation = oj.Translations.getTranslatedString;
                self.title = ko.observable();
                self.content = ko.observable();
                
                self.open = function (closeTimeout) {
                    $(dialogID).ojDialog({title: self.title() });
                    $(dialogID).ojDialog('open');
                };
                
                self.closeDialog = function(){
                    $(dialogID).ojDialog("close");
                };

            };

            return new AppUIHelper();
        });	