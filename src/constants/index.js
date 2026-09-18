const AUTHORIZATION_POLICIES = Object.freeze({
  OWNER_ONLY: Object.freeze({ allowAdmin: false }),
  OWNER_OR_ADMIN: Object.freeze({ allowAdmin: true }),
});

const USER_ROLES = Object.freeze({
  ADMIN: 'admin',
});

module.exports = { AUTHORIZATION_POLICIES, USER_ROLES };
