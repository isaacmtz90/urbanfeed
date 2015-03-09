'use strict';

describe('Filter: cityFilter', function () {

  // load the filter's module
  beforeEach(module('consoleApp'));

  // initialize a new instance of the filter before each test
  var cityFilter;
  beforeEach(inject(function ($filter) {
    cityFilter = $filter('cityFilter');
  }));

  it('should return the input prefixed with "cityFilter filter:"', function () {
    var text = 'angularjs';
    expect(cityFilter(text)).toBe('cityFilter filter: ' + text);
  });

});
