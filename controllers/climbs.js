const knex = require("../db/knex.js");

module.exports = {
  showClimb: (req, res) => {
    knex('climbs')
    .where('id', req.params.id)
    .then((climb) => {
        knex('competitions')
        .where('id', climb[0].comp_id)
        .then((comp) => {
            res.render('climb', { climb: climb[0], comp: comp[0] });
        })
        .catch(error => {
            console.error(error);
        })
    })
    .catch(error => {
        console.error(error);
    })
  }
}