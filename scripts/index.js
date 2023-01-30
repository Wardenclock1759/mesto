const likeButtons = document.querySelectorAll(".elements__like-button"); 

likeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        button.classList.toggle("elements__like-button_active")
    });
});