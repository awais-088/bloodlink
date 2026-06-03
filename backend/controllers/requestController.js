const BloodRequest = require(
  "../models/BloodRequest"
);

const User = require(
  "../models/User"
);


// CREATE REQUEST

const createRequest = async (
  req,
  res
) => {
  try {
    const {
      recipient,
      donor,
      patientName,
      hospitalName,
      bloodGroup,
    } = req.body;

    const request =
      await BloodRequest.create({
        recipient,
        donor,
        patientName,
        hospitalName,
        bloodGroup,
        status:"pending",
      });
      const donorUser =
  await User.findById(donor);

if (donorUser?.pushToken) {
  await fetch(
    "https://exp.host/--/api/v2/push/send",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        to: donorUser.pushToken,
        title: "New Blood Request",
        body: `${patientName} needs blood`,
      }),
    }
  );
}

    res.status(201).json({
      message:
        "Blood request sent successfully",

      request,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET DONORS

const getDonors = async (
  req,
  res
) => {
  try {
    const donors =
      await User.find({
        role: "donor",
        available:true,
      }).select("-password");

    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET DONOR REQUESTS

const getDonorRequests =
  async (req, res) => {
    try {
      const requests =
        await BloodRequest.find({
          donor: req.params.id,
        })
          .populate(
            "recipient",
            "name email phone"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json(
        requests
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };


// UPDATE REQUEST STATUS

const updateRequestStatus =
  async (req, res) => {
    try {
      const request =
        await BloodRequest.findById(
          req.params.id
        );

      request.status =
        req.body.status;

      await request.save();
      

      res.status(200).json({
        message:
          "Request updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };


// GET RECIPIENT HISTORY

const getRecipientRequests =
  async (req, res) => {
    try {
      const requests =
        await BloodRequest.find({
          recipient:
            req.params.id,
        })
          .populate(
            "donor",
            "name bloodGroup city phone"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json(
        requests
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

module.exports = {
  createRequest,
  getDonors,
  getDonorRequests,
  updateRequestStatus,
  getRecipientRequests,
};