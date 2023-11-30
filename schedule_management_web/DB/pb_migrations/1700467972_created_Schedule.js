/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "6s56ie7ggqljkzv",
    "created": "2023-11-20 08:12:52.425Z",
    "updated": "2023-11-20 08:12:52.425Z",
    "name": "Schedule",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "gldxcnqj",
        "name": "owner",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
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
  const collection = dao.findCollectionByNameOrId("6s56ie7ggqljkzv");

  return dao.deleteCollection(collection);
})
