const express = require("express");

const router = express.Router();

const {
  createRequest,
  getDonorRequests,
  updateRequestStatus,
  getRecipientRequests,
  getDonors,
} = require("../controllers/requestController");

// CREATE REQUEST

router.post("/create", createRequest);

// GET DONORS

router.get("/donors", getDonors);

// GET DONOR REQUESTS

router.get("/donor/:id", getDonorRequests);

// UPDATE STATUS

router.put("/:id", updateRequestStatus);

// RECIPIENT HISTORY

router.get("/recipient/:id", getRecipientRequests);

module.exports = router;
