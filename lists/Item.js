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
    AutoIncrement
  } = require('@keystonejs/fields');
  module.exports = {
    fields: {
      amount: {
        type: Integer
      },
      product: {
        type: Relationship,
        ref: "Product",
      },
      price: {
        type: Integer,
      },
      total: {
        type: Integer
      }
    },
    // List-level access controls
    access: {
    
    },
};