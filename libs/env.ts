const env = {
    apiUrl: process.env.NEXT_PUBLIC_BASE_URL as string,
    authUrl: process.env.NEXTAUTH_URL as string,

    github: {
        clientId: getOsEnv('GITHUB_CLIENT_ID'),
        clientSecret: getOsEnv('GITHUB_CLIENT_SECRET'),
    },

    db: {
        uri: process.env.MONGOOSE_URI as string,
    },
};

export default env;

export function getOsEnv(key: string): string {
    // if (typeof process.env[key] === 'undefined') {
    //     throw new Error(`Environment variable ${key} is not set.`);
    // }

    return process.env[key] as string;
}

export function getOsEnvOptional(key: string): string | undefined {
    return process.env[key];
}

export function toNumber(value: string): number {
    return parseInt(value, 10);
}
