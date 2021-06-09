// JavaScript source code
function showHideLeadGenValsOnOpp() {
    let val = parent.Xrm.Page.data.entity.attributes.get('homie_opportunitytype').getValue()

    showHideLeadGenActionOptionSetValues(val)
}

function addNewOpportunityTypeEvent() {
    if (parent.Xrm.Page != null) {
        parent.Xrm.Page.data.entity.attributes.get('homie_verticalselection').addOnChange(showHideLeadGenValsOnNewOpp);
    }
}

function showHideLeadGenValsOnNewOpp() {
    let val = parent.Xrm.Page.data.entity.attributes.get('homie_verticalselection').getValue()

    showHideLeadGenActionOptionSetValues(val)
}

function showHideLeadGenActionOptionSetValues(val) {
    
    // if buyer opportunity
    if (val == "270440000") {
        parent.Xrm.Page.getControl("homie_leadgenaction").removeOption(7) // home value report
        parent.Xrm.Page.getControl("homie_leadgenaction").removeOption(15) // listing start
        parent.Xrm.Page.getControl("homie_leadgenaction").removeOption(16) // pre qual
        parent.Xrm.Page.getControl("homie_leadgenaction").removeOption(17) // refinance
    }

    // if seller opportunity
    else if (val == "270440001") {
        parent.Xrm.Page.getControl("homie_leadgenaction").removeOption(8) // early access request
        parent.Xrm.Page.getControl("homie_leadgenaction").removeOption(9) // favorited a property
        parent.Xrm.Page.getControl("homie_leadgenaction").removeOption(10) // save search
        parent.Xrm.Page.getControl("homie_leadgenaction").removeOption(12) // buyer package
        parent.Xrm.Page.getControl("homie_leadgenaction").removeOption(13) // listing question
        parent.Xrm.Page.getControl("homie_leadgenaction").removeOption(14) // tour request
        parent.Xrm.Page.getControl("homie_leadgenaction").removeOption(16) // pre qual
        parent.Xrm.Page.getControl("homie_leadgenaction").removeOption(17) // refinance
    }

    // if borrower or refi opportunity
    else if (val == "270440002" || val == "206360000") {
        parent.Xrm.Page.getControl("homie_leadgenaction").removeOption(7) // home value report
        parent.Xrm.Page.getControl("homie_leadgenaction").removeOption(8) // early access request
        parent.Xrm.Page.getControl("homie_leadgenaction").removeOption(9) // favorited a property
        parent.Xrm.Page.getControl("homie_leadgenaction").removeOption(10) // save search
        parent.Xrm.Page.getControl("homie_leadgenaction").removeOption(12) // buyer package
        parent.Xrm.Page.getControl("homie_leadgenaction").removeOption(13) // listing question
        parent.Xrm.Page.getControl("homie_leadgenaction").removeOption(14) // tour request
        parent.Xrm.Page.getControl("homie_leadgenaction").removeOption(15) // listing start
    }
};