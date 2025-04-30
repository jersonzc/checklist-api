import { parsePaginationParams, parseSortParams } from './utils.js';
import { expect } from 'vitest';

describe('Utils', () => {
  describe('parsePaginationParams', () => {
    test('with only one param', () => {
      const result = parsePaginationParams({ limit: '10' });

      expect(result).toEqual({
        limit: 10,
        offset: 0,
      });
    });
    test('without params', () => {
      const result = parsePaginationParams({});

      expect(result).toEqual({
        limit: 10,
        offset: 0,
      });
    });
  });

  describe('parseSortParams', () => {
    test('with valid params', () => {
      const result = parseSortParams({
        fields: ['id', 'title'],
        direction: 'asc',
        orderBy: 'title',
      });

      expect(result).toEqual({
        orderBy: 'title',
        direction: 'asc',
      });
    });
  });
});
