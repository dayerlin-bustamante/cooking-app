// modelo de datos de usuario
export class User {
    constructor(public email: string, public id: string, private _token: string, private _tokenExpireDate: Date){

    }

    get token(){
        if(!this._tokenExpireDate || new Date() > this._tokenExpireDate){
            return null;
        }

        return this._token
    }
}