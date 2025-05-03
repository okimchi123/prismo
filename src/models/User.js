const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        firstname: {
            type: String,
            required: [true, "Please enter your first name"],
        },
        lastname: {
            type: String,
            required: [true, "Please enter your last name"],
        },
        email: {
            type: String, 
            unique: true,
            required: [true, "Please enter your email"],
        },
        password: {
            type: String,
            required: [true, "Please enter your password"],
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;