'use strict';

angular.module('transandalus')
    .controller('StageDetailController', function ($scope, $rootScope, $stateParams, DataUtils, entity, Stage, API_URL) {
        $scope.stage = entity;
        $scope.load = function (id) {
            Stage.get({id: id}, function(result) {
                $scope.stage = result;
            });
        };
        var unsubscribe = $rootScope.$on('transandalus:stageUpdate', function(event, result) {
            $scope.stage = result;
        });
        $scope.$on('$destroy', unsubscribe);

        $scope.byteSize = DataUtils.byteSize;

        $scope.map = {
            //Cordoba
            center: {
              latitude: 37.891581,
              longitude: -4.778564
            },
            zoom:7,
            options: {scrollwheel:false}
        };

        if($scope.stage.$promise){
            $scope.stage.$promise.then(function(el){
                if(el.track){
                    var url = API_URL + '/tracks/'+el.track.id;
                    $scope.map.kmlLayerOptions = {'url':url};
                }
            });
        }
    });
