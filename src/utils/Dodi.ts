import * as _ from 'lodash';
import { IUserProfile } from "../lib/accounts/accounts.interface";
import Cookies from 'js-cookie';

export default class Dodi {
    private static _dodi = new Dodi();

    private user : IUserProfile = null as any;
    private location: string = null as any;

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

    setLocation (userLocation: string) {
        Cookies.set('location', userLocation, { expires: 7, path: '/'});
        this.location = userLocation;
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
        let location = this._dodi.location;
        if (!location) {
            location = Cookies.get('location');    
            this._dodi.location = location;
        }
        return location;
    }
}