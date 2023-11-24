const mongoose = require("mongoose");
const validator = require("validator");

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phoneNumbers: {
    type: [
      {
        type: Number,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
          if (value < 0) {
            throw new Error("Phone Number cannot be negative");
          }
        },
      },
    ],
  },
  emailId: {
    type: [
      {
        type: String,
        required: false,
        trim: true,
        unique: false,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error("Email is invalid");
          }
        },
      },
    ],
  },
  dateOfBirth: {
    type: Date,
    required: false,
    trim: true,
    validate(value) {
      if (!validator.isDate(value)) {
        throw new Error("Date is invalid, Use the format YYYY/MM/DD");
      }
    },
  },
});

module.exports = mongoose.model("Contact", ContactSchema);

// Contact:-
// -> Will have a Name (required) -
// -> Will/Can have multiple phone numbers (should have at least 1 phone number)
// -> Will/Can have multiple emails
// -> Will/Can have a single Date of birth (not mandatory)
