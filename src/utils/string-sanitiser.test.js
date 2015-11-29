import { expect } from 'chai';
import stringSantiser from './string-sanitiser';

describe('Util: String sanitiser', () => {
  it('should sanitise given strings', () => {
    expect(stringSantiser('S0meThing')).to.equal('s0mething');
    expect(stringSantiser('S0meThing e1Se')).to.equal('s0mething-e1se');
    expect(stringSantiser('$0meThing @t')).to.equal('0mething-t');
    expect(stringSantiser('$0meThing-@t')).to.equal('0mething-t');
  });

  it('should return undefined if no string is provided', () => {
    expect(stringSantiser('')).to.equal(undefined);
  });
});
