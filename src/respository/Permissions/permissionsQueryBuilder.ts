import { Op } from 'sequelize';

import { limitAndOffsetBuilder } from './../../utils';

type PermissionQuery = {
  module?: string;
  search?: string;
  sortBy?: string;
  orderBy?: string;
  limit?: string | number;
  page?: string | number;
};

const permissionsQueryBuilder = (query: PermissionQuery = {}) => ({
  where: {
    ...(query.module && { module: query.module }),
    ...(query.search && {
      [Op.or]: [
        { name: { [Op.iLike]: `%${query.search}%` } },
        { label: { [Op.iLike]: `%${query.search}%` } },
        { module: { [Op.iLike]: `%${query.search}%` } },
      ],
    }),
  },
  ...limitAndOffsetBuilder(query),
  order:
    query.sortBy && query.orderBy
      ? [[query.sortBy, query.orderBy.toUpperCase()]]
      : [
          ['module', 'ASC'],
          ['id', 'DESC'],
        ],
});

export { permissionsQueryBuilder };
