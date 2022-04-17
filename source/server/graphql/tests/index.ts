import { Arg, Query, Resolver } from "type-graphql"

@Resolver() 
export class TestResolver {
    @Query(returns => String)
    argTest(@Arg("arg", { nullable: true }) arg?: string) {
        if (!arg) {
            return "TEST OK. NO ARGS PASSED"
        }

        return `TEST OK. FOLLOWING ARGS PASSED: ${arg}`
    }
}

