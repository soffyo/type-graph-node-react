import { Configuration } from "webpack"
import { merge } from "webpack-merge"
import { server$common } from "./webpack.common"
import { resolve } from "path"

const server$dev: Configuration = {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        path: resolve('./build/dev/server/'),
    }
}

export default merge(server$common, server$dev)