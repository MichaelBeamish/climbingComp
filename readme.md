## Node/Knex MVC Template

Get Started:
1. npm i
    a. npm i express ejs knex pg (if not already installed)
2. create database
3. point knexfile.js to database
4. create tables
    a. knex migrate:make tablename
    b. knex migrate:latest
    c. knex migrate:rollback
5. create seed data
    a. knex seed:make 01_tablename
    b. knex seed:run


TABLES:

    Climbers
        id
        first_name
        last_name
        gender
        timestamps
    
    Competitions
        id
        comp_name
        date
        timestamps

    Climbers_Competitions Join Table
        id
        climber_id references climbers.id
        comp_id references competitions.id
        timestamps

    Climbs
        id
        climb_name (eg: N5, A1, I10, O7)
        climb_category (eg: Novice, Intermediate, Advanced, Open)
        points
        comp_id (foreign-key - one to many?)
        timestamps