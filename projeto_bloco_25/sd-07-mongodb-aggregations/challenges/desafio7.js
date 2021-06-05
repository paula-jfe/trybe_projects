db.movies.aggregate([
  {
    $match: {
      languages: "English",
    },
  },
  { $unwind: "$cast" },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $sum: 1 },
      avg_rating: { $avg: "$imdb.rating" },
    },
  },
  {
    $project: {
      numeroFilmes: 1,
      mediaIMDB: { $round: ["$avg_rating", 1] },
      _id: 1,
    },
  },
  { $sort: { numeroFilmes: -1, _id: -1 } },
]);
