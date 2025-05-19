const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const lambdasList = path.resolve(__dirname, "lambdas.json");
const lambdas = JSON.parse(fs.readFileSync(lambdasList, "utf8"));

const buildLambda = async ({ handlerName, lambdaName, entry }) => {
    try {
        const outputDir = `dist/lambdas/${handlerName}`;
        const outputFile = `${outputDir}/index.js`;
        const zipFile = `dist/lambdas/${handlerName}.zip`;

        await esbuild.build({
            entryPoints: [entry],
            bundle: true,
            platform: "node",
            target: "node18",
            outfile: outputFile,
            minify: true, 
            //external: [], 
            //sourcemap: true,
            //packages: "external",
            //logLevel: "info",
        });
        console.log(`✔️ Build da função ${handlerName} concluído!`);

        execSync(`zip -j ${zipFile} ${outputFile}`);
        console.log(`✔️ ZIP da função ${handlerName} criado!`);
    } catch (error) {
        console.error(`❌ Erro ao compilar ${handlerName}:`, error.message);
    }
};

lambdas.forEach(buildLambda);
