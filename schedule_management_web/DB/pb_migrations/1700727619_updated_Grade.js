/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1wvkdkvummfuqzg")

  collection.listRule = "owner.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1wvkdkvummfuqzg")

  collection.listRule = " @request.method = \"GET\" && @request.auth.id = \"\""

  return dao.saveCollection(collection)
})
