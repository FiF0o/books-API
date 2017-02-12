/**
 * Created by jonlazarini on 11/02/17.
 */
module.exports = function(res, req, next) {
    console.log('MW FIRED!')
    next()
}