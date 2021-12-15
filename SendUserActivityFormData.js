function sendUserActivityFormData(e){
    // var homie_touringagent = parent.Xrm.Page.data.entity.attributes.get('homie_touringagent').getValue();
    // var formId = parent.Xrm.Page.data._formContext._ui._formSelector._formId.guid;
    var formId = e._formContext._ui.formSelector._formId.guid
    
    var userId = parent.Xrm.Page.context.getUserId();
    userId = userId.split('{')[1].split('}')[0]

    triggerFlowToCaptureFormUsage(formId, userId)
}

function triggerFlowToCaptureFormUsage(formId, userId){
    try {
        var req = new XMLHttpRequest();
        var url = 'https://prod-189.westus.logic.azure.com:443/workflows/48d08af545974a4b94191f8341379128/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=PdyaYUi3GdScAJx8VpVse_wEjMNeKH0dyX47OxFCz3c';
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
                    console.log('Success. Form usage data saved.')
                }

                // Flow failed
                else if (this.status == 409 /* Conflict */ || this.status != 202 /* Any status other than "Accepted" */){
                    console.log('Something went wrong. Form usage data not saved.')
                }
            }
        }
        req.send(JSON.stringify({
            "formId": formId,
            "userId": userId
        }))
    }
    catch (e){
        console.log('Something went wrong. Form usage data not saved.')
    }
}