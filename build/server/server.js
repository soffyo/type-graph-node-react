/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./@webpack/webpack.common.ts":
/*!************************************!*\
  !*** ./@webpack/webpack.common.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.client$common = exports.server$common = void 0;
const path_1 = __webpack_require__(/*! path */ "path");
const webpack_node_externals_1 = __importDefault(__webpack_require__(/*! webpack-node-externals */ "webpack-node-externals"));
const html_webpack_plugin_1 = __importDefault(__webpack_require__(/*! html-webpack-plugin */ "html-webpack-plugin"));
const tsconfig_paths_webpack_plugin_1 = __importDefault(__webpack_require__(/*! tsconfig-paths-webpack-plugin */ "tsconfig-paths-webpack-plugin"));
exports.server$common = {
    entry: {
        server: (0, path_1.resolve)('./source/server/index.ts')
    },
    target: 'node',
    externals: [(0, webpack_node_externals_1.default)()],
    output: {
        filename: '[name].js',
        path: (0, path_1.resolve)('./build/server/'),
        clean: true
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    resolve: {
        plugins: [new tsconfig_paths_webpack_plugin_1.default()],
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
};
exports.client$common = {
    target: 'web',
    resolve: {
        plugins: [new tsconfig_paths_webpack_plugin_1.default()],
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
        new html_webpack_plugin_1.default({
            template: (0, path_1.resolve)('./source/client/index.html')
        })
    ],
};


/***/ }),

/***/ "./@webpack/webpack.hmr.ts":
/*!*********************************!*\
  !*** ./@webpack/webpack.hmr.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const webpack_1 = __importStar(__webpack_require__(/*! webpack */ "webpack"));
const webpack_dev_middleware_1 = __importDefault(__webpack_require__(/*! webpack-dev-middleware */ "webpack-dev-middleware"));
const webpack_hot_middleware_1 = __importDefault(__webpack_require__(/*! webpack-hot-middleware */ "webpack-hot-middleware"));
const webpack_merge_1 = __webpack_require__(/*! webpack-merge */ "webpack-merge");
const webpack_common_1 = __webpack_require__(/*! ./webpack.common */ "./@webpack/webpack.common.ts");
const path_1 = __webpack_require__(/*! path */ "path");
const client$hmr = {
    mode: 'development',
    entry: ['webpack-hot-middleware/client', (0, path_1.resolve)('./source/client/index.tsx')],
    plugins: [
        new webpack_1.HotModuleReplacementPlugin(),
        new webpack_1.NoEmitOnErrorsPlugin(),
    ]
};
const config = (0, webpack_merge_1.merge)(webpack_common_1.client$common, client$hmr);
const compiler = (0, webpack_1.default)(config);
const webpackHMR = [
    (0, webpack_dev_middleware_1.default)(compiler),
    (0, webpack_hot_middleware_1.default)(compiler)
];
exports["default"] = [...webpackHMR];


/***/ }),

/***/ "./source/server/graphql/index.ts":
/*!****************************************!*\
  !*** ./source/server/graphql/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const express_1 = __webpack_require__(/*! express */ "express");
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
const express_graphql_1 = __webpack_require__(/*! express-graphql */ "express-graphql");
const tests_1 = __webpack_require__(/*! ./tests */ "./source/server/graphql/tests/index.ts");
const path_1 = __webpack_require__(/*! path */ "path");
const router = (0, express_1.Router)();
async function init() {
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [tests_1.TestResolver],
        emitSchemaFile: (0, path_1.resolve)("./source/server/graphql/schema.graphql")
    });
    //const validationRules = process.env.NODE_ENV == "production" && [NoSchemaIntrospectionCustomRule]
    router.use((0, express_graphql_1.graphqlHTTP)(req => {
        return {
            schema,
            graphiql: "development" == "development",
            //validationRules
        };
    }));
}
init();
exports["default"] = router;


/***/ }),

