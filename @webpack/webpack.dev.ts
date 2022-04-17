import { Configuration } from "webpack"
import { merge } from "webpack-merge"
import { server$common } from "./webpack.common"

const server$dev: Configuration = {
    mode: 'development',
    devtool: 'inline-source-map',
}

export default merge(server$common, server$dev)