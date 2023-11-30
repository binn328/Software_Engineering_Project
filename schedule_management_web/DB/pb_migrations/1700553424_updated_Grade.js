/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1wvkdkvummfuqzg")

  collection.listRule = " @request.method = \"GET\" && @request.auth.id = \"\""
  collection.viewRule = " @request.method = \"GET\" && @request.auth.id = \"\""
  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1wvkdkvummfuqzg")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null

  return dao.saveCollection(collection)
})
