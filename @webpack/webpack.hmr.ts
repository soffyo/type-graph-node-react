import webpack, { Configuration, Compiler, HotModuleReplacementPlugin, NoEmitOnErrorsPlugin} from "webpack"
import webpackDevMiddleware from "webpack-dev-middleware"
import webpackHotMiddleware from "webpack-hot-middleware"
import { merge } from "webpack-merge"
import { client$common } from "./webpack.common"
import { resolve } from "path"

const client$hmr: Configuration = {
    mode: 'development',
    entry: ['webpack-hot-middleware/client', resolve('./source/client/index.tsx')],
    plugins: [
        new HotModuleReplacementPlugin(),
        new NoEmitOnErrorsPlugin(),
    ]
}

const config: Configuration = merge(client$common, client$hmr)

const compiler: Compiler = webpack(config)

const webpackHMR = [
    webpackDevMiddleware(compiler),
    webpackHotMiddleware(compiler)
]

export default [...webpackHMR]

