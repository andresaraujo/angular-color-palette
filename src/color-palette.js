'use strict';

angular.module('aa.colorPalette', [])

	.directive('colorPalette', [function () {
	return {
		replace: true,
		restrict: 'E',
		scope: {
			'onSelected': '&'
		},
		template: 
		'<div class="outer">'+
			'<div class="aa-color-palette">'+
				'<div class="aa-color-cell" ng-repeat="c in colors" ng-click="setSelectedColor(c);">'+
					'<div title="c.title" class="aa-color-box" ng-style="{\'background-color\': c.color};"'+
					' ng-class="{\'aa-color-border\': c.grayBorder, \'aa-color-box-selected\': c == selectedColor}">'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>',
		link: function (scope, element, attrs) {
			scope.colors=[
				{color:"rgb(255, 255, 255)", title:"Ninguno", grayBorder:true},
				{color:"rgb(245, 101, 69)", title:"Rojo"},
				{color:"rgb(255, 187, 34)", title:"Naranja"},
				{color:"rgb(238, 238, 34)", title:"Amarillo"},
				{color:"rgb(187, 229, 53)", title:"Verde"},
				{color:"rgb(119, 221, 187)", title:"Turquesa"},
				{color:"rgb(102, 204, 221)", title:"Azul"},
				{color:"rgb(181, 197, 197)", title:"Gris"}
			];
			scope.selectedColor={};

			scope.setSelectedColor = function(color){
				scope.selectedColor = color;
				scope.onSelected({color:color});
			};
		}
	};
}])
;