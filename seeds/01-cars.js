
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { vin: '123456789ABCDEFGH', make: 'Honda', model: 'Civic', mileage: 84935.4, transmission: 'Automatic', title_status: 'Clean' },
        { vin: 'SFDS09809VJLS3511', make: 'Ford', model: 'Mustang', mileage: 103432.2},
      ]);
    });
};
