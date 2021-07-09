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
        req.setRequestHeader('Content-Type', 'application/json');
        req.onreadystatechange = function (){
            if (this.readyState == 4 /* complete */ || this.readyState == 2){
                req.onreadystatechange = null;
                if (this.status == 200 || this.status == 204 || this.status == 202){
                    // success
                    setSuccessNotification()
                }
                else {
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
        message: "Success",
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
    // refresh the page
    Xrm.Page.data.refresh()

    setTimeout(() => {
        if (type == "Success"){
            // clear success notification
            Xrm.App.clearGlobalNotification(messageId)
        } else { 
            // clear error notification
            Xrm.Page.ui.clearFormNotification(messageId)
        }
    }, 5000);
}