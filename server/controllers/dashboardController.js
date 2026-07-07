const {
  getDashboard,
} = require("../services/dashboardService");

const dashboard = async (req, res) => {
  try {
    const data = await getDashboard(req.user._id);

    res.json({
      success: true,

      ...data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

module.exports = {
  dashboard,
};