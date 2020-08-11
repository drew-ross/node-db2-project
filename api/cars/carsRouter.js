const express = require('express');
const knex = require('knex');

const db = require('../../data/dbConfig');

const router = express.Router();

//Middleware

const checkCarExists = (req, res, next) => {
  db('cars')
    .where({ id: req.params.id })
    .then(car => {
      if (car.length > 0) {
        res.car = car;
        next();
      } else {
        res.status(404).json({ message: 'A car with that id was not found.' });
      }
    });
};

const requireProperties = (keys) => {
  return (req, res, next) => {
    const missing = [];
    keys.forEach(key => {
      if (!req.body.hasOwnProperty(key)) {
        missing.push(key);
      }
    });
    if (missing.length > 0) {
      res.status(400).json({ message: `Please include required properties: ${missing.toString()}` });
    } else {
      next();
    }
  };
};

//Endpoints

router.get('/', (req, res) => {
  db('cars')
    .then(cars => res.status(200).json(cars))
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'There was an issue getting cars.', error: error.message });
    });
});

router.get('/:id', checkCarExists, (req, res) => {
  res.status(200).json(res.car);
});

router.post('/', requireProperties(['vin', 'make', 'model', 'mileage']), (req, res) => {
  const newCar = req.body;
  db('cars')
    .insert(newCar)
    .returning("id")
    .then(ids => {
      res.status(201).json({ inserted: ids });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'There was an issue adding a new car.', error: error.message });
    });
});

router.put('/:id', checkCarExists, (req, res) => {
  const changes = req.body;
  const carId = req.params.id;

  db('cars')
    .where({ id: carId })
    .update(changes)
    .then(success => {
      if (success) {
        res.status(200).json({ message: 'Updated car successfully.' });
      } else {
        res.status(404).json({ message: `An car was not found with id = ${carId}` });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'There was an issue editing the car.', error: error.message });
    });
});

router.delete('/:id', checkCarExists, (req, res) => {
  const carId = req.params.id;
  db('cars')
    .where({ id: carId })
    .del()
    .then(success => res.status(204).end())
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'There was an issue deleting the car.', error: error.message });
    });
});

module.exports = router;