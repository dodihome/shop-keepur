export interface IUserProfile {
    id: string,
    displayName: string,
    systemRoles: string[],
};

export interface LoginResult {
    error?: Error,
    token?: string,
    user?: IUserProfile
};