const { Op } = require('sequelize');
const { limitAndOffsetBuilder } = require('../../utils');

const buildRolesQuery = (query = {}) => ({
  where: query.search ? { name: { [Op.iLike]: `%${query.search}%` } } : {},
  ...limitAndOffsetBuilder(query),
  order:
    query.sortBy && query.orderBy
      ? [[query.sortBy, query.orderBy.toUpperCase()]]
      : [['id', 'DESC']],
});

module.exports = { buildRolesQuery };
