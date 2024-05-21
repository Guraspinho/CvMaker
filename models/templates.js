const mongoose = require('mongoose');

const templateSchema = mongoose.Schema(
    {
        templateName:
        {
            type: String,
            required: [true, 'Please provide a name'],
            minlength: 2,
            maxlength:20
        },
    }
);

module.exports = mongoose.model('Template', templateSchema);