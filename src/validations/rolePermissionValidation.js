const { z } = require('zod');
const { idParamSchema, pageLimitQuerySchema } = require('./common');

const rolePermissionFields = {
  roleId: z.coerce.number().int().positive(),
  permissionId: z.coerce.number().int().positive(),
};

module.exports = {
  createRolePermissionSchema: { body: z.object(rolePermissionFields).strict() },
  updateRolePermissionSchema: {
    params: idParamSchema,
    body: z.object(rolePermissionFields).partial().strict(),
  },
  getRolePermissionSchema: { params: idParamSchema },
  deleteRolePermissionSchema: { params: idParamSchema },
  getRolePermissionsSchema: {
    query: pageLimitQuerySchema.extend({
      roleId: z.coerce.number().int().positive().optional(),
      permissionId: z.coerce.number().int().positive().optional(),
    }),
  },
};
