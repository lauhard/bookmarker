import { betterAuth } from "better-auth";
import { Pool } from 'pg'
import { DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL } from "$env/static/private";
import { PostgresDialect } from "kysely";

const dialect = new PostgresDialect({
    pool: new Pool({
        connectionString: DATABASE_URL,
    })
})

export const auth = betterAuth({
    //...
    trustedOrigins: [
        "https://bookmarker.alau.at",
        "http://bookmarker.alau.at",
        "bookmarker.alau.at",
        "*alau.at",
        "https://*.alau.at",
        "localhost:3000"
    ],
    secret: BETTER_AUTH_SECRET,
    url: BETTER_AUTH_URL,
    database: {
        dialect,
        type: 'postgres',
        search_path: 'bookmarker',
    },

    emailAndPassword: {
        enabled: true,
        //requireEmailVerification: true
    },

    plugins: [

    ]
    //socialProviders: {
    //    github: {
    //        clientId: process.env.GITHUB_CLIENT_ID as string,
    //        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    //    },
    //},

})

