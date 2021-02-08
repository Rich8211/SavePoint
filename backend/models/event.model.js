mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    partyName: {type: String, required:true},
    distance:{type:Number, required:true},
    cost:{type:Number, required:true},
    city:{type: String, required:true},
    state:{type: String, required:true},
    zip:{type: Number, required:true},
    location: {type: String, required: true},
    description: {type: String, required: true}

})

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;