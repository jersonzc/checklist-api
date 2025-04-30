import { parsePaginationParams } from './utils.js';

describe('Utils', () => {
  test('parsePaginationParams', () => {
    const result = parsePaginationParams({ limit: '10' });

    expect(result).toEqual({
      limit: 10,
      offset: 0,
    });
  });
});
