const path = require("path");
const isPro = process.env.NODE_ENV === "production";
const CompressionPlugin = require("compression-webpack-plugin");

function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    baseUrl: "/vue/",
    outputDir: "dist",
    assetsDir: "static",
    indexPath: "index.html",
    pages: {
        index: {
            entry: "src/main.js",
            template: "public/index.html",
            filename: "index.html",
            title: "Vue3.0PC基础模板",
            chunks: ["chunk-vendors", "chunk-common", "index"]
        }
    },
    lintOnSave: false,
    productionSourceMap: true,
    css: {
        extract: true,
        sourceMap: false,
        loaderOptions: {
            sass: {
                data: `@import "@/assets/css/common.scss";@import "@/assets/css/mixin.scss";`
            }
        },
        modules: false
    },
    devServer: {
        host: "localhost",
        port: 8084,
        https: false,
        hotOnly: false,
        open: true,
        proxy: {
            "/api": {
                target: "https://api.github.com",
                ws: true,
                changeOrigin: true
            },
            "/foo": {
                target: "<other_url>"
            }
        }
    },
    pluginOptions: {},
    chainWebpack(config) {
        config.resolve.alias.set("components", resolve("src/components"));
    },
    configureWebpack: () => {
        if (isPro) {
            return {
                plugins: [
                    new CompressionPlugin({
                        // 目标文件名称。[path] 被替换为原始文件的路径和 [query] 查询
                        filename: "[path].gz[query]",
                        // 使用 gzip 压缩
                        algorithm: "gzip",
                        // 处理与此正则相匹配的所有文件
                        test: new RegExp("\\.(js|css)$"),
                        // 只处理大于此大小的文件
                        threshold: 10240,
                        // 最小压缩比达到 0.8 时才会被压缩
                        minRatio: 0.8
                    })
                ]
            };
        }
    }
};
