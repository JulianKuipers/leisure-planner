var express = require('express');
var router = express.Router();
var settings = require('../server/models/Settings');

/* GET api routes version 1*/
router.get('/', function(req, res, next) {
  res.send('General API node');
});

/* GET api routes regarding settings */
router.get('/settings/:key', function(req, res, next) {
  if (req.params.hasOwnProperty("key") && typeof(req.params.key) === 'string') {
    console.info("Request passed");
    next();
  } else {
    console.error("Request is invalid! Setting is not found!");
    res.status(400).send({ error: "Setting not found" });
  }
});

/* Next on route '/settings/{key}' for get and put/update */
router.route('/settings/:key')
  .get(function(req, res){
    settings
      .getSettingByKey(req.params.key)
      .then(setting => res.status(200).send(setting))
      .catch(error => res.status(404).send({ error: error.message }));
  })
  .put(function(req, res) {
    let key = req.params.key;
    const { value } = req.body;
    if (value) {
      settings
        .updateSetting(key, value)
        .then(result => res.status(200).send(result))
        .catch(error => res.status(404).send({ error: error.message }));
    } else {
      res.status(400).send({
        error: "The payload is wrong!"
      });
    }
  });

/* Route for creating a setting */
router.post(
  "/settings",
  (req, res, next) => {
    const { key, value } = req.body;
    console.log(req.body);
    if (key && value) {
      next();
    } else {
      res.status(400).send({
        error: "The payload is wrong!"
      });
    }
  },
  (req, res) => {
    settings
      .createSetting(req.body.key, req.body.value)
      .then(createdSetting => res.status(201).send(createdSetting))
      .catch(error =>
        res.status(500).send({ error: `Unable to insert the setting: ${error}`})
      );
  }
);

/* Route for getting all settings */
router.get("/settings", (req, res, next) => {
  settings
    .getAllSettings()
    .then(settings => res.status(200).send(settings))
    .catch(error =>
      res.status(500).send({ error: error})
    );
});

module.exports = router;
