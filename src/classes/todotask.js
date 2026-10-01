export default class ToDos{

    #uniqueid
    #title;
    #description;
    #isChecked;
    #isZoomed;

    constructor(){
        this.#uniqueid = Date.now().toString();
        this.#isChecked = false;
        this.#isZoomed = false;
        this.#title = "Buy groceries"
        this.#description = "Apples, milk, eggs, coffee beans"
    }


    toggleZoom() {
        if (!this.#isZoomed) {
            this.#isZoomed = true;
            return true;
        } else {
            this.#isZoomed = false;
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

    setuniqueId(uniqueid) {
        this.#uniqueid = uniqueid;
    }


    returnuniqueid() {
        return this.#uniqueid;
    }

    returnTitle() {
        return this.#title;
    }

    returnDescription() {
        return this.#description;
    }

    returnCheck() {
        return this.#isChecked;
    }


    updateFile() {
        const taskData = JSON.parse(localStorage.getItem('Task_Array')) || [];
        const index = taskData.findIndex(task => task.uniqueid === this.#uniqueid);
        
        console.log("Updating file for task with index:", index);

        // Map the current state
        const currentTaskState = {
            title: this.#title,
            description: this.#description,
            isChecked: this.#isChecked,
            isZoomed: this.#isZoomed,
            uniqueid: this.#uniqueid
        };

        if (index !== -1) {
            // The task exists, overwrite it
            taskData[index] = currentTaskState;
        } else {
            // The task doesn't exist yet, push it to the end of the array
            taskData.push(currentTaskState);
        }

        localStorage.setItem('Task_Array', JSON.stringify(taskData));
    }

    deleteFile() {
        let taskData = JSON.parse(localStorage.getItem('Task_Array')) || [];
        
        // 2. Filter the array to keep everything EXCEPT the task with this uniqueid
        taskData = taskData.filter(task => task.uniqueid !== this.#uniqueid);
        
        // 3. Save the newly filtered array back to storage
        localStorage.setItem('Task_Array', JSON.stringify(taskData));
    }

}