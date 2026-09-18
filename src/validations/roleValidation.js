const { z } = require('zod');
const { idParamSchema, pageLimitQuerySchema } = require('./common');

const permissionIdsSchema = z.array(z.coerce.number().int().positive()).min(1);

module.exports = {
  createRoleSchema: {
    body: z
      .object({ name: z.string().trim().min(1).max(50), permissions: permissionIdsSchema })
      .strict(),
  },
  updateRoleSchema: {
    params: idParamSchema,
    body: z
      .object({
        name: z.string().trim().min(1).max(50),
        permissions: permissionIdsSchema.optional(),
      })
      .strict(),
  },
  getRoleSchema: { params: idParamSchema },
  deleteRoleSchema: { params: idParamSchema },
  getRolesSchema: {
    query: pageLimitQuerySchema.extend({ search: z.string().trim().optional() }),
  },
};
