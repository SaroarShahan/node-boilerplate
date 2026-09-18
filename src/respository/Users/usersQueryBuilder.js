const { limitAndOffsetBuilder } = require('../../utils');

const usersQueryBuilder = (query = {}) => ({
  where: query.status ? { status: query.status } : {},
  ...limitAndOffsetBuilder(query),
  order:
    query.sortBy && query.orderBy
      ? [[query.sortBy, query.orderBy.toUpperCase()]]
      : [['created_at', 'desc']],
});

module.exports = { usersQueryBuilder };
