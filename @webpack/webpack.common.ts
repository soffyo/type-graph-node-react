import { Configuration } from 'webpack'
import { resolve } from 'path'
import NodeExternals from 'webpack-node-externals'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

export const server$common: Configuration = {
    entry: {
        server: resolve('./source/server/index.ts')
    },
    target: 'node',
    externals: [NodeExternals()],
    output: {
        filename: '[name].js',
        path: resolve('./build/server/'),
        clean: true
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    resolve: {
        plugins: [new TsConfigPathsPlugin()],
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
}

export const client$common: Configuration = {
    target: 'web',
    resolve: {
        plugins: [new TsConfigPathsPlugin()],
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)$/,
                loader: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: "html-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.graphql$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader'
              }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve('./source/client/index.html')
        })
    ],
}