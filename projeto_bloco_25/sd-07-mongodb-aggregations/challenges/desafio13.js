db.trips.aggregate([
  {
    $match: {
      startTime: {
        $gte: ISODate("2016-03-10"),
        $lt: ISODate("2016-03-11"),
      },
    },
  },
  {
    $addFields: {
      duration: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 1000 * 60],
      },
    },
  },
  {
    $group: {
      durationAvg: {
        $avg: "$duration",
      },
      _id: null,
    },
  },
  {
    $project: {
      duracaoMediaEmMinutos: { $ceil: "$durationAvg" },
      _id: 0,
    },
  },
]);
