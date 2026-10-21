import { Op } from 'sequelize';

import { limitAndOffsetBuilder } from '../../utils';

type RolesQuery = {
  search?: string;
  sortBy?: string;
  orderBy?: string;
  limit?: string | number;
  page?: string | number;
};

const buildRolesQuery = (query: RolesQuery = {}) => ({
  where: query.search ? { name: { [Op.iLike]: `%${query.search}%` } } : {},
  ...limitAndOffsetBuilder(query),
  order:
    query.sortBy && query.orderBy
      ? [[query.sortBy, query.orderBy.toUpperCase()]]
      : [['id', 'DESC']],
});

export { buildRolesQuery };
