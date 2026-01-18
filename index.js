let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
const enquiryRouter = require("./routes/web/enquiryRoutes");
require("dotenv").config();

let app = express();

app.use(cors());

app.use(express.json());

app.use("/api/website/enquiry", enquiryRouter);

mongoose
  .connect(process.env.DBURL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server is running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
