let like_buttons = document.querySelectorAll(".elements__like-button"); 

for (let button of like_buttons) {
    button.addEventListener("click", () => {
        button.classList.toggle("elements__like-button_active")
    });
}