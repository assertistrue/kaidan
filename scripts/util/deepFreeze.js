class Util{

}
Util.deepFreeze = function(obj){
    if (typeof obj === 'object' && obj !== null) {
        Object.freeze(obj);
        Object.getOwnPropertyNames(obj).forEach(property => {
        Util.deepFreeze(obj[property]);
        });
    }
    return obj;
};


Object.freeze(Util);
Object.freeze(Util.deepFreeze);
module.exports = Util;
