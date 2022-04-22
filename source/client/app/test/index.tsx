import React from "react"
import { useGraphQL } from "use-graphql-ts"
import { TestDocument } from "@graphql/types"
import Input from "@components/input"
import Button from "@components/button"

export default function Test() {
    const [arg, setArg] = React.useState<string>("")

    const { data, loaded, errors, execute, reset } = useGraphQL({
        operation: TestDocument,
        passive: true,
        variables: { arg }
    })

    return (
        <div style={{textAlign:"center"}}>
            <div>
                <span>
                    Loaded: <b>{loaded ? <span style={{color:"green"}}>YES</span> : "NO"}</b>
                </span>
            </div>
            {loaded && (<>
                <div>
                    <span>
                        Response: <b>{loaded ? data.argTest : ""}</b>
                    </span>
                </div>
                <div>
                    <span>
                        Errors: <b>{loaded ? errors ? errors.map(e => e.message) : "No errors found" : ""}</b>
                    </span>
                </div>
            </>)}
            <Input type="text" value={arg} onChange={({ target }) => setArg(target.value)}>
                Arguments:
            </Input>
            <div>
                <span>
                    click the button below to test if your GraphQL endpoint is working.
                </span>
            </div>
            <div>
                <Button onClick={() => execute()}>
                    TEST
                </Button>
                <Button onClick={() => {reset(); setArg("")}}>
                    CLEAR
                </Button>
            </div>
        </div>
    )
}