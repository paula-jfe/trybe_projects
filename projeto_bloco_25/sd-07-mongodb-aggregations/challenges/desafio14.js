db.trips.aggregate([
  {
    $addFields: {
      duration: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      durationAvg: {
        $avg: "$duration",
      },
    },
  },
  {
    $project: {
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$durationAvg" },
      _id: 0,
    },
  },
  {
    $sort: { duracaoMedia: -1 },
  },
  {
    $limit: 5,
  },
]);
