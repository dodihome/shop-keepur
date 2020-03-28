export interface UserProfile {
    id: string,
    displayName: string
};

export interface LoginResult {
    error?: Error,
    token?: string,
    user?: UserProfile
};