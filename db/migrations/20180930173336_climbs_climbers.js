
exports.up = function(knex, Promise) {
    return knex.schema.createTable("climbs_climbers",(table)=>{
        table.increments(); //ID
        table.integer("climb_id")
            .references('id')
            .inTable('climbs')
            .onDelete('CASCADE');
            table.integer("climber_id")
            .references('id')
            .inTable('climbers')
            .onDelete('CASCADE');
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("climbs_climbers");
};