
exports.up = function(knex, Promise) {
    return knex.schema.createTable("climbs",(table)=>{
        table.increments(); //ID
        table.string("climb_name");
        table.string("climb_category");
        table.integer("flash_points");
        table.integer("red_points");
        table.integer("comp_id") //Foreign Key
            .references('id')
            .inTable('competitions')
            .onDelete('CASCADE');
        table.integer("order_id");
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("climbs");
};
