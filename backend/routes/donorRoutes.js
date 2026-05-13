const express =
  require("express");

const router =
  express.Router();

const User =
  require("../models/User");

router.get(
  "/blood-group/:bloodGroup",

  async (req, res) => {
    try {
      const donors =
        await User.find({
          role: "donor",

          bloodGroup:
            req.params
              .bloodGroup,

          available: true,
        });

      res.json(donors);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

module.exports = router;