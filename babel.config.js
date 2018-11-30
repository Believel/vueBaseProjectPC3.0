module.exports = {
    presets: ["@vue/app"],
    plugins: [
        [
            "component",
            {
                library: "element-ui",
                styleLibraryName: "theme-chalk"
            }
        ]
    ]
};
