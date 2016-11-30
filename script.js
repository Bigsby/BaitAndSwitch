(function () {
    "use strict";
    function setDuration(topic) {
        if (topic.duration)
            return;

        var result = 0;

        if (topic.innerTopics)
            topic.innerTopics.forEach(function (innerTopic) {
                setDuration(innerTopic);
                result += innerTopic.duration;
            });
        topic.duration = result;
    }

    var appName = "app";
    var app = angular.module(appName, []);

    app.controller("sessionController", ["$http", function ($http) {
        var displayWindow;
        var vm = this;
        $http.get("data.json").then(function (response) {
            angular.extend(vm, response.data);
            setDuration(vm);
        });

        vm.shower = {
            show: function (topic) {
                if (!displayWindow) {
                    displayWindow = window.open(topic.name, "topic");
                } else {
                    displayWindow.location.assign(topic.name);
                }
            }
        };

    }]);

    app.component("topic", {
        templateUrl: "templates/topicTemplate.html",
        bindings: {
            topic: "<",
            index: "<",
            previousPath: "<",
            showDuration: "<",
            shower: "<"
        }
    });
    angular.bootstrap(document, [appName]);
})();