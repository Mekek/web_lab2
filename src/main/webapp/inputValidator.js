export default class inputValidator{
    constructor(responseCode, message) {
        this.responseCode = responseCode;
        this.message = message;
    }
    validate(xVal, yVal, rVal, send_type) {
        if (![-3, -2, -1, 0, 1, 2, 3, 4, 5].includes(xVal) && send_type == "form"){
            this.message = "The X value should be from this array: [-3, -2, -1, 0, 1, 2, 3, 4, 5]";
            this.responseCode = 0;
        } else if (!(-3 <= xVal && xVal <= 5) && send_type == "click") {
            this.message = "The X value should be between -3 and 5";
            this.responseCode = 0;
        } else if (!(-3 <= yVal && yVal <= 3)){
            this.message = "The Y value should be between -3 and 3";
            this.responseCode = 0;
        } else if (![1, 1.5, 2, 2.5, 3].includes(rVal) && send_type == "form"){
            this.message = "The R value should be from this array: [1, 1.5, 2, 2.5, 3]";
            this.responseCode = 0;
        } else {
           this.responseCode = 1;
        }
    }

    validateR(rVal) {
        if (![1, 1.5, 2, 2.5, 3].includes(rVal)){
            this.message = "The R value should be from this array: [1, 1.5, 2, 2.5, 3]";
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