function pickEarlyAccessRequest(){
    var homie_touringagent = parent.Xrm.Page.data.entity.attributes.get('homie_touringagent').getValue();
    var systemuserid = parent.Xrm.Page.context.getUserId();
    var activityid = parent.Xrm.Page.data.entity.getId();

    showLoadingGif(true)

    // if Touring Agent on Early Access Request is blank on form instance
    if (!homie_touringagent){
        triggerFlowToAddTouringAgent(systemuserid, activityid)
    }

    // if Touring Agent is already assigned as the current user
    else if (homie_touringagent[0].id == systemuserid){
        setInfoNotification()
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
        req.responseType = 'json';
        req.open("PUT", url, true);
        req.setRequestHeader('Accept', 'application/json')
        req.setRequestHeader('Content-Type', 'application/json', 'charset=utf-8');
        req.setRequestHeader('OData-MaxVersion', '4.0')
        req.setRequestHeader('OData-Version', '4.0')
        req.onreadystatechange = function (){
            if (this.readyState == 4 /* complete */){
                req.onreadystatechange = null;
                
                // Flow completed successfully
                if (this.status == 200){
                    setSuccessNotification()
                }

                // Flow failed
                else if (this.status == 409 /* Conflict */ || this.status != 202 /* Any status other than "Accepted" */){
                    homie_touringagent = req.response.homie_touringagent // Get Touring Agent from response
                    let systemuserid = parent.Xrm.Page.context.getUserId().split('{')[1].split('}')[0].toLowerCase();
                    if (homie_touringagent != systemuserid && homie_touringagent){
                        // error 
                        setFailureNotification()
                    } else if (homie_touringagent == systemuserid){
                        // agent is already assigned as current user
                        setInfoNotification()
                    }
                }

                // Fail by default
                else {
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

function setInfoNotification(){
    let notification = {
        message: 'You are already assigned as the Touring Agent',
        level: 4,
        showCloseButton: true,
        type: 2
    }
    Xrm.App.addGlobalNotification(notification).then(
        function success(messageId){
            clearNotification(messageId, "Info")
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
    showLoadingGif(false)
    refreshIfNoTouringAgent()

    setTimeout(() => {
        if (type == "Success" || type == "Info"){
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
    var homie_touringagent = parent.Xrm.Page.data.entity.attributes.get('homie_touringagent').getValue();
    if (!homie_touringagent){
        Xrm.Page.data.refresh()
        homie_touringagent = parent.Xrm.Page.data.entity.attributes.get('homie_touringagent').getValue();
    }
    Xrm.Page.ui.refreshRibbon(); // update the ribbon to hide the "pick" button
    return homie_touringagent
}

function showLoadingGif(bool){
    if (bool){
        Xrm.Utility.showProgressIndicator("Picking")
    }
    else {
        Xrm.Utility.closeProgressIndicator()
    }
}