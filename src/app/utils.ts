import { configuration } from '../config.js';

const { pagination } = configuration;

interface PaginationParams {
  limit?: string;
  offset?: string;
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
