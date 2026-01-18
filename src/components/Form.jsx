import React from "react";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  Checkbox,
  FileInput,
  Label,
  Radio,
  RangeSlider,
  Select,
  Textarea,
  TextInput,
  ToggleSwitch,
} from "flowbite-react";
const Form = ({ formData, setFormData, refresh }) => {
  let saveEnquiry = (e) => {
    e.preventDefault();
    // let formData ={
    //   name:e.target.name.value,
    //   email:e.target.email.value,
    //   phone:e.target.phone.value,
    //   message:e.target.message.value
    // }
    if (formData._id !== "") {
      // update logic
      axios
        .put(
          `http://localhost:8020/api/website/enquiry/update/${formData._id}`,
          formData,
        )
        .then((res) => {
          toast.success("Enquiry Updated Succesfully");
          refresh();
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            _id: "",
          });
        });
    } else {
      axios
        .post("http://localhost:8020/api/website/enquiry/insert", formData)
        .then((res) => {
          console.log(res.data);
          toast.success("Enquiry Saved Succesfully");
          refresh();

          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            _id: "",
          });
        });
    }
  };
  let getValue = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let oldData = { ...formData };
    oldData[inputName] = inputValue;
    setFormData(oldData);
  };

  return (
    <>
      <form
        onSubmit={saveEnquiry}
        className="flex max-w-md flex-col gap-4 text-white"
      >
        <div>
          <div className="mb-2 block">
            <Label className="text-black" htmlFor="name">
              Your Name
            </Label>
          </div>
          <TextInput
            id="name"
            type="text"
            placeholder="Enter Your Name"
            name="name"
            value={formData.name}
            required
            onChange={getValue}
          />
        </div>
        <div>
          <div className="mb-2 ">
            <Label htmlFor="email"> Email</Label>
          </div>
          <TextInput
            type="email"
            id="email"
            placeholder="enter your email"
            required
            name="email"
            value={formData.email}
            onChange={getValue}
          />
        </div>

        <div>
          <div className="mb-2 ">
            <Label htmlFor="phone" value="your Phone">
              phone
            </Label>
          </div>
          <TextInput
            type="text"
            id="phone"
            placeholder="enter your phone no."
            required
            name="phone"
            value={formData.phone}
            onChange={getValue}
          />
        </div>

        <div className="max-w-md">
          <div className="mb-2 ">
            <Label htmlFor="message">Your message</Label>
          </div>
          <Textarea
            placeholder="Enter Your Message"
            required
            rows={4}
            name="message"
            value={formData.message}
            onChange={getValue}
            id="message"
          />
        </div>
        {formData._id === "" ? (
          <Button type="submit">Submit</Button>
        ) : (
          <Button type="submit">Update</Button>
        )}
      </form>
    </>
  );
};

export default Form;
