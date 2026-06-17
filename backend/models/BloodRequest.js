const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",
    },

    donor: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",
    },

    patientName: String,

    hospitalName: String,

    bloodGroup: String,

    status: {
      type: String,

      default: "pending",
    },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);
