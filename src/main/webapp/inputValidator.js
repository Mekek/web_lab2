export default class inputValidator{
    constructor(responseCode, message) {
        this.responseCode = responseCode;
        this.message = message;
    }
    validate(xVal, yVal, rVal, send_type) {
        if (!(-5 <= xVal && xVal <= 3)){
            this.message = "The X value should be between -5 and 3";
            this.responseCode = 0;
        } else if (![-4, -3, -2, -1, 0, 1, 2, 3, 4].includes(yVal) && send_type == "form") {
            this.message = "The Y value should be from this array: [-4, -3, -2, -1, 0, 1, 2, 3, 4]";
            this.responseCode = 0;
        } else if (!(-4 <= yVal && yVal <= 4) && send_type == "click") {
            this.message = "The Y value should be between -4 and 4";
            this.responseCode = 0;
        } else if (!(2 <= rVal && rVal <= 5)){
            this.message = "The R value should be between 2 and 5";
            this.responseCode = 0;
        } else {
           this.responseCode = 1;
        }
    }

    validateR(rVal) {
        if (!(2 <= rVal && rVal <= 5)){
            this.message = "The R value should be between 2 and 5";
            this.responseCode = 0;
        } else {
            this.responseCode = 1;
        }
    }

    getResponseCode(){
        return this.responseCode;
    }
    getMessage(){
        return this.message;
    }
}