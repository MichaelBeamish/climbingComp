const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION
  index: (req, res) => {
    res.render('index');
  },

  showComps: (req, res) => {
    knex('competitions')
    .then((results) => {
      res.render('competitions', { competitions: results });
    })
    .catch(error => {
      console.error(error);
    })
  },

  showCompClimbs: (req, res) => {
    knex('competitions')
    .where('id', req.params.id)
    .then((comp) => {
      knex('climbs')
      .orderBy('order_id')
      .where('comp_id', req.params.id)
      .then((climbs) => {
        res.render('compClimbs', { comp: comp[0], climbs: climbs });
      })
      .catch(error => {
        console.error(error);
      })
    })
    .catch(error => {
      console.error(error);
    })
  },

  showCompClimbers: (req, res) => {
    knex('competitions')
    .where('id', req.params.id)
    .then((comp) => {
      knex('climbers')
      .where('comp_id', req.params.id)
      .then((climbers) => {
        res.render('compClimbers', { comp: comp[0], climbers: climbers });
      })
      .catch(error => {
        console.error(error);
      })
    })
    .catch(error => {
      console.error(error);
    })
  },

  postComps: (req, res) => {
    knex('competitions').insert({
      comp_name: req.body.comp_name
    }, '*')
    .then((newComp) => {

      //CREATE CLIMBS OBJECT
      let climbsToAdd = [];
      let points = 5;
      let category = 'Novice';
      let categoryCode = 'N';
      let climbNumber = 1;
      let orderID = 1;
      for(let c = 0; c < 48; c++){
        climbsToAdd.push({
          climb_name: `${categoryCode}${climbNumber}`,
          climb_category: `${category}`,
          red_points: points,
          flash_points: points + 5,
          comp_id: newComp[0].id,
          order_id: orderID
        });
        points+=10;
        climbNumber++;
        orderID++;
        if(c === 11){
          category = 'Intermediate';
          categoryCode = 'I';
        }
        if(c === 23){
          category = 'Advanced';
          categoryCode = 'A';
        }
        if(c === 35){
          category = 'Open';
          categoryCode = 'O';
        }
        if(climbNumber === 13){
          climbNumber = 1;
        } 
      }

      console.log(climbsToAdd);

      //INSERT CLIMBS OBJECT
      for(let i = 0; i < climbsToAdd.length; i++){
        knex('climbs').insert(climbsToAdd[i])
        .then(() => {
          if(i === climbsToAdd.length - 1){
            res.redirect(`/competitions/climbs/${newComp[0].id}`);
          }
        })
        .catch(error => {
          console.error(error);
        })
      }
    })
    .catch(error => {
      console.error(error);
    })
  },

  create: (req, res) => {
    knex('exampleTable').insert({
      name: req.body.name,
      age: req.body.age
    }, '*')
    .then((results) => {
      res.redirect('/');
    })
    .catch(error => {
      console.error(error);
    })
  },

  show: (req, res) => {
    knex('exampleTable').where('id', req.params.id)
    .then((results1) => {
      knex('otherTable').where('example_id', req.params.id)
      .then((results2) => {
        res.render('index', {key1: results1[0], key2: results2});
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
