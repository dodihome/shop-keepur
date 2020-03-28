import { UserProfile } from "../lib/accounts/accounts.interface";

export default class Dodi {
    private static _dodi = new Dodi();

    private user : UserProfile = null as any;
    private constructor () {
    }

    static user () : UserProfile {
        return this._dodi.user;
    }

    static userId () : string {
        return (this._dodi.user? this._dodi.user.id : null as any);
    }

    static getInstance () : Dodi {
        return this._dodi;
    }

    setUser (user: UserProfile) : void {
        this.user = user;
    }
}