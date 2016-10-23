'use strict';

describe('Service: thingsSpeak', function () {

  // load the service's module
  beforeEach(module('swinieApp'));

  // instantiate service
  var thingsSpeak;
  beforeEach(inject(function (_thingsSpeak_) {
    thingsSpeak = _thingsSpeak_;
  }));

  it('should do something', function () {
    expect(!!thingsSpeak).toBe(true);
  });

});
