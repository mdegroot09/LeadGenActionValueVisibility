function sendUserActivityViewData(){
    if (parent.Xrm.Page.context.stopWebResource !== true){
        parent.Xrm.Page.context.stopWebResource = true
    }
    else {
        return 
    }

    var viewId = getParameterByName("viewid");

    if (viewId){
        var userId = parent.Xrm.Page.context.getUserId();
        userId = removeBraces(userId)
    
        triggerFlowToCaptureViewUsage(viewId, userId)
    }
}

function getParameterByName(name) {
    var url = parent.Xrm.Page.getUrl();
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    var viewId = decodeURIComponent(results[2].replace(/\+/g, ' '));
    return removeBraces(viewId)
}

function removeBraces(str){
    return str.split('{')[1].split('}')[0]
}

function triggerFlowToCaptureViewUsage(viewId, userId){
    try {
        var req = new XMLHttpRequest();
        var url = 'https://prod-185.westus.logic.azure.com:443/workflows/1234388b913b47e7ad83ac80d229ae54/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=voU721nLDKwl37TUpiEuX4vJ-vB5aA9vHGXvdSlu7us';
        req.responseType = 'json';
        req.open("POST", url, true);
        req.setRequestHeader('Accept', 'application/json')
        req.setRequestHeader('Content-Type', 'application/json', 'charset=utf-8');
        req.setRequestHeader('OData-MaxVersion', '4.0')
        req.setRequestHeader('OData-Version', '4.0')
        req.onreadystatechange = function (){
            if (this.readyState == 4 /* complete */){
                req.onreadystatechange = null;
                
                // Flow completed successfully
                if (this.status == 200){
                    console.log('Success. View usage data saved.')
                }

                // Flow failed
                else if (this.status == 409 /* Conflict */ || this.status != 202 /* Any status other than "Accepted" */){
                    console.log('Something went wrong. View usage data not saved.')
                }
            }
        }
        req.send(JSON.stringify({
            "viewId": viewId,
            "userId": userId
        }))
    }
    catch (e){
        console.log('Something went wrong. View usage data not saved.')
    }
}