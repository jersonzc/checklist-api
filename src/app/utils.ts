import { configuration } from '../config.js';
import { ZodError, ZodIssue, ZodIssueCode } from 'zod';

const { pagination, order } = configuration;

interface PaginationParams {
  limit?: string;
  offset?: string;
}

interface SortParams {
  fields?: string[];
  direction?: string;
  orderBy?: string;
}

export const parsePaginationParams = ({
  limit = String(pagination.limit),
  offset = String(pagination.offset),
}: PaginationParams) => ({
  limit: !Number.isNaN(Number.parseInt(limit))
    ? Number.parseInt(limit)
    : pagination.limit,
  offset: !Number.isNaN(Number.parseInt(offset))
    ? Number.parseInt(offset)
    : pagination.offset,
});

export const parseSortParams = ({
  fields = [],
  direction = order.direction,
  orderBy = order.orderBy,
}: SortParams) => ({
  orderBy: fields.includes(orderBy) ? orderBy : order.orderBy,
  direction: order.options.includes(direction) ? direction : order.direction,
});

export const parseZodError = (error: ZodError): string =>
  error.errors
    .map((item: ZodIssue) => {
      let entity = '';
      let msg = '';
      switch (item.code) {
        case ZodIssueCode.unrecognized_keys:
          entity = item.keys.join('-');
          msg = 'unrecognized field';
          break;
        default:
          entity = item.path.join('-');
          msg = item.message;
      }
      return `[${entity}: ${msg}]`;
    })
    .join(' ');
