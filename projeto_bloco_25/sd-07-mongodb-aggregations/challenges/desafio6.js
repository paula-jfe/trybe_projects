db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /^won \d oscar/i },
    },
  },
  {
    $group: {
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      media_rating_avg: { $avg: "$imdb.rating" },
      desvio_padrao_stdDev: { $stdDevSamp: "$imdb.rating" },
      _id: null,
    },
  },
  {
    $project: {
      maior_rating: 1,
      menor_rating: 1,
      media_rating: { $round: ["$media_rating_avg", 1] },
      desvio_padrao: { $round: ["$desvio_padrao_stdDev", 1] },
      _id: 0,
    },
  },
]);
