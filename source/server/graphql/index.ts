import "reflect-metadata"
import { Router } from "express"
import { buildSchema } from "type-graphql"
import { graphqlHTTP } from "express-graphql"
import { NoSchemaIntrospectionCustomRule } from "graphql"
import { TestResolver } from "./tests"
import { resolve } from "path"

const router = Router()

async function init() {
    const schema = await buildSchema({
        resolvers: [TestResolver],
        emitSchemaFile: resolve("./source/server/graphql/schema.graphql")
    })

    //const validationRules = process.env.NODE_ENV == "production" && [NoSchemaIntrospectionCustomRule]

    router.use(graphqlHTTP(req => {
        return {
            schema, 
            graphiql: process.env.NODE_ENV == "development",
            //validationRules
        } 
    }))
}

init()

export default router
