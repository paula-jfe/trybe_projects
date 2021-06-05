db.produtos.updateMany({ valoresNutricionais: {
  $elemMatch: { tipo: "sódio", percentual: { $gte: 40 } } } }, { $addToSet: { tags: "muito sódio" } });
db.produtos.find({}, { nome: 1, tags: 1, _id: 0 });
