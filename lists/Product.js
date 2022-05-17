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
      stock: {
        type: Integer
      },
      images: {
        type: Relationship,
        ref: "MediaImage.products",
        many: true
      },
      imagePresent: {
        type: Relationship,
        ref: "MediaImage"
      },
      price: {
        type: Integer
      },
      priceReal: {
        type: Integer
      },
      tags: {
        type: Relationship,
        ref: "Tag.products",
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