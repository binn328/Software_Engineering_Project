/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "1wvkdkvummfuqzg",
    "created": "2023-11-20 08:39:59.398Z",
    "updated": "2023-11-20 08:39:59.398Z",
    "name": "Grade",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "0hqndchg",
        "name": "owner",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("1wvkdkvummfuqzg");

  return dao.deleteCollection(collection);
})
