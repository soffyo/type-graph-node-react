import { Arg, Query, Resolver } from "type-graphql"

@Resolver() 
export class TestResolver {
    @Query(returns => String)
    argTest(@Arg("arg", { nullable: true }) arg?: string) {
        if (!arg) {
            return "Test OK. No argument has been passed"
        }

        return `Test OK. You passed the following argument: ${arg}`
    }
}

