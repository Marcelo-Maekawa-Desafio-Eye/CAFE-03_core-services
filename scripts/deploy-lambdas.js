const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const lambdasList = path.resolve(__dirname, "lambdas.json");
const lambdas = JSON.parse(fs.readFileSync(lambdasList, "utf8"));

const deployLambda = ({ handlerName, lambdaName }) => {
    try {
        const zipFile = `dist/lambdas/${handlerName}.zip`;
        console.log(`🚀 Deploying Lambda: ${handlerName}`);

        const command = `aws lambda update-function-code --function-name ${lambdaName} --zip-file fileb://${zipFile}`;
        execSync(command, { stdio: "inherit" });

        console.log(`✔️ Deploy da função ${handlerName} concluído!`);
    } catch (error) {
        console.error(`❌ Erro ao fazer deploy de ${handlerName}:`, error.message);
    }
};

lambdas.forEach(deployLambda);
