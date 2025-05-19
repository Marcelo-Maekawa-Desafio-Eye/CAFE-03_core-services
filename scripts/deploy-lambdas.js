const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const lambdasList = path.resolve(__dirname, "lambdas.json");
const lambdas = JSON.parse(fs.readFileSync(lambdasList, "utf8"));

const deployLambda = ({ name }) => {
    try {
        const zipFile = `dist/lambdas/${name}.zip`;
        console.log(`🚀 Deploying Lambda: ${name}`);

        const command = `aws lambda update-function-code --function-name ${name} --zip-file fileb://${zipFile}`;
        execSync(command, { stdio: "inherit" });

        console.log(`✔️ Deploy da função ${name} concluído!`);
    } catch (error) {
        console.error(`❌ Erro ao fazer deploy de ${name}:`, error.message);
    }
};

lambdas.forEach(deployLambda);
