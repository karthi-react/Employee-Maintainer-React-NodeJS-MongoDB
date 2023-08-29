const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
    {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile_no: {
        type: Number,
        required: true
    },
    designation: {
        type: String,
        required: true 
    },
    gender: {
        type: String,
        required: true 
    },
    course: {
        type: String,
        required: true 
    },
    image: {
        type: String,
        // required: true 
    }
},
{ timestamps: { createdAt: 'createdDate',updatedAt: 'updatedDate' } 
})

const EmployeeDetails = mongoose.model("EmployeeDetails", employeeSchema);

module.exports = EmployeeDetails;