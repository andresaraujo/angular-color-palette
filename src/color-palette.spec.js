/*global beforeEach, afterEach, inject, module, describe, describe, expect, it, iit, spyOn, xdescribe, xit */
'use strict';

describe("color-palette.js", function () {
	var $compile, $rootScope, $scope, isolateScope;

	beforeEach(module('aa.colorPalette'));

	beforeEach(inject(function($injector){
		$rootScope = $injector.get('$rootScope');
		$compile = $injector.get('$compile');

		$scope = $rootScope.$new();

		$scope.onSelected = function (color) {
			$scope.color = color;
		};
		spyOn($scope, 'onSelected');

		var tpl = angular.element('<color-palette on-selected="onSelected(color)"></color-palette>');
		var elem = $compile(tpl)($scope);

		$scope.$digest();

		isolateScope = elem.isolateScope();
		isolateScope.$apply();
	}));

	it("Should have defined services", function () {
		expect($rootScope).toBeDefined();
		expect($compile).toBeDefined();
	});

	it("Should have colors defined", function () {
		expect(isolateScope.colors).toBeDefined();
	});

	it("Should have colors length > 0 ", function () {
		expect(isolateScope.colors.length>0).toBe(true);
	});

	it("Should return the color to the callback onSelected(color)", function () {
		isolateScope.setSelectedColor(isolateScope.colors[0]);
		expect($scope.onSelected).toHaveBeenCalledWith(isolateScope.colors[0]);
	});

	it("Should have isolateScope.selectedColor equals to the selected color", function () {
		isolateScope.setSelectedColor(isolateScope.colors[1]);
		isolateScope.$apply();
		expect(isolateScope.selectedColor).toBe(isolateScope.colors[1]);
	});
});