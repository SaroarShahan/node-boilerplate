import { AUTHORIZATION_POLICIES, USER_ROLES } from '../constants';

interface AuthorizationUser {
  id: string | number;
  role: (typeof USER_ROLES)[keyof typeof USER_ROLES];
}

interface AuthorizationPolicy {
  allowAdmin: boolean;
}

class Authorization {
  hasOwnership(
    user: AuthorizationUser,
    ownerIdOrIds: string | number | (string | number)[],
  ): boolean {
    const ownerIds: (string | number)[] = Array.isArray(ownerIdOrIds)
      ? ownerIdOrIds
      : [ownerIdOrIds];

    return ownerIds.includes(user.id);
  }

  isOwnerOrAdmin(
    user: AuthorizationUser,
    ownerIdOrIds: string | number | (string | number)[],
  ): boolean {
    if (user.role === USER_ROLES.ADMIN) {
      return true;
    }

    return this.hasOwnership(user, ownerIdOrIds);
  }

  matchesPolicy(
    user: AuthorizationUser,
    ownerIdOrIds: string | number | (string | number)[],
    policy: AuthorizationPolicy,
  ): boolean {
    return policy.allowAdmin
      ? this.isOwnerOrAdmin(user, ownerIdOrIds)
      : this.hasOwnership(user, ownerIdOrIds);
  }

  canEdit(
    user: AuthorizationUser,
    ownerId: string | number,
    policy: AuthorizationPolicy = AUTHORIZATION_POLICIES.OWNER_ONLY,
  ): boolean {
    return this.matchesPolicy(user, ownerId, policy);
  }

  canDelete(
    user: AuthorizationUser,
    ownerId: string | number,
    policy: AuthorizationPolicy = AUTHORIZATION_POLICIES.OWNER_OR_ADMIN,
  ): boolean {
    return this.matchesPolicy(user, ownerId, policy);
  }
}

export { Authorization };
