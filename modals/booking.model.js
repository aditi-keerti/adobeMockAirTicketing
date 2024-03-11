const mongoose=require('mongoose');

const bookingSchema=mongoose.Schema({
    user : { type: ObjectId, ref: 'User' },
    flight : { type: ObjectId, ref: 'Flight' }
},{
    versionKey:false,
})

const BookingModel=mongoose.model('booking',bookingSchema);
module.exports={BookingModel}