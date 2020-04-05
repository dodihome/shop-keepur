import * as _ from 'lodash';
import { IUserProfile } from "../lib/accounts/accounts.interface";
import Cookies from 'js-cookie';

function setTSCookie (cookieName: string) {
    var inTenMinutes = new Date(new Date().getTime() + 10 * 60 * 1000);
    const now = new Date();
    Cookies.set(cookieName, now.getTime().toString(), { expires: inTenMinutes, path: '/'});
}

function checkTS (cookieName: string) {
    const lastTsCookie = Cookies.get(cookieName);
    if (lastTsCookie) {
        const lastTS = parseInt(lastTsCookie);
        const now = new Date();
        if ((now.getTime() - lastTS) < 1000) {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}

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

    setLoginPromptTS () {
        setTSCookie('promptedLogin');
    }

    setAddStorePromptTS () {
        setTSCookie('promptedAddStore');
    }

    setClaimBizPromptTS () {
        setTSCookie('promptedClaimBiz');
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

    static showLoginPromptAgain() : boolean {
        return checkTS('promptedLogin');
    }

    static showAddStoreMsg () : boolean {
        return checkTS('promptedAddStore');
    }

    static showClaimBizMsg () : boolean {
        return checkTS ('promptedClaimBiz');
    }
}