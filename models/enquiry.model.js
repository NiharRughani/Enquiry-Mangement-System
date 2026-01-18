let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let enquirySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true, // required means that you cannot leave that field empty
    unique: true, // unique means cannot send the same email twice
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

let enquiryModel = mongoose.model("Enquiry", enquirySchema);

module.exports = enquiryModel;
