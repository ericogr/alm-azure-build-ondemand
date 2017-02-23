let httpntlm = require('httpntlm');

module.exports.start = (parameters, callback) => {
	httpntlm.post({
	    url: parameters.projectUrl + '/_apis/build/builds?api-version=2.0',
	    username: parameters.username,
	    password: parameters.password,
	    workstation: parameters.workstation,
	    domain: parameters.domain,
	    json: {
	            "definition": {
	            "id": parameters.build.id
	        },
	        "sourceBranch": parameters.build.sourceBranch,
	        "parameters": parameters.build.parameters
	    }
	}, function (err, res) {
	    if (err) {
				return callback(err, null);
	    }

	    let body = JSON.parse(res.body);

	    return callback(null, {"buildNumber": body});
	});
}
