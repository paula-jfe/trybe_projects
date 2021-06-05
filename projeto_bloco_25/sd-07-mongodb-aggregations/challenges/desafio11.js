db.trips.aggregate([
  {
    $addFields: {
      weekDay: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: "$weekDay",
      countWeekDays: { $sum: 1 },
    },
  },
  {
    $project: {
      diaDaSemana: "$_id",
      total: "$countWeekDays",
      _id: 0,
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  {
    $limit: 1,
  },
]);
