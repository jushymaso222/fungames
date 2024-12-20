const gameTitle = document.getElementById('game-title');
let originalGame = gameTitle.textContent;
console.log(originalGame);

// Change the title text to "Restart?" on hover
gameTitle.addEventListener('mouseenter', () => {
gameTitle.textContent = "Restart?";
});

// Restore the title text when hover ends
gameTitle.addEventListener('mouseleave', () => {
gameTitle.textContent = originalGame; // Replace with the original game title
});

// Refresh the page when the title is clicked
gameTitle.addEventListener('click', () => {
location.reload(); // Refresh the page
});