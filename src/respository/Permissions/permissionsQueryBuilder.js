const { Op } = require('sequelize');
const { limitAndOffsetBuilder } = require('./../../utils');

const permissionsQueryBuilder = (query = {}) => ({
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

module.exports = { permissionsQueryBuilder };
