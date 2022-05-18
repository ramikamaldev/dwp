let grunt = require("grunt");
let deploymentEnv = grunt.option("env");

grunt.initConfig({
    clean: ["./bin", "./tscommand*.**"],
    copy: {
        files: {
            src: `./config/${deploymentEnv}-env/${deploymentEnv}.env`,
            dest: "./config/config.env"
        }
    },
    ts: {
        options:
        {
            compile: true,
            target: "ES2021",
            module: "commonjs",
            rootDir: "./src",
            comments: true,
            failOnTypeErrors: true,
            noImplicitAny: false,
            pretty: true,
            strict: false,
            strictNullChecks: false,
            strictPropertyInitilization: false,
            verbose: true,
            sourceMap: true,
            declaration: false,
            esModuleInterop: true
        }, azure: {
            src: ["./src/**/*.ts", ["./src/views"]],
            outDir: "bin"
        },
        dev: {
            src: ["./src/**/*.ts",/*["./src/views"]*/],
            outDir: "bin",
            watch: "./src",
            options: { fast: "watch" }
        }
    },
    watch:
    {
        scripts:
        {
            files: ["./src/**/*.ts", "!node_modules"],
            tasks: ["clean", "copy", `ts:${deploymentEnv}`]
        }
    }
});

grunt.loadNpmTasks("grunt-contrib-copy");
grunt.loadNpmTasks("grunt-contrib-clean");
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks("grunt-ts");


grunt.registerTask("default", ["clean", "copy", `ts:${deploymentEnv}`, "watch"]);