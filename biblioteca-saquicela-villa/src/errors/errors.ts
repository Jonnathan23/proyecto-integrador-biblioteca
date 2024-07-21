export class ErrorShortPassword extends Error {
    override name: string;

    constructor(message:string){
        super(message)
        this.name = 'ErrorShortPassword'
    }
}

export class NOT_FOUND_ERROR extends Error {
    override name: string;

    constructor(message:string){
        super(message)
        this.name = 'ErrorShortPassword'
    }
}