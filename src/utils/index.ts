interface LimitAndOffsetQuery {
  limit?: number | string;
  page?: number | string;
}

interface LimitAndOffset {
  limit: number | undefined;
  offset: number | undefined;
}

const limitAndOffsetBuilder = (query: LimitAndOffsetQuery | undefined): LimitAndOffset => {
  const DEFAULT_LIMIT: number = 20;
  const MAX_LIMIT: number = 100;

  const limit = query?.limit
    ? Math.min(Number(query?.limit) || DEFAULT_LIMIT, MAX_LIMIT)
    : undefined;
  const offset = query?.page && limit ? ((+query?.page || 1) - 1) * limit : undefined;

  return {
    limit,
    offset,
  };
};

export { limitAndOffsetBuilder };
