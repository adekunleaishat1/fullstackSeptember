const yup = require("yup")

const emailregex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

const uservalidation = yup.object({
    firstname:yup.string().min(4,"firstname should not be less than 4 characters").required("Firstname is required"),
    lastname:yup.string().min(4,"firstname should not be less than 4 characters").required("Lastname is required"),
    email:yup.string().matches(emailregex, "must be a valid email").required("email is required"),
    password:yup.string().required("password is required")
})


module.exports = {uservalidation}