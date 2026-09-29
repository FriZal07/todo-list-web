import ToDos from './classes/todotask.js'

export default function ui_load() {
    const app = document.getElementById("app");
    
    // 1. Inject the HTML string
    app.innerHTML = 
    `   <div id="container">
            <div id="top_container">
                <button id="sidebar_toggle_button">☰</button>
                <button id="rightside_top_container">✚</button>
            </div>
            <div id="middle_container">
                <div id="left_container">
                </div>
                <div id="right_container">
                    <div id="right_container_boxes">
                    </div>
                </div>
            </div>
            <div id="bottom_container">
        
            </div>
        </div>
    `
    ;

    const togglebutton = document.getElementById("sidebar_toggle_button");
    const leftcontainer = document.getElementById("left_container");
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const addtasks = document.getElementById("rightside_top_container");

    function handleMediaQueryChange(event) {
        if (event.matches) { //mean if width is less than 768px, then dont mobile_bar_on bar
            leftcontainer.classList.remove("mobile_bar_on");
        }
        else { //mean if width is greater than 768px, then mobile_bar_on bar
            leftcontainer.classList.add("mobile_bar_on");
        }
    }

    addtasks.addEventListener("click", () => {
        add_task();
    })

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    togglebutton.addEventListener("click", () => {
        const mobilebaron = leftcontainer.classList.contains("mobile_bar_on");
        const desktopbaron = leftcontainer.classList.contains("desktop_bar_on");
        
        switch(true) {
            // --- DESKTOP LOGIC (mediaQuery.matches) ---

            case !desktopbaron && !mediaQuery.matches:
                leftcontainer.classList.add("desktop_bar_on");
                console.log("Desktop: Bar is now closed");
                break;
                
            // 2. If on desktop AND the bar is closed -> Show it
            case desktopbaron && !mediaQuery.matches:
                leftcontainer.classList.remove("desktop_bar_on"); 
                console.log("Desktop: Bar is now open");
                break;

            // --- MOBILE LOGIC (mediaQuery.matches) ---

            // 3. If on mobile AND the bar is shown -> Close it
            case mobilebaron && mediaQuery.matches:
                leftcontainer.classList.remove("mobile_bar_on");
                leftcontainer.classList.remove("desktop_bar_on"); // Failsafe cleanup
                console.log("Mobile: Bar is now closed");
                break;
                
            // 4. If on mobile AND the bar is closed (!mobilebaron) -> Show it
            case !mobilebaron && mediaQuery.matches:
                leftcontainer.classList.add("mobile_bar_on");
                leftcontainer.classList.remove("desktop_bar_on"); // Failsafe cleanup
                console.log("Mobile: Bar is now open"); 
                break;
    }});

    handleMediaQueryChange(mediaQuery);
}

export function add_task() {    

    const right_container_boxes = document.getElementById("right_container_boxes");

    // 1. Inject the HTML string
    right_container_boxes.insertAdjacentHTML('beforeend', `
                       <div class="todo_container">
                            <div class="todo_container_template">
                                <div class="todo_container_template_top">
                                    <input type="checkbox" class="todo_container_template_checkbox"></input>
                                    <div class="todo_container_template_top_left" contenteditable="true"></div>
                                    <div class="todo_container_template_top_right">
                                        <button class="todo_container_template_top_right_button clear">✖</button>
                                        <button class="todo_container_template_top_right_button zoom">🔍</button>
                                    </div>
                                </div>
                                <div class="todo_container_template_middle" contenteditable="true"></div>
                            </div>
                        </div>
    `);

    const currentTaskElement = right_container_boxes.lastElementChild;

    const todo_checklist = currentTaskElement.querySelector(".todo_container_template_checkbox");
    const todo_titlebox = currentTaskElement.querySelector(".todo_container_template_top_left");
    const todo_descriptionbox = currentTaskElement.querySelector(".todo_container_template_middle");
    const todo_deletebox = currentTaskElement.querySelector(".clear");
    const todo_magnifybox = currentTaskElement.querySelector(".zoom");

    let newTask = new ToDos();

    todo_deletebox.addEventListener("click", (event) => {
        if (!newTask.setZoomed()){
            right_container_boxes.classList.remove("zoomed-mode");
            currentTaskElement.classList.remove("active-zoom");

            currentTaskElement.remove();
            newTask = null;
        }
        else{
            currentTaskElement.remove();
            newTask = null;
        }
    });

    todo_magnifybox.addEventListener("click", (event) => {
        
        if (newTask.setZoomed()){
            right_container_boxes.classList.add("zoomed-mode");
            currentTaskElement.classList.add("active-zoom");
            console.log("zoomed in!!");
        }
        else{
            right_container_boxes.classList.remove("zoomed-mode");
            currentTaskElement.classList.remove("active-zoom");
            console.log("zoomed out!!");
        }
    });

    todo_checklist.addEventListener("change", (event) => {
        const isChecked = event.target.checked;
        newTask.setCheck();
        console.log(event.target.checked)
    });

    todo_titlebox.addEventListener("input", (event) => {
        const newTitle = event.target.innerText;
        newTask.updateTitle(newTitle);
        console.log(event.target.innerText)
    });

    todo_descriptionbox.addEventListener("input", (event) => {
        const newDesc = event.target.innerText;
        newTask.updateDescription(newDesc);
        console.log(event.target.innerText)
    });
    

}