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
      code: {
        type: Text,
        // generate: ({ resolvedData }) => slugify((new Date()).getTime()),
      },
      items: {
        type: Relationship,
        ref: "Item",
        many: true
      }
    },
    // List-level access controls
    access: {
    
    },
};