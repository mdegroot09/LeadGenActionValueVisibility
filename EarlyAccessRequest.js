function pickEarlyAccessRequest(){
    var touringAgent = parent.Xrm.Page.data.entity.attributes.get('homie_touringagent').getValue();

    // if Touring Agent on Early Access Request is blank on form instance
    if (!touringAgent){
        var activityid = parent.Xrm.Page.data.entity.attributes.get('activityid').getValue();
        var systemuserid = parent.Xrm.Page.context.getUserId();

        var req = new XMLHttpRequest();
        var url = "https://prod-28.westus.logic.azure.com:443/workflows/21a1726b7cb54ff38cfeb7153031011b/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=cPW0erHTq-WNpoLYt01SVMLFdFvoMI5Vov-V721ifEE";
        req.open("PUT", url, true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify({
            "activityid": activityid,
            "systemuserid": systemuserid
        }));
    }
}