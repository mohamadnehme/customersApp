const mongoose = require('mongoose');

const customerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name value'],
    },
    address: {
      type: String,
      required: [true, 'Please add an address value'],
    },
    phone: {
      type: String,
    },
    countryCode: {
      type: String,
    },
    countryName: {
      type: String,
    },
    operatorName: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Customer', customerSchema);
