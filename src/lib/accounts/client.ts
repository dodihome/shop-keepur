import { LoginResult } from './accounts.interface';
import Cookies from 'js-cookie';
import Dodi from '../../utils/Dodi';

const bcrypt = require ('bcryptjs');
const saltRounds = 10;

const serverBaseUrl = '';
const Accounts = {
    login: (email: string, password: string, callback: Function) => {
        const uri = serverBaseUrl + '/api/accounts/login';
        const fn = async () => {
            const resRaw = await fetch (uri, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });
            const res = await resRaw.json() as LoginResult;

            if (res.token) {
                Cookies.set('session', res.token, { expires: 7, path: '/'});
            }
            callback (res.error, res.user);
        }
        fn();
    },

    logout: (callback: Function) => {
        /*
        const uri = serverBaseUrl + '/api/accounts/logout';
        const fn = async () => {
            const resRaw = await fetch (uri);
            const res = await resRaw.json();

            Cookies.remove('session', { path: '/' }) // removed!
            callback (res.error);
        }
        fn();
        */
       Dodi.getInstance().setUser(null as any);
       Cookies.remove('session', { path: '/' }) // removed!
       callback(null);
    },

    resume: async (token: string) => {

        const uri = serverBaseUrl + '/api/accounts/resume?token=' + token;
        console.log('Accounts.resume', uri);
        const resRaw = await fetch (uri);
        const res = await resRaw.json() as LoginResult;
        return {error: res.error, user: res.user};
    },

    signup: async (email: string, password: string) : Promise<LoginResult> => {
        const uri = serverBaseUrl + '/api/accounts/signup';
        const passwordHash = await bcrypt.hashSync(password, saltRounds);
        const res = await (await fetch(uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, passwordHash})
        })).json();

        if (res.token) {
            Cookies.set('session', res.token, { expires: 7, path: '/'});
        }
        return res;
    },

    verifyEmail : async (token: string) => {
        if (!token) {
            return {error: 'Invalid Token'};
        }

        const url = serverBaseUrl + '/api/accounts/verify-email?token=' + token;
        const res = await (await fetch (url)).json() as LoginResult;

        if (res.token) {
            Cookies.set('session', res.token, { expires: 7, path: '/'});
        }

        return res;
    },

    forgotPassword: async (email: string) => {
        if (!email) {
            return {error: 'Invalid Email'};
        }

        const url = serverBaseUrl + '/api/accounts/forgot-password?email=' + email;
        const res = await (await fetch (url)).json();
        return res;
    },

    resetPassword: async (token: string, newPassword: string) => {
        if (!token) {
            return {error: 'Invalid Token'};
        }
        if (!newPassword) {
            return {error: 'New Password Cannot Be Empty'};
        }

        const url = serverBaseUrl + '/api/accounts/reset-password';
        const passwordHash = bcrypt.hashSync(newPassword, saltRounds);
        const res = await (await fetch (url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token, passwordHash})
        })).json() as LoginResult;

        if (res.token) {
            Cookies.set('session', res.token, { expires: 7, path: '/'});
        }

        return res;
    },

    enrollUsers: (emails: string, callback: Function) => {
        if (!emails || emails.length === 0) {
            callback (new Error('Email address(es) required'));
        }

        const url = serverBaseUrl + '/api/accounts/enroll-users';
        const fn = async () => {
            const res = await (await fetch (url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({emails})
            })).json();
            const { error } = res;
            callback (error, null);
        }
        fn ();
    }
}

export default Accounts;