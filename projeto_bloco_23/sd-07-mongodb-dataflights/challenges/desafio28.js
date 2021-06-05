db.resumoVoos.insertOne({
  empresa: "LATAM AIRLINES BRASIL",
  totalVoosDomesticos: db.voos.countDocuments({
    natureza: "Doméstica",
    "empresa.nome": "LATAM AIRLINES BRASIL",
  }),
});

db.resumoVoos.findOne({ empresa: "LATAM AIRLINES BRASIL" }, { empresa: 1, totalVoosDomesticos: 1, _id: 0 });
