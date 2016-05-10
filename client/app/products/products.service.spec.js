'use strict';

describe('Service: products', function () {

  // load the service's module
  beforeEach(module('blindsSiteApp'));

  // instantiate service
  var Products;
  beforeEach(inject(function (_products_) {
    Products = _products_;
  }));

  it('should do something', function () {
    expect(!!products).to.be.true;
  });

});
