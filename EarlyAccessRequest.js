function pickEarlyAccessRequest(){
    var touringAgent = parent.Xrm.Page.data.entity.attributes.get('homie_touringagent').getValue();
    var systemuserid = parent.Xrm.Page.context.getUserId();
    var activityid = parent.Xrm.Page.data.entity.getId();

    // if Touring Agent on Early Access Request is blank on form instance
    if (!touringAgent){
        triggerFlowToAddTouringAgent(systemuserid, activityid)
    }

    // Display an error that a Touring Agent is already assigned
    else {
        setFailureNotification()
    }
}

function triggerFlowToAddTouringAgent(systemuserid, activityid){
    try {
        var req = new XMLHttpRequest();
        var url = "https://prod-28.westus.logic.azure.com:443/workflows/21a1726b7cb54ff38cfeb7153031011b/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=cPW0erHTq-WNpoLYt01SVMLFdFvoMI5Vov-V721ifEE";
        req.open("PUT", url, true);
        req.setRequestHeader('Accept', 'application/json')
        req.setRequestHeader('Content-Type', 'application/json', 'charset=utf-8');
        req.setRequestHeader('OData-MaxVersion', '4.0')
        req.setRequestHeader('OData-Version', '4.0')
        req.onreadystatechange = function (){
            if (this.readyState == 4 /* complete */){
                req.onreadystatechange = null;
                if (this.status == 200 || this.status == 204){
                    let touringAgent = refreshIfNoTouringAgent()
                    let systemuserid = parent.Xrm.Page.context.getUserId();
                    if (touringAgent != systemuserid && touringAgent){
                        // error 
                        setFailureNotification()
                    } else {
                        // success
                        setSuccessNotification()
                    }
                }
                else if (this.status == 409 /* Conflict */ || this.status != 202 /* Disregard any Accepted status */){
                    // error 
                    setFailureNotification()
                }
            }
        }
        req.send(JSON.stringify({
            "systemuserid": systemuserid,
            "activityid": activityid
        }))
    }
    catch (e){
        // error 
        setFailureNotification()
    }
}

function setSuccessNotification(){
    let notification = {
        message: 'Success',
        level: 1,
        showCloseButton: true,
        type: 2
    }
    Xrm.App.addGlobalNotification(notification).then(
        function success(messageId){
            clearNotification(messageId, "Success")
        }, function (err){} // error callback
    )
}

function setFailureNotification(){
    let message = "A Touring Agent has already been assigned."
    let systemuserid = parent.Xrm.Page.context.getUserId();
    let messageId = `${systemuserid}${Date.now()}`
    Xrm.Page.ui.setFormNotification(message, "ERROR", messageId);
    clearNotification(messageId, "Error")
}

function clearNotification(messageId, type){
    refreshIfNoTouringAgent()

    setTimeout(() => {
        if (type == "Success"){
            // clear success notification
            Xrm.App.clearGlobalNotification(messageId)
        } else { 
            // clear error notification
            Xrm.Page.ui.clearFormNotification(messageId)
        }
        refreshIfNoTouringAgent()
    }, 5000);
}

function refreshIfNoTouringAgent(){
    var touringAgent = parent.Xrm.Page.data.entity.attributes.get('homie_touringagent').getValue();
    if (!touringAgent){
        Xrm.Page.data.refresh()
        touringAgent = parent.Xrm.Page.data.entity.attributes.get('homie_touringagent').getValue();
    }
    return touringAgent
}