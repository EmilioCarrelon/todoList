'use strict';

module.exports = function(Todo) {
  Todo.beforeRemote('create', function(context, user, next) {



    context.args.data.usuarioId = context.req.accessToken.userId;
    var Completa = new Date();
    var fechaActual = Completa.getFullYear() + "-" + Completa.getMonth() + "-" + Completa.getDate();

    var fechaInser = context.args.data.fecha;

    if (fechaInser < fechaActual){
      next(new Error("No es posible generar un evento pasado"));
    }else {
      next();
    }
  });
  /**
   * nos muestra los eventos pendientes del usuario autenticado
   * @param {Function(Error, array)} callback
   */

  Todo.eventosPendientes = function(user,callback) {

    var pendientes;
    Todo.find({where: {and:[{isComplete:false},{usuarioId:user}]}},function (err,pendientes) {
      callback(null, pendientes);
    });

  };

};