/***/ "./source/server/graphql/tests/index.ts":
/*!**********************************************!*\
  !*** ./source/server/graphql/tests/index.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TestResolver = void 0;
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
let TestResolver = class TestResolver {
    argTest(arg) {
        if (!arg) {
            return "TEST OK. NO ARGS PASSED";
        }
        return `TEST OK. FOLLOWING ARG PASSED: ${arg}`;
    }
};
__decorate([
    (0, type_graphql_1.Query)(returns => String),
    __param(0, (0, type_graphql_1.Arg)("arg", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TestResolver.prototype, "argTest", null);
TestResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], TestResolver);
exports.TestResolver = TestResolver;


/***/ }),

/***/ "./source/server/index.ts":
/*!********************************!*\
  !*** ./source/server/index.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const graphql_1 = __importDefault(__webpack_require__(/*! ./graphql */ "./source/server/graphql/index.ts"));
const home_1 = __importDefault(__webpack_require__(/*! ./routes/home */ "./source/server/routes/home.ts"));
const app = (0, express_1.default)();
const port = 3000;
async function useCompression() {
    if (false) {}
}
useCompression();
app.use('/graphql', graphql_1.default);
app.use('/', home_1.default);
app.listen(port, () => {
    console.log(`Server listening on ${port}...`);
});


/***/ }),

/***/ "./source/server/routes/home.ts":
/*!**************************************!*\
  !*** ./source/server/routes/home.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __webpack_require__(/*! express */ "express");
const path_1 = __webpack_require__(/*! path */ "path");
const router = (0, express_1.Router)();
async function init() {
    if (true) {
        const { default: webpackHMR } = await Promise.resolve().then(() => __importStar(__webpack_require__(/*! @webpack/webpack.hmr */ "./@webpack/webpack.hmr.ts")));
        const { default: historyApiFallback } = await Promise.resolve().then(() => __importStar(__webpack_require__(/*! connect-history-api-fallback */ "connect-history-api-fallback")));
        router.use(webpackHMR);
        router.use(historyApiFallback({ disableDotRule: true }));
        router.use(webpackHMR);
    }
    else {}
}
init();
exports["default"] = router;


/***/ }),

/***/ "connect-history-api-fallback":
/*!***********************************************!*\
  !*** external "connect-history-api-fallback" ***!
  \***********************************************/
/***/ ((module) => {

module.exports = require("connect-history-api-fallback");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "express-graphql":
/*!**********************************!*\
  !*** external "express-graphql" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("express-graphql");

/***/ }),

/***/ "html-webpack-plugin":
/*!**************************************!*\
  !*** external "html-webpack-plugin" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("html-webpack-plugin");

/***/ }),

/***/ "reflect-metadata":
/*!***********************************!*\
  !*** external "reflect-metadata" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("reflect-metadata");

/***/ }),

/***/ "tsconfig-paths-webpack-plugin":
/*!************************************************!*\
  !*** external "tsconfig-paths-webpack-plugin" ***!
  \************************************************/
/***/ ((module) => {

module.exports = require("tsconfig-paths-webpack-plugin");

/***/ }),

/***/ "type-graphql":
/*!*******************************!*\
  !*** external "type-graphql" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("type-graphql");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("webpack");

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = require("webpack-dev-middleware");

/***/ }),

/***/ "webpack-hot-middleware":
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = require("webpack-hot-middleware");

/***/ }),

/***/ "webpack-merge":
/*!********************************!*\
  !*** external "webpack-merge" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("webpack-merge");

/***/ }),

