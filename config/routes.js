//Update the name of the controller below and rename the file.
const competitions = require("../controllers/competitions.js")
const climbs = require("../controllers/climbs.js")
const climbers = require("../controllers/climbers.js")
module.exports = function(app){

  app.get('/', competitions.index);

  app.get('/competitions', competitions.showComps);

  app.get('/competitions/climbs/:id', competitions.showCompClimbs);

  app.get('/competitions/climbers/:id', competitions.showCompClimbers);
  
  app.post('/competitions', competitions.postComps);

  app.get('/climb/:id', climbs.showClimb);

  app.get('/climber/:id', climbers.showClimber);

  app.post('/comp/:id', climbers.postClimber);

}
