function Errors() {
    this._errors = {};
}

Errors.prototype.get = function(eventName) {
    return this._errors[eventName];
};

Errors.prototype.add = function(eventName, error) {
    var errorArr = this._errors[eventName];
    if (errorArr)
        errorArr.push(error);
    else {
        this._errors[eventName] = [error];   
    }
};

Errors.prototype.clear = function(eventName) {
    var errorArr = this._errors[eventName];
    if (errorArr) {
        while(errorArr.length > 0) {
            errorArr.pop();
        }
        delete this._errors[eventName];
    }
};

module.exports = Errors;