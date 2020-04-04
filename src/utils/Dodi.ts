import * as _ from 'lodash';
import { IUserProfile } from "../lib/accounts/accounts.interface";
import Cookies from 'js-cookie';

export default class Dodi {
    private static _dodi = new Dodi();

    private user : IUserProfile = null as any;
    private constructor () {
    }

    static user () : IUserProfile {
        return this._dodi.user;
    }

    static userId () : string {
        return (this._dodi.user? this._dodi.user.id : null as any);
    }

    static getInstance () : Dodi {
        return this._dodi;
    }

    setUser (user: IUserProfile) : void {
        this.user = user;
    }

    static isSysAdmin (user? : IUserProfile) : boolean {
        if (!user) {
            user = Dodi.user();
        }

        if (!user) {
            return false;
        }

        return (_.indexOf(user.systemRoles, 'admin') >= 0);
    }

    static location () : string {
        const location = Cookies.get('location');    
        return location;        
    }
}