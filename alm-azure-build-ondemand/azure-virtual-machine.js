let msRestAzure = require('ms-rest-azure');
let computeAzureServiceClient = require('azure-arm-compute');

module.exports.start = (parameters, callback) => {
    msRestAzure.loginWithServicePrincipalSecret(parameters.clientId, parameters.secret, parameters.domain, function(err, credentials) {
        if (err) {
            return callback(err, null);
        }

        let client = new computeAzureServiceClient(credentials, parameters.subscriptionId);

        client.virtualMachines.start(parameters.virtualMachine.resourceGroupName, parameters.virtualMachine.vmName, function(err, result) {
            if (err) {
                return callback(err, null);
            }

            return callback(null, result);
        });
    });
}

module.exports.deallocate = (parameters, callback) => {
    msRestAzure.loginWithServicePrincipalSecret(parameters.clientId, parameters.secret, parameters.domain, function(err, credentials) {
        if (err) {
            return callback(err, null);
        }

        let client = new computeAzureServiceClient(credentials, parameters.subscriptionId);

        client.virtualMachines.deallocate(parameters.virtualMachine.resourceGroupName, parameters.virtualMachine.vmName, function(err, result) {
            if (err) {
                return callback(err, null);
            }

            return callback(null, result);
        });
    });
}
