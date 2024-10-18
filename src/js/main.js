class Products {
    constructor(nameP, codeP, quantityP, priceP) {
        this.nameProduct = nameP;
        this.codeProduct = codeP;
        this.quantityProduct = quantityP;
        this.priceProduct = priceP;
        this.next = null;
        this.previous = null;
    }

    //Return all the information from the products
    info() {
        return `Product Details: Name: ${this.nameProduct}, Code: ${this.codeProduct}, Quantity: ${this.quantityProduct}, Price: ${this.priceProduct}`;
    }
}

class Inventories {
    constructor() {
        //First product in the list
        this.first = null;
        //How many are there products?
        this._num = 0;
    }

    // Check if a product with the given code exists
    _exists(codeProduct) {
        let aux = this.first;
        while (aux !== null) {
            if (aux.codeProduct === codeProduct) {
                return true;
            }
            aux = aux.next;
        }
        return false;
    }

    _adding(product, nodeX){
        if(!nodeX){
            return null;
        }
        if(product.codeProduct < nodeX.codeProduct){
            if(nodeX.previous === null){
                //Change as first product to the next product
                nodeX.previous = product;
                product.next = nodeX;
                this.first = product;
            }else{
                product.previous = nodeX.previous;
                product.previous.next = product;
                product.next = nodeX;
                nodeX.previous = product;

            }
            console.log(product);
            //Count
            this._num = this._countElements(this.first);
            console.log("There are: " + this._num);
            return true;
        }
        if(nodeX.next === null){
            nodeX.next = product;
            product.previous = nodeX;
            //Count
            this._num = this._countElements(this.first);
            console.log("There are: " + this._num);
            console.log(product);

            return true;
        }
        this._adding(product, nodeX.next);
    }


    // Add the product
    add(product) {
        if(this.first === null){
            this.first = product;
            //count
            this._num = this._countElements(this.first);
            console.log("There are: " + this._num);
            return true;
        }
        //Validate if the product is in the inventory
        if(!this._exists(product.codeProduct)){
            return this._adding(product,this.first);
        }
        return null;
    }

    _listing(nodeX){
        if(nodeX === null){
            return "";
        }
        //Recursively
        return nodeX.info() + this._listing(nodeX.next);
    }

    _listingRev(nodeX){
        if(nodeX === null){
            return "";
        }
        //Recursively
        return this._listingRev(nodeX.next) + nodeX.info();
    }

    // Return all the products in the inventory
    list() {
        if(this.first === null){
            return null;
        }
        return this._listing(this.first);
    }

    // Return all the products in reverse in the inventory
    listRev() {
        if(this.first === null){
            return null;
        }
        return this._listingRev(this.first);
    }

    _lookingFor(code, nodeX){
        //The product to find not exists;
        if(nodeX === null){
            return null;
        }
        //If the product is found
        if(nodeX.codeProduct === code){
            return nodeX;
        }
        //Recursively
        return this._lookingFor(code, nodeX.next);
    }

    // Return info about a specific product
    lookFor(code) {
        if (this.first === null) {
            return null;
        }
        return this._lookingFor(code, this.first);
    }

    extractFirst() {
        if (this.first === null) {
            return null;
        }
        if(this.first.next === null){
            let unique = this.first;
            this.first = null;
            return unique;
        }
        //Store the previous first product
        let extracted = this.first;
        //Change to its following product
        this.first = this.first.next;
        //Set null to their previous
        this.first.previous = null;
        //count
        this._num = this._countElements(this.first);
        return extracted;
    }

    //Private method to get the Penultimate product of the list
    _getPenultimate(nodeX){
        if(nodeX.next === null){
            return nodeX.previous;
        }
        return this._getPenultimate(nodeX.next);
    }

    extractLast() {
        if (this.first === null) {
            return null;
        }
        if(this.first.next === null){
            let unique = this.first;
            this.first = null;
            return unique;
        }
        //Store the penultimate product
        let penultimate = this._getPenultimate(this.first);
        //Store the last product
        let extracted = penultimate.next;
        //Set the null value in the attribute "next" from the penultimate product;
        penultimate.next = null;
        //count
        this._num = this._countElements(this.first);
        console.log("There are: " + this._num);
        return extracted;
    }

    _deleting(code, nodeX){
        if(!nodeX) {
            return null;
        }
        if(code === nodeX.codeProduct){
            if(nodeX.previous === null) {
                this.extractFirst();
            }else if(nodeX.next === null){
                this.extractLast();
            }else{
                nodeX.previous.next = nodeX.next;
                nodeX.next.previous = nodeX.previous;
            }
            //count
            this._num = this._countElements(this.first);
            console.log("There are: " + this._num);
            return true;
        }
        return this._deleting(code, nodeX.next);
    }

    //Delete a specific product by its code
    delete (code){
        if(this.first === null){
            return null;
        }
        return this._deleting(code, this.first);
    }

    //Private Method
    _countElements(nodeX){
        if(nodeX === null){
            return 0;
        }
        return 1+  this._countElements(nodeX.next);
    }

}
