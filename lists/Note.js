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
        createDate: {
            type: DateTime
        },
        content: {
            type: Text
        },
        title: {
            type: Text
        },
        customers: {
            type: Relationship,
            ref: "Customer.notes",
            many: true
        },
        state: {
            type: Text
        }
    },
    // List-level access controls
    access: {

    },
};