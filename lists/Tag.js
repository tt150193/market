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
    Integer,
  } = require('@keystonejs/fields');
  module.exports = {
    fields: {
      name: {
        type: Text
      },
      tag: {
        type: Slug,
        generate: ({ resolvedData }) => slugify(resolvedData.name + '-' + (new Date()).getTime()),
      },
      products: {
        type: Relationship,
        ref: "Product.tags",
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