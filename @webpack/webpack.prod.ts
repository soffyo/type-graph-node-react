import { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import { resolve } from 'path'
import { server$common, client$common } from './webpack.common'

const server$prod: Configuration = {
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: resolve('./build/prod/server/'),
    }
}

const client$prod: Configuration = {
    entry: {
        client: resolve('./source/client/index.tsx')
    },
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    output: {
        filename: '[name].js',
        path: resolve('./build/prod/client/'),
        clean: true
    }
}

export default [
    merge(server$common, server$prod), 
    merge(client$common, client$prod)
]