/***/ "webpack-node-externals":
/*!*****************************************!*\
  !*** external "webpack-node-externals" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = require("webpack-node-externals");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./source/server/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7OztBQ0FBOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmxpc3Nsb2cvLi9Ad2VicGFjay93ZWJwYWNrLmNvbW1vbi50cyIsIndlYnBhY2s6Ly9ibGlzc2xvZy8uL0B3ZWJwYWNrL3dlYnBhY2suaG1yLnRzIiwid2VicGFjazovL2JsaXNzbG9nLy4vc291cmNlL3NlcnZlci9ncmFwaHFsL2luZGV4LnRzIiwid2VicGFjazovL2JsaXNzbG9nLy4vc291cmNlL3NlcnZlci9ncmFwaHFsL3Rlc3RzL2luZGV4LnRzIiwid2VicGFjazovL2JsaXNzbG9nLy4vc291cmNlL3NlcnZlci9pbmRleC50cyIsIndlYnBhY2s6Ly9ibGlzc2xvZy8uL3NvdXJjZS9zZXJ2ZXIvcm91dGVzL2hvbWUudHMiLCJ3ZWJwYWNrOi8vYmxpc3Nsb2cvZXh0ZXJuYWwgY29tbW9uanMgXCJjb25uZWN0LWhpc3RvcnktYXBpLWZhbGxiYWNrXCIiLCJ3ZWJwYWNrOi8vYmxpc3Nsb2cvZXh0ZXJuYWwgY29tbW9uanMgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vYmxpc3Nsb2cvZXh0ZXJuYWwgY29tbW9uanMgXCJleHByZXNzLWdyYXBocWxcIiIsIndlYnBhY2s6Ly9ibGlzc2xvZy9leHRlcm5hbCBjb21tb25qcyBcImh0bWwtd2VicGFjay1wbHVnaW5cIiIsIndlYnBhY2s6Ly9ibGlzc2xvZy9leHRlcm5hbCBjb21tb25qcyBcInJlZmxlY3QtbWV0YWRhdGFcIiIsIndlYnBhY2s6Ly9ibGlzc2xvZy9leHRlcm5hbCBjb21tb25qcyBcInRzY29uZmlnLXBhdGhzLXdlYnBhY2stcGx1Z2luXCIiLCJ3ZWJwYWNrOi8vYmxpc3Nsb2cvZXh0ZXJuYWwgY29tbW9uanMgXCJ0eXBlLWdyYXBocWxcIiIsIndlYnBhY2s6Ly9ibGlzc2xvZy9leHRlcm5hbCBjb21tb25qcyBcIndlYnBhY2tcIiIsIndlYnBhY2s6Ly9ibGlzc2xvZy9leHRlcm5hbCBjb21tb25qcyBcIndlYnBhY2stZGV2LW1pZGRsZXdhcmVcIiIsIndlYnBhY2s6Ly9ibGlzc2xvZy9leHRlcm5hbCBjb21tb25qcyBcIndlYnBhY2staG90LW1pZGRsZXdhcmVcIiIsIndlYnBhY2s6Ly9ibGlzc2xvZy9leHRlcm5hbCBjb21tb25qcyBcIndlYnBhY2stbWVyZ2VcIiIsIndlYnBhY2s6Ly9ibGlzc2xvZy9leHRlcm5hbCBjb21tb25qcyBcIndlYnBhY2stbm9kZS1leHRlcm5hbHNcIiIsIndlYnBhY2s6Ly9ibGlzc2xvZy9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwicGF0aFwiIiwid2VicGFjazovL2JsaXNzbG9nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JsaXNzbG9nL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmxpc3Nsb2cvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JsaXNzbG9nL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25maWd1cmF0aW9uIH0gZnJvbSAnd2VicGFjaydcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xuaW1wb3J0IE5vZGVFeHRlcm5hbHMgZnJvbSAnd2VicGFjay1ub2RlLWV4dGVybmFscydcbmltcG9ydCBIdG1sV2VicGFja1BsdWdpbiBmcm9tICdodG1sLXdlYnBhY2stcGx1Z2luJ1xuaW1wb3J0IFRzQ29uZmlnUGF0aHNQbHVnaW4gZnJvbSAndHNjb25maWctcGF0aHMtd2VicGFjay1wbHVnaW4nXG5cbmV4cG9ydCBjb25zdCBzZXJ2ZXIkY29tbW9uOiBDb25maWd1cmF0aW9uID0ge1xuICAgIGVudHJ5OiB7XG4gICAgICAgIHNlcnZlcjogcmVzb2x2ZSgnLi9zb3VyY2Uvc2VydmVyL2luZGV4LnRzJylcbiAgICB9LFxuICAgIHRhcmdldDogJ25vZGUnLFxuICAgIGV4dGVybmFsczogW05vZGVFeHRlcm5hbHMoKV0sXG4gICAgb3V0cHV0OiB7XG4gICAgICAgIGZpbGVuYW1lOiAnW25hbWVdLmpzJyxcbiAgICAgICAgcGF0aDogcmVzb2x2ZSgnLi9idWlsZC9zZXJ2ZXIvJyksXG4gICAgICAgIGNsZWFuOiB0cnVlXG4gICAgfSxcbiAgICBvcHRpbWl6YXRpb246IHtcbiAgICAgICAgc3BsaXRDaHVua3M6IHtcbiAgICAgICAgICAgIGNodW5rczogJ2FsbCdcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgICBwbHVnaW5zOiBbbmV3IFRzQ29uZmlnUGF0aHNQbHVnaW4oKV0sXG4gICAgICAgIGV4dGVuc2lvbnM6IFsnLnRzJywgJy5qcyddXG4gICAgfSxcbiAgICBtb2R1bGU6IHtcbiAgICAgICAgcnVsZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXN0OiAvXFwudHMkLyxcbiAgICAgICAgICAgICAgICBsb2FkZXI6ICd0cy1sb2FkZXInLFxuICAgICAgICAgICAgICAgIGV4Y2x1ZGU6IC9ub2RlX21vZHVsZXMvXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBjbGllbnQkY29tbW9uOiBDb25maWd1cmF0aW9uID0ge1xuICAgIHRhcmdldDogJ3dlYicsXG4gICAgcmVzb2x2ZToge1xuICAgICAgICBwbHVnaW5zOiBbbmV3IFRzQ29uZmlnUGF0aHNQbHVnaW4oKV0sXG4gICAgICAgIGV4dGVuc2lvbnM6IFsnLnRzeCcsICcudHMnLCAnLmpzJ11cbiAgICB9LFxuICAgIG1vZHVsZToge1xuICAgICAgICBydWxlczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRlc3Q6IC9cXC4odHN4fHRzKSQvLFxuICAgICAgICAgICAgICAgIGxvYWRlcjogXCJ0cy1sb2FkZXJcIixcbiAgICAgICAgICAgICAgICBleGNsdWRlOiAvbm9kZV9tb2R1bGVzL1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXN0OiAvXFwuaHRtbCQvLFxuICAgICAgICAgICAgICAgIGxvYWRlcjogXCJodG1sLWxvYWRlclwiLFxuICAgICAgICAgICAgICAgIGV4Y2x1ZGU6IC9ub2RlX21vZHVsZXMvXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRlc3Q6IC9cXC5jc3MkLyxcbiAgICAgICAgICAgICAgICB1c2U6IFtcInN0eWxlLWxvYWRlclwiLCBcImNzcy1sb2FkZXJcIl0sXG4gICAgICAgICAgICAgICAgZXhjbHVkZTogL25vZGVfbW9kdWxlcy9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGVzdDogL1xcLmdyYXBocWwkLyxcbiAgICAgICAgICAgICAgICBleGNsdWRlOiAvbm9kZV9tb2R1bGVzLyxcbiAgICAgICAgICAgICAgICBsb2FkZXI6ICdncmFwaHFsLXRhZy9sb2FkZXInXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgICBuZXcgSHRtbFdlYnBhY2tQbHVnaW4oe1xuICAgICAgICAgICAgdGVtcGxhdGU6IHJlc29sdmUoJy4vc291cmNlL2NsaWVudC9pbmRleC5odG1sJylcbiAgICAgICAgfSlcbiAgICBdLFxufSIsImltcG9ydCB3ZWJwYWNrLCB7IENvbmZpZ3VyYXRpb24sIENvbXBpbGVyLCBIb3RNb2R1bGVSZXBsYWNlbWVudFBsdWdpbiwgTm9FbWl0T25FcnJvcnNQbHVnaW59IGZyb20gXCJ3ZWJwYWNrXCJcbmltcG9ydCB3ZWJwYWNrRGV2TWlkZGxld2FyZSBmcm9tIFwid2VicGFjay1kZXYtbWlkZGxld2FyZVwiXG5pbXBvcnQgd2VicGFja0hvdE1pZGRsZXdhcmUgZnJvbSBcIndlYnBhY2staG90LW1pZGRsZXdhcmVcIlxuaW1wb3J0IHsgbWVyZ2UgfSBmcm9tIFwid2VicGFjay1tZXJnZVwiXG5pbXBvcnQgeyBjbGllbnQkY29tbW9uIH0gZnJvbSBcIi4vd2VicGFjay5jb21tb25cIlxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCJcblxuY29uc3QgY2xpZW50JGhtcjogQ29uZmlndXJhdGlvbiA9IHtcbiAgICBtb2RlOiAnZGV2ZWxvcG1lbnQnLFxuICAgIGVudHJ5OiBbJ3dlYnBhY2staG90LW1pZGRsZXdhcmUvY2xpZW50JywgcmVzb2x2ZSgnLi9zb3VyY2UvY2xpZW50L2luZGV4LnRzeCcpXSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICAgIG5ldyBIb3RNb2R1bGVSZXBsYWNlbWVudFBsdWdpbigpLFxuICAgICAgICBuZXcgTm9FbWl0T25FcnJvcnNQbHVnaW4oKSxcbiAgICBdXG59XG5cbmNvbnN0IGNvbmZpZzogQ29uZmlndXJhdGlvbiA9IG1lcmdlKGNsaWVudCRjb21tb24sIGNsaWVudCRobXIpXG5cbmNvbnN0IGNvbXBpbGVyOiBDb21waWxlciA9IHdlYnBhY2soY29uZmlnKVxuXG5jb25zdCB3ZWJwYWNrSE1SID0gW1xuICAgIHdlYnBhY2tEZXZNaWRkbGV3YXJlKGNvbXBpbGVyKSxcbiAgICB3ZWJwYWNrSG90TWlkZGxld2FyZShjb21waWxlcilcbl1cblxuZXhwb3J0IGRlZmF1bHQgWy4uLndlYnBhY2tITVJdXG5cbiIsImltcG9ydCBcInJlZmxlY3QtbWV0YWRhdGFcIlxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcImV4cHJlc3NcIlxuaW1wb3J0IHsgYnVpbGRTY2hlbWEgfSBmcm9tIFwidHlwZS1ncmFwaHFsXCJcbmltcG9ydCB7IGdyYXBocWxIVFRQIH0gZnJvbSBcImV4cHJlc3MtZ3JhcGhxbFwiXG5pbXBvcnQgeyBOb1NjaGVtYUludHJvc3BlY3Rpb25DdXN0b21SdWxlIH0gZnJvbSBcImdyYXBocWxcIlxuaW1wb3J0IHsgVGVzdFJlc29sdmVyIH0gZnJvbSBcIi4vdGVzdHNcIlxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCJcblxuY29uc3Qgcm91dGVyID0gUm91dGVyKClcblxuYXN5bmMgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBjb25zdCBzY2hlbWEgPSBhd2FpdCBidWlsZFNjaGVtYSh7XG4gICAgICAgIHJlc29sdmVyczogW1Rlc3RSZXNvbHZlcl0sXG4gICAgICAgIGVtaXRTY2hlbWFGaWxlOiByZXNvbHZlKFwiLi9zb3VyY2Uvc2VydmVyL2dyYXBocWwvc2NoZW1hLmdyYXBocWxcIilcbiAgICB9KVxuXG4gICAgLy9jb25zdCB2YWxpZGF0aW9uUnVsZXMgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PSBcInByb2R1Y3Rpb25cIiAmJiBbTm9TY2hlbWFJbnRyb3NwZWN0aW9uQ3VzdG9tUnVsZV1cblxuICAgIHJvdXRlci51c2UoZ3JhcGhxbEhUVFAocmVxID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjaGVtYSwgXG4gICAgICAgICAgICBncmFwaGlxbDogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT0gXCJkZXZlbG9wbWVudFwiLFxuICAgICAgICAgICAgLy92YWxpZGF0aW9uUnVsZXNcbiAgICAgICAgfSBcbiAgICB9KSlcbn1cblxuaW5pdCgpXG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlclxuIiwiaW1wb3J0IHsgQXJnLCBRdWVyeSwgUmVzb2x2ZXIgfSBmcm9tIFwidHlwZS1ncmFwaHFsXCJcblxuQFJlc29sdmVyKCkgXG5leHBvcnQgY2xhc3MgVGVzdFJlc29sdmVyIHtcbiAgICBAUXVlcnkocmV0dXJucyA9PiBTdHJpbmcpXG4gICAgYXJnVGVzdChAQXJnKFwiYXJnXCIsIHsgbnVsbGFibGU6IHRydWUgfSkgYXJnPzogc3RyaW5nKSB7XG4gICAgICAgIGlmICghYXJnKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJURVNUIE9LLiBOTyBBUkdTIFBBU1NFRFwiXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYFRFU1QgT0suIEZPTExPV0lORyBBUkcgUEFTU0VEOiAke2FyZ31gXG4gICAgfVxufVxuXG4iLCJpbXBvcnQgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiXG5pbXBvcnQgZ3JhcGhxbCBmcm9tIFwiLi9ncmFwaHFsXCJcbmltcG9ydCBob21lIGZyb20gXCIuL3JvdXRlcy9ob21lXCJcblxuY29uc3QgYXBwID0gZXhwcmVzcygpXG5jb25zdCBwb3J0ID0gMzAwMFxuXG5hc3luYyBmdW5jdGlvbiB1c2VDb21wcmVzc2lvbigpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgY29uc3QgeyBkZWZhdWx0OiBjb21wcmVzc2lvbiB9ID0gYXdhaXQgaW1wb3J0KFwiY29tcHJlc3Npb25cIilcblxuICAgICAgICBhcHAudXNlKGNvbXByZXNzaW9uKVxuICAgIH1cbn1cblxudXNlQ29tcHJlc3Npb24oKVxuXG5hcHAudXNlKCcvZ3JhcGhxbCcsIGdyYXBocWwpXG5hcHAudXNlKCcvJywgaG9tZSlcblxuYXBwLmxpc3Rlbihwb3J0LCAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coYFNlcnZlciBsaXN0ZW5pbmcgb24gJHtwb3J0fS4uLmApXG59KSIsImltcG9ydCB7IFJvdXRlciwgc3RhdGljIGFzIHNlcnZlIH0gZnJvbSBcImV4cHJlc3NcIlxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCJcblxuY29uc3Qgcm91dGVyID0gUm91dGVyKClcblxuYXN5bmMgZnVuY3Rpb24gaW5pdCgpIHsgICAgXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09IFwiZGV2ZWxvcG1lbnRcIikge1xuICAgICAgICBjb25zdCB7IGRlZmF1bHQ6IHdlYnBhY2tITVIgfSA9IGF3YWl0IGltcG9ydChcIkB3ZWJwYWNrL3dlYnBhY2suaG1yXCIpXG5cbiAgICAgICAgY29uc3QgeyBkZWZhdWx0OiBoaXN0b3J5QXBpRmFsbGJhY2sgfSA9IGF3YWl0IGltcG9ydChcImNvbm5lY3QtaGlzdG9yeS1hcGktZmFsbGJhY2tcIilcblxuICAgICAgICByb3V0ZXIudXNlKHdlYnBhY2tITVIpXG4gICAgICAgIFxuICAgICAgICByb3V0ZXIudXNlKGhpc3RvcnlBcGlGYWxsYmFjayh7IGRpc2FibGVEb3RSdWxlOiB0cnVlIH0pKVxuXG4gICAgICAgIHJvdXRlci51c2Uod2VicGFja0hNUilcbiAgICB9IGVsc2Uge1xuICAgICAgICByb3V0ZXIudXNlKHNlcnZlKHJlc29sdmUoJy4vYnVpbGQvY2xpZW50JykpKVxuXG4gICAgICAgIHJvdXRlci5nZXQoJyonLCAocmVxLCByZXMpID0+IHJlcy5zZW5kRmlsZShyZXNvbHZlKCcuL2J1aWxkL2NsaWVudC9pbmRleC5odG1sJykpKVxuICAgIH1cbn1cblxuaW5pdCgpXG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlciIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvbm5lY3QtaGlzdG9yeS1hcGktZmFsbGJhY2tcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzLWdyYXBocWxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHRtbC13ZWJwYWNrLXBsdWdpblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWZsZWN0LW1ldGFkYXRhXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRzY29uZmlnLXBhdGhzLXdlYnBhY2stcGx1Z2luXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInR5cGUtZ3JhcGhxbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3ZWJwYWNrXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndlYnBhY2stZGV2LW1pZGRsZXdhcmVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2VicGFjay1ob3QtbWlkZGxld2FyZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3ZWJwYWNrLW1lcmdlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndlYnBhY2stbm9kZS1leHRlcm5hbHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zb3VyY2Uvc2VydmVyL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9