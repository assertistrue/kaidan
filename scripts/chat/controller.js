class Controller{

    constructor(){
        console.log("in Controller.constructor()");
    }

    middlewareFn(socket, next){
        console.log(`middlewareFn:${socket}:${next}:`);
        next();
    }

}

module.exports = Controller;