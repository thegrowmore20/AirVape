document.addEventListener("DOMContentLoaded", function(){
    const element = document.querySelectorAll('.custom-wishlist-button');
    if (element) {
    element.forEach(element => {
        element.classList.remove('hidden');
    });
} 
})