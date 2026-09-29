export default class ToDos{

    #taskcount;
    #title;
    #description;
    #isChecked;
    #isZoomed;

    constructor(){
        this.#isChecked = false;
        this.#isZoomed = false;
        this.#title = "Buy groceries"
        this.#description = "Apples, milk, eggs, coffee beans"
        this.#taskcount++;
    }

    // Class method to toggle the checked status
    setZoomed(status) {
        if (!this.#isChecked){
            this.#isChecked = true;
            return true;
        }
        else{
            this.#isChecked = false;
            return false;
        }
    }  

    // Class method to toggle the checked status
    setCheck(status) {
        this.#isChecked = status;
    }   

    // Class method to update the title
    updateTitle(newTitle) {
        this.#title = newTitle;
    }

    // Getter method to read the private title field
    updateDescription(newDescription) {
        this.#description = newDescription;
    }

}