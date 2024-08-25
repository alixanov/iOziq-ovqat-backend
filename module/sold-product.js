const { Schema, model } = require("mongoose")
const SoldProductSchema = new Schema({
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
          type: Number,
          required: true,
     },
     saleDate: {
          type: Date,
          default: Date.now,
     },
});

module.exports = model("SoldProduct", SoldProductSchema);
