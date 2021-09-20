var express = require('express');
var router = express.Router();
var Country = require('../models/Country');
var State = require('../models/State');

// Get  states
router.get('/:id', (req, res, next) => {
  Country.findById(id, (err, country) => {
    if (err) return next(err);
    State.find({ country: country._id }, (err, states) => {
      if (err) return next(err);
      res.status(200).json({ states });
    });
  });
});

// Adding a state
router.post('/:id', (req, res, next) => {
  var data = req.body;
  var countryId = req.params.id;
  State.create(data, (err, state) => {
    if (err) return next(err);
    Country.findByIdAndUpdate(
      countryId,
      { $push: { states: state._id } },
      (err, country) => {
        res.status(200).json({ state });
      }
    );
  });
});

//

module.exports = router;
