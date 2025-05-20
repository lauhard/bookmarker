import { betterAuth } from "better-auth";
import { Pool } from 'pg'
import { env } from "$env/dynamic/private";
import { PostgresDialect } from "kysely";

const dialect = new PostgresDialect({
    pool: new Pool({
        connectionString: env.DATABASE_URL,
    })
})

export const auth = betterAuth({
    //...
    secret: env.BETTER_AUTH_SECRET,
    url: env.BETTER_AUTH_URL,
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

