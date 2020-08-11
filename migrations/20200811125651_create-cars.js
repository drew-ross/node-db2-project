
exports.up = function (knex) {
  return knex.schema.createTable('cars', table => {
    table.increments('id');
    table.string('vin', 17)
      .notNullable()
      .unique();
    table.string('make', 64)
      .notNullable();
    table.string('model', 128)
      .notNullable();
    table.float('mileage', 9, 2)
      .notNullable();
    table.string('transmission', 64);
    table.string('title_status', 64);
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars');
};
