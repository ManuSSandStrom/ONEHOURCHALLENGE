export const getHealthStatus = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'OneHour Challenge API is running',
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
    },
  });
};
