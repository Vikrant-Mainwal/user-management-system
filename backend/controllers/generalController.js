const getServerHealth = (req, res) => {
  const now = new Date();

  const formattedTime = now.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "UTC",
  });

  res.status(200).json({
    status: `${process.env.APPLICATION_NAME} is running successfully`,
    timestamp: formattedTime,
  });
};

export { getServerHealth };
