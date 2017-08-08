define(['jquery', 'data/appVariables',
    'utils/dateUtil'], function ($, appVar) {
    function localStorage() {
        var self = this;
        var storage = window.localStorage;
        self.maxId = 0;
        
        self.getAllRequestList = function () {
            var deferred = $.Deferred();
            var ls = storage.getItem("LS_MY_LIST");
            if (ls) {
                deferred.resolve(JSON.parse(ls));
            } else {
                $.getJSON("js/data/myRequestList.json",
                        function (data)
                        {
                            console.log(data);
                            storage.setItem("LS_MY_LIST", JSON.stringify(data));
                            deferred.resolve(data);
                        });
            }
            return deferred.promise();
        };
        
        self.getMyRequestList = function () {
            var deferred = $.Deferred();
            self.getAllRequestList().then(function (allReqList) {
                var myreqList = [];
                for (var i = 0; i < allReqList.items.length; i++)
                {
                    if (allReqList.items[i].requestor === appVar.mcsLoginUser)
                    {
                        myreqList.push(allReqList.items[i]);
                    }
                }
                deferred.resolve(myreqList);
            }, function () {
                deferred.reject([]);
            });
            return deferred.promise();
        };

        self.getApproveList = function () {
            var deferred = $.Deferred();
            self.getAllRequestList().then(function (myreqList) {
                var approveList = [];
                for (var i = 0; i < myreqList.items.length; i++)
                {
                    if (myreqList.items[i].status === "pending" && myreqList.items[i].approver === appVar.mcsLoginUser)
                    {
                        approveList.push(myreqList.items[i]);
                    }
                }
                deferred.resolve(approveList);
            }, function () {
                deferred.reject([]);
            });
            return deferred.promise();
        };

        self.approveRequest = function (itemId, status, approveMsg) {
            var deferred = $.Deferred();
            self.getAllRequestList().then(function (data) {
                var ls = data.items;
                for (var i = 0; i < ls.length; i++)
                {
                    if (ls[i].id === itemId) {
                        ls[i].status = status;
                        ls[i].updated_by = appVar.mcsLoginUser;
                        ls[i].updated_on = new Date().format('yyyy-MM-dd HH:mm:ss');
                        ls[i].comments = approveMsg;
                        storage.setItem("LS_MY_LIST", JSON.stringify({"items": ls}));
                        deferred.resolve({"status": "OK", "msg": "修改成功！"});
                        break;
                    }
                }
                deferred.reject({"status": "ERROR", "msg": "找不到记录！"});
            });
            return deferred.promise();
        };


        self.saveRequest = function (item) {
            var deferred = $.Deferred();
            console.log(item);
            var itemId = item.id;
            if (itemId) {
                self.getAllRequestList().then(function (data) {
                    var ls = data.items;
                    for (var i = 0; i < ls.length; i++)
                    {
                        if (ls[i].id === itemId && ls[i].status === 'pending') {
                            ls[i].justification = item.justification;
                            ls[i].amount = item.amount;
                            ls[i].destination = item.destination;
                            ls[i].budgetCode = item.budgetCode;
                            ls[i].updated_on = new Date().format('yyyy-MM-dd HH:mm:ss');
                            storage.setItem("LS_MY_LIST", JSON.stringify({"items": ls}));
                            deferred.resolve({"status": "OK", "msg": "修改成功！"});
                            break;
                        }
                    }
                    deferred.reject({"status": "ERROR", "msg": "找不到记录！"});
                });
            } else {
                self.getAllRequestList().then(function (data) {
                    var ls = data.items;
                    for (var i = 0; i < ls.length; i++)
                    {
                        self.maxId = ls[i].id > self.maxId ? ls[i].id : self.maxId;
                    }
                    self.maxId++;
                    item.id = self.maxId;
                    ls.unshift(item);
                    storage.setItem("LS_MY_LIST", JSON.stringify({"items": ls}));
                    deferred.resolve({"status": "OK", "msg": "申请提交成功！"});
                });
            }
            return deferred.promise();
        };

        self.deleteRequest = function (id) {
            var deferred = $.Deferred();
            self.getAllRequestList().then(function (data) {
                var ls = data.items;
                for (var i = 0; i < ls.length; i++)
                {
                    if (ls[i].id === id && ls[i].status === 'pending') {
                        ls.splice(i,1);
                        storage.setItem("LS_MY_LIST", JSON.stringify({"items": ls}));
                        deferred.resolve({"status": "OK", "msg": "删除成功！"});
                        break;
                    }
                }
                deferred.reject({"status": "ERROR", "msg": "找不到记录！"});
            }, function(e){
                deferred.reject({"status": "ERROR", "msg": e});
            });
            return deferred.promise();
        };


    }
    ;

    return new localStorage();
});
