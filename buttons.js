document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('button');

    // Highlight the first button by default
    buttons[0].classList.add('highlight');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            buttons.forEach(btn => btn.classList.remove('highlight'));
            this.classList.add('highlight');
        });
    });
});
