/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6s56ie7ggqljkzv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7vgbs8nl",
    "name": "start_date",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fs2szr36",
    "name": "end_date",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ibn8hv01",
    "name": "location",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 100,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "euutoqlt",
    "name": "schedule_name",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 40,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "evk8r1ik",
    "name": "importance_level",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 3,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ailkxzk2",
    "name": "repeat",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6s56ie7ggqljkzv")

  // remove
  collection.schema.removeField("7vgbs8nl")

  // remove
  collection.schema.removeField("fs2szr36")

  // remove
  collection.schema.removeField("ibn8hv01")

  // remove
  collection.schema.removeField("euutoqlt")

  // remove
  collection.schema.removeField("evk8r1ik")

  // remove
  collection.schema.removeField("ailkxzk2")

  return dao.saveCollection(collection)
})
