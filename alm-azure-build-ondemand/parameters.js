module.exports = {
	"azure": {
		"clientId": process.env.AZURE_CLIENT_ID,
		"secret": process.env.AZURE_SECRET,
		"domain": process.env.AZURE_DOMAIN,
		"subscriptionId": process.env.AZURE_SUBSCRIPTION_ID,
		"virtualMachine": {
			"resourceGroupName": process.env.AZURE_VM_RESOURCE_GROUP_NAME,
			"vmName": process.env.AZURE_VM_NAME
		}
	},
	"tfs": {
		"projectUrl": process.env.TFS_PROJECT_URL,
		"username": process.env.TFS_USERNAME,
		"password": process.env.TFS_PASSWORD,
		"workstation": process.env.TFS_WORKSTATION,
		"domain": process.env.TFS_DOMAIN,
		"startDelay": process.env.TFS_START_DELAY,
		"build": {
			"id": process.env.TFS_BUILD_ID,
			"sourceBranch": process.env.TFS_BUILD_SOURCE_BRANCH,
			"parameters": process.env.TFS_BUILD_PARAMETERS,
		}
	}

}
