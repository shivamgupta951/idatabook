const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "Personal"
    },
    date: {
        type: Date,
        default: Date.now
    },
});

// ✅ FIX: Export as a Mongoose model (not just schema)
module.exports = mongoose.model('note', NoteSchema);
