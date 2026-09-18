const { z } = require('zod');
const { idParamSchema, pageLimitQuerySchema } = require('./common');

const permissionFields = {
  name: z.string().trim().min(1).max(100),
  label: z.string().trim().min(1).max(100),
  module: z.string().trim().min(1).max(100),
};

module.exports = {
  createPermissionSchema: { body: z.object(permissionFields).strict() },
  updatePermissionSchema: {
    params: idParamSchema,
    body: z.object(permissionFields).partial().strict(),
  },
  getPermissionSchema: { params: idParamSchema },
  deletePermissionSchema: { params: idParamSchema },
  getPermissionsSchema: {
    query: pageLimitQuerySchema.extend({
      module: z.string().trim().optional(),
      search: z.string().trim().optional(),
    }),
  },
};
