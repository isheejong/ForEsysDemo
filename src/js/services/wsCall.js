/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define(['ojs/ojcore', 'jquery', 'utils/localStorage', 'mbe/mbe', 'data/appVariables', 'utils/dateUtil'],
        function (oj, $, localStorage, mbe, appVar) {
            function wsCallModule() {
                var self = this;
                var getTranslation = oj.Translations.getResource;

                self.mcsAutoLogin = function () {
                    var deferred = $.Deferred();
                    var loginSuccess = function (response, data) {
                        //    console.log(response);
                        console.log("Login Successfully!");
                        mbe.isLoggedIn = true;
                        deferred.resolve(response, data);
                    };

                    var loginFailure = function (statusCode, data) {
                        mbe.isLoggedIn = false;
                        self.isLoggedIn(mbe.isLoggedIn);
                        alert("Login failed! statusCode:" + statusCode + " Message: " + JSON.stringify(data));
                        deferred.reject(statusCode, data);
                    };

                        mbe.authenticate(appVar.mcsLoginUser, appVar.mcsLoginPassword).then(loginSuccess, loginFailure);
                //    mbe.authAnonymous().then(loginSuccess, loginFailure);
                    return deferred.promise();
                };

            }

            return new wsCallModule();
        }
);
