
exports.up = function(knex, Promise) {
    return knex.schema.createTable("climbers",(table)=>{
        table.increments(); //ID
        table.string("first_name");
        table.string("last_name");
        table.string("gender");
        table.integer("comp_id") //Foreign Key
            .references('id')
            .inTable('competitions')
            .onDelete('CASCADE');
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("climbers");  
};
