import React from "react"
import { useGraphQL } from "use-graphql-ts"
import { TestDocument } from "source/client/common/graphql"

export default function Test() {
    const { data, loaded, execute } = useGraphQL({
        operation: TestDocument,
        passive: true
    })

    React.useEffect(() => {
        console.log(loaded)
        console.log(data)
    }, [data, loaded])

    return (
        <div>
            <div>
                <span>
                    LOADED: <>{loaded? "YES" : "NO"}</>
                </span>
            </div>
            <div>
                {loaded && data.users.map(item => <div key={item.email}>{item.role}</div>)}
            </div>
            <div>
                <button onClick={() => execute()}>
                    TEST
                </button>
            </div>
        </div>
    )
}