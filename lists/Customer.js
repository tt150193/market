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
        name: {
            type: Text
        },
        code: {
            type: Text
        },
        phone: {
            type: Text
        },
        notes: {
            type: Relationship,
            ref: "Note.customers",
            many: true
        },
        type: {
            type: Text
        },
        users: {
            type: Relationship,
            ref: "User.customers",
            many: true
        },
        groups: {
            type: Relationship,
            ref: "Group.customers",
            many: true
        }
    },
    // List-level access controls
    access: {

    },
};