import { Router, static as serve } from "express"
import { resolve } from "path"

const router = Router()

void (async function initialize() {    
    if (process.env.NODE_ENV == "development") {
        const { default: webpackHMR } = await import("@webpack/webpack.hmr")

        const { default: historyApiFallback } = await import("connect-history-api-fallback")

        router.use(webpackHMR)
        
        router.use(historyApiFallback({ disableDotRule: true }))

        router.use(webpackHMR)
    } else {
        router.use(serve(resolve('./build/prod/client')))

        router.get('*', (req, res) => res.sendFile(resolve('./build/prod/client/index.html')))
    }
})()

export default router