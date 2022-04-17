import express from "express"
import graphql from "./graphql"
import home from "./routes/home"

const app = express()
const port = 3000

async function useCompression() {
    if (process.env.NODE_ENV == "production") {
        const { default: compression } = await import("compression")

        app.use(compression)
    }
}

useCompression()

app.use('/graphql', graphql)
app.use('/', home)

app.listen(port, () => {
    console.log(`Server listening on ${port}...`)
})