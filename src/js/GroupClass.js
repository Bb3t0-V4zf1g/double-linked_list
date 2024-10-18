class Student{
    constructor(name, numAccount) {
        this.name = name;
        this._numAccount = numAccount;
        this._next = null;
        this._previous = null;
    }
    info(){
        return `${this.name}, ${this._numAccount}; `;
    }

    set setNext(student){
        this._next = student;
    }

    get getNext(){
        return this._next;
    }

    set setPrevious(student){
        this._previous = student;
    }

    get getPrevious(){
        return this._previous;
    }

    get getNumAccount(){
        return this._numAccount;
    }
}

    //With recursive function
class Group{
    constructor() {
        this.first = null;
        this.last = null;
    }

    _adding(nodeX, newStd){
        if(nodeX.getNext === null){
            nodeX.setNext = newStd;
            newStd.setPrevious = nodeX;
        }else{
            return this._adding(nodeX.getNext, newStd);
        }
    }

    add(student){
        if(this.first === null){
            this.first = student;
        }else{
            this._adding(this.first, student);
        }
    }

    addBeforeOf(accountN, student){
        let reference = this.lookFor(accountN);
        if(this.lookFor(accountN)){
            if(reference.getPrevious === null){
                reference.setPrevious = student;
                student.setNext = reference;
                this.first = student;
            }else{
                student.setPrevious = reference.getPrevious;
                reference.getPrevious.setNext = student;
                reference.setPrevious = student;
                student.setNext = reference;
            }
        }
        return null;
    }

    addAfterOf(accountN, student){
        let reference = this.lookFor(accountN);
        if(this.lookFor(accountN)){
            if(reference.getNext === null){
                reference.setNext = student;
                student.setPrevious = reference;
            }else{
                student.setNext = reference.getNext;
                reference.getNext.setPrevious = student;
                reference.setNext = student;
                student.setPrevious = reference;
            }
        }
        return null;
    }

    listRev(){
        let result = "";
        let aux = this.first;
        //Li
        while(aux.getNext !== null){
            aux = aux.getNext;
        }
        while (aux !== null){
            result += aux.info();
            aux = aux.getPrevious;
        }
        return result;
    }

    list(){
        let result = "";
        let aux = this.first;
        while(aux !== null){
            result += aux.info();
            aux = aux.getNext;
        }
        return result;
    }

    lookFor(num){
        let aux = this.first;
        while(aux !== null){
            if(aux.getNumAccount === num){
                return aux;
            }
            //Change to the following nested element
            aux = aux.getNext;
        }
        return aux;
    }

    //Recursive
    _listing(nodoX) {
        if (nodoX.getNext === null) {
            return nodoX.info();
        } else {
            return nodoX.info() + this._listing(nodoX.getNext);
        }
    }

    //To list in reverse
    _listing2(nodoX) {
        if (nodoX.getNext === null) {
            return nodoX.info();
        } else {
            return this._listing2(nodoX.getNext) + nodoX.info();
        }
    }


    pullFirst(){
        let extracted = this.first;
        //Now the first element is its following nested element
        this.first = this.first.getNext;
        return extracted;
    }

    pullLast(){
        let extracted;
        let aux = this.first;
        while(aux.getNext.getNext !== null){
            aux = aux.getNext;
        }
        extracted = aux.getNext;
        aux.setNext = null;
        return extracted;
    }


    linkWith(num, student){
        let foundedStd = this.lookFor(num);
        let olderFllNested = foundedStd.getNext;
        // Link as following element to the element to be inserted
        foundedStd.setNext = student;
        student.setNext = olderFllNested;
    }
}

class Group2{
    constructor() {
        this.first = null;
    }

    _adding(nodeX, newStd){
        if(nodeX.getNext === null){
            nodeX.setNext = newStd;
            newStd.setPrevious = nodeX;
        }else{
            return this._adding(nodeX.getNext, newStd);
        }
    }

    add(student){
        if(this.first === null){
            this.first = student;
        }else{
            this.order(student);
        }
    }

    order(student){
        let aux = this.first;
        if(aux.getNumAccount < student.getNumAccount){
            while(aux.getNext !== null){
                if(aux.getNumAccount > student.getNumAccount){
                    student.setPrevious = aux.getPrevious;
                    aux.getPrevious.setNext = student;
                    student.setNext = aux;
                    aux.setPrevious = student;
                    return true;
                }
                aux = aux.getNext;
            }
            if(aux.getNumAccount < student.getNumAccount){
                aux.setNext = student;
                student.setPrevious = aux;
            }else{
                aux.getPrevious.setNext = student;
                student.setPrevious = aux.getPrevious;
                student.setNext = aux;
                aux.setPrevious = student;

            }
        }else{
            aux.setPrevious = student;
            student.setNext = aux;
            this.first = student;
        }
    }

    listRev(){
        let result = "";
        let aux = this.first;
        //Li
        while(aux.getNext !== null){
            aux = aux.getNext;
        }
        while (aux !== null){
            result += aux.info();
            aux = aux.getPrevious;
        }
        return result;
    }

    list(){
        let result = "";
        let aux = this.first;
        while(aux !== null){
            result += aux.info();
            aux = aux.getNext;
        }
        return result;
    }

    lookFor(num){
        let aux = this.first;
        while(aux !== null){
            if(aux.getNumAccount === num){
                return aux;
            }
            //Change to the following nested element
            aux = aux.getNext;
        }
        return aux;
    }

    //Recursive
    _listing(nodoX) {
        if (nodoX.getNext === null) {
            return nodoX.info();
        } else {
            return nodoX.info() + this._listing(nodoX.getNext);
        }
    }

    //To list in reverse
    _listing2(nodoX) {
        if (nodoX.getNext === null) {
            return nodoX.info();
        } else {
            return this._listing2(nodoX.getNext) + nodoX.info();
        }
    }


    pullFirst(){
        let extracted = this.first;
        //Now the first element is its following nested element
        this.first = this.first.getNext;
        return extracted;
    }

    pullLast(){
        let extracted;
        let aux = this.first;
        while(aux.getNext.getNext !== null){
            aux = aux.getNext;
        }
        extracted = aux.getNext;
        aux.setNext = null;
        return extracted;
    }


    linkWith(num, student){
        let foundedStd = this.lookFor(num);
        let olderFllNested = foundedStd.getNext;
        // Link as following element to the element to be inserted
        foundedStd.setNext = student;
        student.setNext = olderFllNested;
    }
}


const group = new Group2();

let std1 = new Student("A", 2323)
let std2 = new Student("B", 2324)
let std3 = new Student("C", 2325)
let std4 = new Student("D", 2326)
let std5 = new Student("E", 2327)
let std6 = new Student("F", 2328)

console.log(group.list());

group.add(std6)
group.add(std5)
group.add(std3)

console.log(group.list());

group.add(std4)
group.add(std1)

console.log(group.list());

group.add(std2)



console.log(group.list());
