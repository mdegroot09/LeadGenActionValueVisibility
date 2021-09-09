// JavaScript source code
function showHideLeadGenValsOnOpp() {
    let val = parent.Xrm.Page.data.entity.attributes.get('homie_opportunitytype').getValue()
    let leadGenAction = parent.Xrm.Page.getControl("homie_leadgenaction")

    if (leadGenAction) {
        showHideLeadGenActionOptionSetValues(val)
    }
}

function addNewOpportunityTypeEvent() {
    if (parent.Xrm.Page != null) {

        // listen for Opportunity Type change
        parent.Xrm.Page.data.entity.attributes.get('homie_verticalselection').addOnChange(showHideLeadGenValsOnNewOpp);
    }
}

function showHideLeadGenValsOnNewOpp() {
    let val = parent.Xrm.Page.data.entity.attributes.get('homie_verticalselection').getValue()

    showHideLeadGenActionOptionSetValues(val)
}

function showHideLeadGenActionOptionSetValues(val) {

    // hide all
    hideAllOptions()

    // if buyer opportunity
    if (val == "270440000") {

        // show
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 0, text: "Inbound Call" })
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 1, text: "Inbound Email" }) 
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 2, text: "Inbound Text" })
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 3, text: "Chat" }) 
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 4, text: "Lead List" }) 
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 5, text: "Referral" }) 
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 6, text: "Repeat Customer" }) 
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 8, text: "Early Access Request" }) 
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 9, text: "Favorited a Property" }) 
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 10, text: "Save Search" }) 
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 11, text: "Registration" })
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 12, text: "Buyer Package" })
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 13, text: "Listing Question" })
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 14, text: "Tour Request" }) 
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 18, text: "Other" }) 
    }

    // if seller opportunity
    else if (val == "270440001") {

        //show 
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 0, text: "Inbound Call" }) 
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 1, text: "Inbound Email" })
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 2, text: "Inbound Text" }) 
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 3, text: "Chat" }) 
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 4, text: "Lead List" }) 
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 5, text: "Referral" }) 
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 6, text: "Repeat Customer" }) 
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 7, text: "Home Value Report" })
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 11, text: "Registration" }) 
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 15, text: "Listing Start" }) 
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 18, text: "Other" }) 
    }

    // if borrower or refi opportunity
    else if (val == "270440002" || val == "206360000") {

        // show
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 0, text: "Inbound Call" }) 
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 1, text: "Inbound Email" }) 
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 2, text: "Inbound Text" })
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 3, text: "Chat" })
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 4, text: "Lead List" }) 
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 5, text: "Referral" }) 
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 6, text: "Repeat Customer" }) 
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 11, text: "Registration" }) 
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 16, text: "Pre Qual" })
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 17, text: "Refinance" })
        parent.Xrm.Page.getControl("homie_leadgenaction").addOption({ value: 18, text: "Other" }) 
    }
};

function hideAllOptions() {

    var options = parent.Xrm.Page.getAttribute("homie_leadgenaction").getOptions();
    options.forEach((option) => {
        parent.Xrm.Page.getControl("homie_leadgenaction").removeOption(option.value);
    })
}