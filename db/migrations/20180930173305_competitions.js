
exports.up = function(knex, Promise) {
    return knex.schema.createTable("competitions",(table)=>{
        table.increments(); //ID
        table.string("comp_name");
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("competitions");
};