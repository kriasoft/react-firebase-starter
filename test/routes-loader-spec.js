/**
 * React Static Boilerplate
 * Copyright (c) Konstantin Tarkus | MIT License
 */

import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('routes-loader', () => {

  it('Should load a list of routes', function(done) {
    this.cacheable = () => {};
    this.async = () => (err, result) => {
      expect(err).to.be.null;
      expect(result).to.not.to.be.empty.and.have.all.keys('/', '/404', '/500');
      done();
    };

    require('../scripts/routes-loader').call(this);
  });

});
