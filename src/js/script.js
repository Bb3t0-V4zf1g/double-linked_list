const inventory = new Inventories();

const div = document.querySelector(".details");

//ADD PRODUCT
const btnAdd = document.getElementById("btnAdd");
btnAdd.addEventListener("click", (e) => {
    //Not let the form refresh
    e.preventDefault();
    //Get name (String)
    let nameP = document.getElementById("txtName").value;
    //Get code (String)
    let codeP = document.getElementById("txtCode").value;
    //Get quantity (String)
    let quantityP = document.getElementById("txtQuantity").value;
    //Get price (String)
    let priceP = document.getElementById("txtPrice").value;
    if(nameP === "" || codeP === "" || quantityP === "" ||priceP ===""){
        div.classList.toggle("error", true);
        div.innerHTML = `Miss fields to fill`;
    }else{
            //Instance an object according the proviced datas
            let newP = new Products(nameP, codeP*1, quantityP*1, priceP*1);
            //Add product to inventory
            if(inventory.add(newP)){
                //Expose the information
                div.classList.toggle("error", false);
                div.innerHTML = `This product has been added: ${newP.info()}`;
            }else{
                div.classList.toggle("error", true);
                div.innerHTML = `This product exists already`;
            }
        }
});

//LIST WHOLE PRODUCTS FROM INVENTORY
const btnList = document.getElementById("btnList");
btnList.addEventListener("click", (e) => {
    //Not let the form refresh
    e.preventDefault();
    //Show the list
    if(!inventory.list()){
        div.classList.toggle("error", true);
        div.innerHTML = `The inventory is empty, please add some products ;)`;
    }else{
        div.classList.toggle("error", false);
        div.innerHTML = inventory.list();
    }
});

//LIST WHOLE PRODUCTS IN REVERSE FROM INVENTORY
const btnListR = document.getElementById("btnListR");
btnListR.addEventListener("click", (e) => {
    //Not let the form refresh
    e.preventDefault();
    //Show the list
    if(!inventory.listRev()){
        div.classList.toggle("error", true);
        div.innerHTML = `The inventory is empty, please add some products ;)`;
    }else{
        div.classList.toggle("error", false);
        div.innerHTML = inventory.listRev();
    }
});

//LOOK FOR A SPECIFIC PRODUCT
const btnLookFor = document.getElementById("btnLookFor");
btnLookFor.addEventListener("click", (e) => {
    //Not let the form refresh
    e.preventDefault();
    //Get code (String)
    let codeP = document.getElementById("txtCode").value*1;
    if (!codeP) {
        div.classList.toggle("error", true);
        div.innerHTML = `You have to provide us the code product`;
    } else {
        let search = inventory.lookFor(codeP);
        if(search === null){
            div.classList.toggle("error", true);
            div.innerHTML = `That product doesn't exist`;
        }else{
            //Expose the information
            div.classList.toggle("error", false);
            div.innerHTML = search.info();
        }

    }
});

//DELETE PRODUCT
const btnDelete = document.getElementById("btnDelete");
btnDelete.addEventListener("click", (e) => {
    //Not let the form refresh
    e.preventDefault();
    let codeP = document.getElementById("txtCode").value*1;
    if (!codeP) {
        div.classList.toggle("error", true);
        div.innerHTML = `You have to provide us the code product`;
    } else {
        //Delete the product
        if(!inventory.delete(codeP )){
            div.classList.toggle("error", true);
            div.innerHTML = `There isn't any product with the code ${codeP}`;
        }else{
            div.classList.toggle("error", false);
            div.innerHTML = `Product with code ${codeP} has been deleted successfully`;
        }
    }
});

//EXTRACT FIRST PRODUCT
const btnExtract = document.getElementById("btnExtract");
btnExtract.addEventListener("click", (e) => {
    //Not let the form refresh
    e.preventDefault();
    try{
        div.classList.toggle("error", false);
        div.innerHTML = inventory.extractFirst().info();
    }catch(e){
        div.classList.toggle("error", true);
        div.innerHTML = `The inventory is empty :(`;
    }
});

//EXTRACT LAST PRODUCT
const btnExtractLast = document.getElementById("btnExtractLast");
btnExtractLast.addEventListener("click", (e) => {
    //Not let the form refresh
    e.preventDefault();
    try{
        div.classList.toggle("error", false);
        div.innerHTML = inventory.extractLast().info();
    }catch(e){
        div.classList.toggle("error", true);
        div.innerHTML = `The inventory is empty :(`;
    }
});
