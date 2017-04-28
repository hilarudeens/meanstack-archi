(function (global) {
    'use strict';
    var angular = global.angular;
    var catalogInstance = {
        templateUrl: 'main/catalog/catalog.template.html',
        controller: ['$scope', '$http', '$httpParamSerializer', function ($scope, $http, $httpParamSerializer) {
                var $ctrl = catalogInstance.$ctrl = this;
                catalogInstance.$http = $http;
                catalogInstance.$scope = $scope;
                catalogInstance.$httpParamSerializer = $httpParamSerializer;
                $scope.selected = {
                    id: []
                };
                catalogInstance._loadData();
                $ctrl.downloadPdf = catalogInstance._downloadPdf;
            }],
        _loadData: function () {
            var $scope = catalogInstance.$scope;
            var $http = catalogInstance.$http;
            $http({
                method: 'GET',
                url: '/api/catalog/list'
            }).then(function successCallback(response) {
                $scope.catalogList = response.data.data;
            }, function errorCallback(response) {
                // TO DO: Show toster for failed message
            });
        },
        _downloadPdf: function () {
            var $scope = catalogInstance.$scope;
            var $httpParamSerializer = catalogInstance.$httpParamSerializer;
            //debugger;
            console.log($scope.selected.id);
            if ($scope.selected.id.length <= 0) {
                alert('Please select atleast one item to download');
                return;
            }
            var params = $httpParamSerializer({
                id: $scope.selected.id
            });
            window.open('/api/pdfdownload/download-now?' + params);

//            $http({
//                method: 'GET',
//                params: {
//                    id: $scope.selected.id
//                },
//                url: '/api/pdfdownload/download-now'
//            });
        }
    };
    angular.module('catalog').component('catalogList', {
        templateUrl: catalogInstance.templateUrl,
        controller: catalogInstance.controller
    });
}(window));


