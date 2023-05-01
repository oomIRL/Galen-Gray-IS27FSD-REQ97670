const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffScheme = new Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true  
    },
    employeeid: {
        type: String,
        required: true  
    },
    position: {
        type: Number,
        required: true  
    },
    level: {
        type: Number,
        required: true  
    },
    lead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
        required: false  
    }
}, { timestamps: true  });

const Staff = mongoose.model('Staff', staffScheme);
module.exports = Staff;