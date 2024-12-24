function alertHandler() {

    // if checkForm return true, then send success alert
    if (checkForm()) {
        let alerts = document.getElementById("alert-container");
        console.log("alerts", alerts)
        
       
        if (alerts.childElementCount < 1) {
           // Create alert box
           let alertBox = document.createElement("div");
           alertBox.classList.add("alert-msg", "visible");
    
           alertBox.innerHTML = "<p><div class='text-bold'><i class='fa fa-check-circle-o'></i> Message Sent!<br></div><small class='mt-small'>Thanks for completing the form. We'll be in touch soon!</small></p>";
           // Add alert box to parent
           alerts.insertBefore(alertBox, alerts.childNodes[0]);
    
           console.log("alerts.childNodes", alerts.childNodes)
     
           // Remove last alert box
           alerts.childNodes[0].classList.add("alert-msg", "slide-out");

           // sleep for a bit
           setTimeout(function() {
              alerts.removeChild(alerts.lastChild); // remove the alert
              location.reload(); // reload the page
           }, 10000); 
        } 
    } else {

        // if checkForm return false,

        setTimeout(function() {
            location.reload(); // reload the page
         }, 10000); 

    }
  }



function checkForm() {
    console.log("submit button clicked")

    let all_ok = true;

    // checking for names input value
    const name_elems = document.getElementsByClassName("name")
    let name_ok = true;
    for (let item of name_elems) {
        if (item.value == "") {
            all_ok = false;
            name_ok = false;

            console.log("item", item)
            console.log("item.children", item.children)

            // if item doesn't already have paragraph warning, add one
            if (item.children.length == 0) {
                const para = document.createElement("p");
                para.classList.add("warning-red", "names") // add multiple class name

                const node = document.createTextNode("This field is required");
                para.appendChild(node);
                para.style.color = "red";
                item.after(para);
                para.style.marginTop = "10px";
                item.style.border = "1px solid red";

                item.appendChild(document.createElement("p"))

            }            
        }
    }
    
    // if names are all ok (this returns NodeList - since we only show 1 warning, the actual element is in first index)
    if (name_ok) {
        const warning_names = document.querySelectorAll(".warning-red.names")[0];

        if (warning_names !== undefined){
            console.log('warning_names', warning_names)
            // if we've shown warnings, remove it
            if (warning_names.length > 0) {
                warning_names.replaceChildren(); // remove all of its children
            }
        }
        
        // remove itself
        // warning_names.remove();
    }



    // checking for email input value
    const email_elem = document.getElementById("email")
    console.log("email_elem.value", email_elem.value)

    // if email is empty, or it doesnt have @
    if ( (email_elem.value == "") | (email_elem.value != "" && !email_elem.value.includes("@"))) {
        all_ok = false;

        // if item doesn't already have paragraph warning, add one
        if (email_elem.children.length == 0) {
            console.log(email_elem.value, "@ not in email.value")

            const para = document.createElement("p");
            const node = document.createTextNode("Please enter a valid email address");
            para.appendChild(node);
            para.style.color = "red";
            email_elem.after(para);

            para.style.marginTop = "10px"
            email_elem.style.border = "1px solid red";

            // append a p element afterwards, so we dont add multiple warnings.
            email_elem.appendChild(document.createElement("p"));
        }
        
    }

    // checking for query input
    query_elems = document.querySelectorAll('input[type=radio]');
    all_not_checked = true;

    // check if any of the radio query options are selected
    for (let item of query_elems){
        if (item.checked === true) {
            all_not_checked = false;
        }
    }

    // if none of the radio query options is selected
    if (all_not_checked) {
        all_ok = false;

        // if item doesn't already have paragraph warning, add one
        if (query_elems[0].children.length == 0) {

            const para = document.createElement("p");
            const node = document.createTextNode("Please select a query type");
            para.appendChild(node);
            para.style.color = "red";

            query_elems[0].parentNode.parentNode.after(para); // here we append to the first radio option
            para.style.marginTop = "10px";

            // append a p element afterwards, so we dont add multiple warnings.
            query_elems[0].appendChild(document.createElement("p"));

        }

    }

    // check for message input
    const message_elem = document.getElementById("message")

    // if message is empty
    if (message_elem.value == "") {
        all_ok = false;

        // if item doesn't already have paragraph warning, add one
        if (message_elem.children.length == 0) {
            const para = document.createElement("p");
            const node = document.createTextNode("This field is required");
            para.appendChild(node);
            para.style.color = "red";
            message_elem.after(para);

            para.style.marginTop = "10px";
            message_elem.style.border = "1px solid red";

            // append a p element afterwards, so we dont add multiple warnings.
            message_elem.appendChild(document.createElement("p"));
        }
    }

    // check for consent checkbox
    const checkbox_elem = document.getElementById("consent")

    // if consent checkbox is not checked
    if (!checkbox_elem.checked) {
        all_ok = false;

        // if item doesn't already have paragraph warning, add one
        if (checkbox_elem.children.length == 0) {

            const para = document.createElement("p");
            const node = document.createTextNode("To submit this form, please consent to being contacted");
            para.appendChild(node);
            para.style.color = "red";
            checkbox_elem.parentNode.after(para);

            para.style.marginBottom = "5px";
            para.style.marginTop = "0px";
            para.style.marginLeft = "40px";
            
            // append a p element afterwards, so we dont add multiple warnings.
            checkbox_elem.appendChild(document.createElement("p"));
        }
    }

    if (all_ok) {
        console.log(" all ok")
        
        const form = document.getElementsByClassName("form-main");
        form[0].reset();

    }

    return all_ok;

}
