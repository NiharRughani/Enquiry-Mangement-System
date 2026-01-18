import React from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Toast,
} from "flowbite-react";
import { toast, ToastContainer } from "react-toastify";

const TableList = ({ data, refresh, setFormData }) => {
  let deleteRow = (id) => {
    axios
      .delete(`http://localhost:8020/api/website/enquiry/delete/${id}`)
      .then((res) => {
        toast.success("Enquiry Deleted Successfully");
        refresh();
      });
  };
  let editRow = (id) => {
    axios
      .get(`http://localhost:8020/api/website/enquiry/single/${id}`)
      .then((res) => {
        let enquiry = res.data.enquiry;
        console.log(enquiry);
        setFormData({
          name: enquiry.name,
          email: enquiry.email,
          phone: enquiry.phone,
          message: enquiry.message,
          _id: enquiry._id,
        });
      });
  };
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell>Sr No</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Phone</TableHeadCell>
            <TableHeadCell>Message</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Edit</span>
              Edit
            </TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Delete</span>
              Delete
            </TableHeadCell>
          </TableRow>
        </TableHead>

        <TableBody className="divide-y">
          {data && data.length > 0 ? (
            data.map((enquiry, index) => (
              <TableRow
                key={enquiry._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </TableCell>
                <TableCell>{enquiry.name}</TableCell>
                <TableCell>{enquiry.email}</TableCell>
                <TableCell>{enquiry.phone}</TableCell>
                <TableCell>{enquiry.message}</TableCell>

                <TableCell>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteRow(enquiry._id)}
                  >
                    Delete
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => editRow(enquiry._id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableList;
