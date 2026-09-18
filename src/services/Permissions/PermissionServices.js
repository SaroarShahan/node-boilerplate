const { RolePermissionModel } = require('./../../models');
const { PermissionsRepository } = require('./../../respository/Permissions/PermissionsRepository');

class PermissionServices {
  constructor() {
    if (PermissionServices.instance) return PermissionServices.instance;

    this.permissionsRepository = new PermissionsRepository();
    PermissionServices.instance = this;
  }

  async getAllPermissions(req) {
    const { page } = req.query;
    const { rows, count, limit } = await this.permissionsRepository.findAndCountAllPermissions(
      req.query,
    );

    return {
      totalCount: count,
      permissions: rows,
      page: page ? +page : 1,
      limit: limit ? +limit : count,
      totalPage: limit ? Math.ceil(count / +limit) : 1,
    };
  }

  async getPermission(id) {
    return this.permissionsRepository.findById(id);
  }

  async createPermission(data) {
    return this.permissionsRepository.create(data);
  }

  async updatePermission(id, data) {
    return this.permissionsRepository.update(id, data);
  }

  async deletePermission(id) {
    const permission = await this.permissionsRepository.findById(id);

    if (!permission) return { permission: null };

    const roleCount = await RolePermissionModel.count({ where: { permissionId: id } });

    if (roleCount > 0) {
      const error = new Error(
        `Cannot delete permission: It is currently assigned to ${roleCount} ${roleCount === 1 ? 'role' : 'roles'}.`,
      );
      error.httpStatusCode = 400;
      throw error;
    }

    await this.permissionsRepository.delete(id);
    return { permission };
  }
}

module.exports = { PermissionServices };
