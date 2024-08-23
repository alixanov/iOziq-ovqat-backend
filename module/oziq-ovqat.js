const { Schema, model } = require("mongoose")
const OziqOvqat = new Schema({
 
     nomi: {
          type: String,
          required: true,
     },
     kelgannarxi: {
          type: String,
          required: true,
     },
     sotishnarxi: {
          type: String,
          required: true,
     },
     soni: {
          type: String,
          required: true,
     },
     barcode: {
          type:Number,
          required: true,
     },
})
module.exports = model("OziqOvqat", OziqOvqat)
