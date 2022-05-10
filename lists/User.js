const {
    File,
    Text,
    Slug,
    Relationship,
    Select,
    Password,
    Checkbox,
    CalendarDay,
    DateTime,
  } = require('@keystonejs/fields');
  module.exports = {
    fields: {
      name: { type: Text },
      username: {
        type: Text,
        isUnique: true,
      },
      password: {
        type: Password,
      },
      customers: {
        type: Relationship,
        ref: "Customer.users",
        many: true
      },
      type: {
        type: Text
      },
      groups: {
        type: Relationship,
        ref: "Group.users",
        many: true
      }
    },
    // List-level access controls
    access: {
    //   read: access.userIsAdminOrOwner,
    //   update: access.userIsAdminOrOwner,
    //   create: access.userIsAdmin,
    //   delete: access.userIsAdmin,
    //   auth: true,
    },
};