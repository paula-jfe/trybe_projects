db.trips.aggregate([
  {
    $addFields: {
      duration: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60 * 60],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      durationAvg: {
        $avg: "$duration",
      },
    },
  },
  {
    $project: {
      _id: 0, tipo: "$_id", duracaoMedia: { $round: ["$durationAvg", 2] },
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
]);
