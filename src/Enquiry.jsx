import axios from "axios";
import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import TableList from "./components/TableList";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// only import what you want to use

const Enquiry = () => {
  let [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id: "",
  });

  let [enquiryList, setEnquiryList] = useState([]);
  let getAllEnquiry = async () => {
    let res = await axios.get("http://localhost:8020/api/website/enquiry/view");
    let data = res.data;
    console.log(data);
    console.log(data.enquiryList);
    console.log(data.enquiryList._id);
    setEnquiryList(data.enquiryList);
  };

  useEffect(() => {
    getAllEnquiry();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[30%_70%] gap-6 px-4 text-black">
        <div className="bg-yellow-700 text-black p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Enquiry Form</h2>
          <Form
            refresh={getAllEnquiry}
            formData={formData}
            setFormData={setFormData}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
          <h2 className="text-xl font-bold mb-4">Enquiry List</h2>

          <TableList
            data={enquiryList}
            refresh={getAllEnquiry}
            setFormData={setFormData}
          />
        </div>
      </div>
    </>
  );
};

export default Enquiry;
