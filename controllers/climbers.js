const knex = require("../db/knex.js");

module.exports = {
  postClimber: (req, res) => {
    knex('climbers')
    .insert({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        comp_id: req.params.id
    }, '*')
    .then((newClimber) => {
        res.redirect(`/competitions/climbers/${req.params.id}`);
    })
    .catch(error => {
        console.error(error);
    })
  },

  showClimber: (req, res) => {
    knex('climbers')
    .where('id', req.params.id)
    .then((climber) => {
        knex('competitions')
        .where('id', climber[0].comp_id)
        .then((comp) => {
            res.render('climber', { climber: climber[0], comp: comp[0] });
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