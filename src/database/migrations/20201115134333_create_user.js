
exports.up = function(knex) {
  return knex.schema.createTable('user', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('dob').notNullable();
    table.string('gender').notNullable();
    table.string('city').notNullable();
    table.string('state').notNullable();
    table.string('interests').notNullable();
    table.string('friends').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('user');
};
