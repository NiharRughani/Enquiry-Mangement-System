const enquiryModel = require("../.././models/enquiry.model");
let enquiryInsert = (req, res) => {
  let { name, email, phone, message } = req.body;
  console.log(name, email, phone, message);

  let enquiry = new enquiryModel({
    name: name, // left side is schema field, right side is variable
    email: email,
    phone: phone,
    message: message,
  });
  enquiry
    .save()
    .then(() => {
      res.send({
        status: 1,
        message: "enquiry saved",
      });
      console.log("data saved");
    })
    .catch((err) => {
      res.send({
        status: 0,
        message: "error while saving enquiry",
        error: err,
      });
      console.log("error", err);
    });
};
let enquiryList = async (req, res) => {
  let enquiry = await enquiryModel.find();
  res.send({
    status: 1,
    message: "enquiry list",
    enquiryList: enquiry,
  });
};
let enquiryDelete = async (req, res) => {
  let enquiryId = req.params.id;
  let enquiry = await enquiryModel.deleteOne({ _id: enquiryId });
  res.send({
    status: 1,
    message: "enquiry deleted",
  });
};
let enquirySingleRow = async (req, res) => {
  let enquiryId = req.params.id;
  let enquiry = await enquiryModel.findOne({ _id: enquiryId });
  res.send({
    status: 1,
    message: "enquiry single row",
    enquiry: enquiry,
  });
};

let enquiryUpdate = async (req, res) => {
  let enquiryId = req.params.id;
  let { name, email, phone, message } = req.body;
  let enquiry = await enquiryModel.updateOne(
    { _id: enquiryId },
    {
      $set: { name: name, email: email, phone: phone, message: message },
    },
  );
  res.send({
    status: 1,
    message: "enquiry updated",
    enquiry: enquiry,
  });
};

module.exports = {
  enquiryInsert,
  enquiryList,
  enquiryDelete,
  enquirySingleRow,
  enquiryUpdate,
};
