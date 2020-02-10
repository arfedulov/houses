import { buildQuery } from '@/utils/buildQuery';

describe('utils:buildQuery()', () => {
  it('produce url query parameter string from object of parameters', () => {
    const PARAMETERS = {
      qwer: 12345,
      asdf: 'treew',
      q: '10932',
    };

    const actual = buildQuery(PARAMETERS);
    const actualParsed = new URLSearchParams(actual);

    expect(actual[0]).toBe('?');
    expect(actual[actual.length - 1]).not.toBe('&');
    expect(actual.split('&')).toHaveLength(3);
    Object.keys(PARAMETERS).forEach((key) => {
      expect(actualParsed.get(key)).toBe(PARAMETERS[key].toString());
    });
  });
});
