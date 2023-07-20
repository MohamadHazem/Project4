const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema

const adminSchema = new Schema({
    password: {
        type: String,
    },
    fullName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
    }
})

adminSchema.pre("save", function (next) {
    const admin = this
    if (!admin.isModified("password")) {
        return next()
    }
    admin.password = bcrypt.hashSync(admin.password, 10)
    next()
})

adminSchema.methods.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin