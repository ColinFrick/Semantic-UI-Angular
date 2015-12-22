(function () {
    'use strict';

    angular
        .module('semantic.ui.components.field', [])

        .directive('smField', ['$compile', smField]);

    function smField($compile) {
        return {
            restrict: 'E',
            require: '?ngModel',
            transclude: true,
            replace: true,
            template: '<div class="field">' +
            '<label></label>' +
            '<div class="ui input"><input name="{{name}}" placeholder="{{placeholder}}" type="text" ng-model="bindModel" ng-required="ngRequired"></div>' +
            '</div>',
            scope: {
                name: '@',
                placeholder: '@?',
                bindModel: '=ngModel',
                ngRequired: '=ngRequired',
                smIcon: '@',
                smIconAlignment: '@'
            },

            link: function (scope, element, attrs, ngModel, transclude) {

                var required = false;
                var input = element.find('input');
                var wrapper = element.find('.input');

                transclude(scope, function (nodes) {
                    element.find('label').append(nodes);
                });

                if (!ngModel) {
                    throw new Error('Semantic-UI-Angular: The \'smField\' directive requires a \'ng-model\' value');
                }

                if (attrs.smIcon !== void 0) {
                    wrapper
                        .addClass(attrs.smIconAlignment !== void 0 ? scope.smIconAlignment : 'left')
                        .addClass('icon')
                        .append($compile(angular.element('<i class="{{smIcon}} icon"></i>'))(scope));
                }

                scope.$watch(attrs.ngRequired, function (val) {
                    required = val || false;
                    input.attr('required', required);
                    if (required) {
                        element.addClass('required');
                    } else {
                        element.removeClass('required');
                    }
                });
            }
        };

    }
})();
