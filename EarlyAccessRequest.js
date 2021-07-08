function pickEarlyAccessRequest(){
    var touringAgent = parent.Xrm.Page.data.entity.attributes.get('homie_touringagent').getValue();
    var systemuserid = parent.Xrm.Page.context.getUserId();

    // if Touring Agent on Early Access Request is blank on form instance
    if (!touringAgent){
        var activityid = parent.Xrm.Page.data.entity.getId()
        var req = new XMLHttpRequest();
        var url = "https://prod-28.westus.logic.azure.com:443/workflows/21a1726b7cb54ff38cfeb7153031011b/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=cPW0erHTq-WNpoLYt01SVMLFdFvoMI5Vov-V721ifEE";
        req.open("PUT", url, true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify({
            "activityid": activityid,
            "systemuserid": systemuserid
        }));
    }

    // Display an error that a Touring Agent is already assigned
    else {
        var messageId = `${systemuserid}${Date.now()}`
        Xrm.Page.ui.setFormNotification("A Touring Agent has already been assigned.", "ERROR", messageId);
        setTimeout(() => {
            Xrm.Page.ui.clearFormNotification(messageId)
        }, 5000);
    }
}