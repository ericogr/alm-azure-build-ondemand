let Promise = require("bluebird");
let AzureVirtualMachine = Promise.promisifyAll(require("./azure-virtual-machine"));
let TFSBuildOnPremise = Promise.promisifyAll(require("./tfs-build-on-premise"));
let parameters = require("./parameters");

module.exports = function(context, data) {
    context.log("Processamento do build iniciado!");

    if("eventType" in data && data.eventType === "tfvc.checkin") {
        context.log("Chekin disparou build");
        context.log("Iniciando máquina virtual...");

        AzureVirtualMachine.startAsync(parameters.azure)
            .then((ret) => {
                context.log(`Máquina virtual ${parameters.azure.virtualMachine.vmName} iniciada com sucesso!`);
                context.log(`iniciando o build em ${parameters.tfs.startDelay/1000} segundos...`);
                return ret;
            })
            //.delay(parameters.tfs.startDelay)
            .then((ret) => {
                context.log("Iniciando build no TFS...");

                return TFSBuildOnPremise.startAsync(parameters.tfs);
            })
            .then((ret) => {
                context.log(`retorno do start do build no tfs`);
                context.log(ret);
                context.log(`Build iniciado com sucesso: ${ret.buildNumber.buildNumber}`);
            })
            .catch((err) => {
                context.log("Erro: " + err);
                context.log(err);
            });

        context.res = {
            status: 200,
            body: { message: "success"}
        };
    }
    else if("eventType" in data && data.eventType === "build.complete") {
	     context.log("Iniciando desligamento da máquina virtual...");
       AzureVirtualMachine.stopAsync(parameters.azure)
           .then((ret) => {
               context.log(`Máquina virtual ${parameters.azure.virtualMachine.vmName} desligada!`);
               return ret;
           });
    }
    else {
        context.log(`objeto invalido: ${data.eventType}`);
        context.log(data);
        context.res = {
            status: 400,
            body: { error: "objeto invalido"}
        };
    }

    context.done();
}
