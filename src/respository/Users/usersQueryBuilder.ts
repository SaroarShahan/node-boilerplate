import { limitAndOffsetBuilder } from '../../utils';

type UsersQuery = {
  status?: string;
  sortBy?: string;
  orderBy?: string;
  limit?: string | number;
  page?: string | number;
};

const usersQueryBuilder = (query: UsersQuery = {}) => ({
  where: query.status ? { status: query.status } : {},
  ...limitAndOffsetBuilder(query),
  order:
    query.sortBy && query.orderBy
      ? [[query.sortBy, query.orderBy.toUpperCase()]]
      : [['created_at', 'desc']],
});

export { usersQueryBuilder };
