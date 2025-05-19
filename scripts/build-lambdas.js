const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

const lambdasList = path.resolve(__dirname, "lambdas.json");
const lambdas = JSON.parse(fs.readFileSync(lambdasList, "utf8"));

const buildLambda = async ({ name, entry }) => {
    try {
        await esbuild.build({
            entryPoints: [entry],
            bundle: true,
            platform: "node",
            target: "node18",
            outfile: `dist/lambdas/${name}/index.js`,
            //minify: true, 
            //external: [], 
            //sourcemap: true,
            //packages: "external",
            //logLevel: "info",
        });
        console.log(`✔️ Build da função ${name} concluído!`);
    } catch (error) {
        console.error(`❌ Erro ao compilar ${name}:`, error.message);
    }
};

lambdas.forEach(buildLambda);
