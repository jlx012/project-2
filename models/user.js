///////////////////////////////////////
// First, import dependencies
///////////////////////////////////////
const mongoose = require('./connection')

///////////////////////////////////////
// define our user model
///////////////////////////////////////
// pull the schema and model constructors from mongoose
// here, we'll use destructuring syntax to accomplish this
const { Schema, model } = mongoose

const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}

// make a user schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: "Email address is required",
        validate: [validateEmail, "Please fill a valid email address"],
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please fill a valid email address",
        ],
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    birthdate: {
        type: Date,
        required: true,
        trim: true
    }
})

// make a user model with the userSchema
const User = model('User', userSchema)


///////////////////////////////////////
// export our user model
///////////////////////////////////////
module.exports = User