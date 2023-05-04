const { mongoose } = require("mongoose");

const reportSchema = mongoose.Schema({
  year: {
    type: String,
    required: true,
  },
  petroleum_product: {
    type: String,
    required: true,
  },
  sale: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("petroliumReport", reportSchema);
