/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6s56ie7ggqljkzv")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ctd1vwfx",
    "name": "bg_color",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6s56ie7ggqljkzv")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ctd1vwfx",
    "name": "bgColor",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
