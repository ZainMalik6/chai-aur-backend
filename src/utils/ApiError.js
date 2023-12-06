class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ){
        // override kr diya
        super(message)
        this.statusCode = statusCode
        this.data = null // data feild ko null kr diya jata hai is k bare me thora or parna
        this.message = message,
        this.success = false;
        this.errors = errors


        if(stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}