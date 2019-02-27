'use strict';

module.exports = function(app) {
  if (process.env.AUTOMIGRATE) {
    app.dataSources.mysqlDS.automigrate(null, function(er) {
      if (er) throw er;
      console.log('Loopback tables created in ', app.dataSources.mysqlDS.adapter.name);

        });
    }
  };
