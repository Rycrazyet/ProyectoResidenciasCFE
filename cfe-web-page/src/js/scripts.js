// This file contains JavaScript code for interactivity and dynamic behavior on the web page.

document.addEventListener('DOMContentLoaded', function() {
    // Example: Handle a button click event
    const button = document.getElementById('myButton');
    if (button) {
        button.addEventListener('click', function() {
            alert('Button clicked!');
        });
    }

    // Example: Fetch data from an API and display it
    fetch('https://api.example.com/data')
        .then(response => response.json())
        .then(data => {
            const output = document.getElementById('output');
            if (output) {
                output.innerHTML = JSON.stringify(data);
            }
        })
        .catch(error => console.error('Error fetching data:', error));

    const slides = document.querySelector('.slides');
    const images = document.querySelectorAll('.slides img');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    let currentIndex = 0;

    // Function to show the current slide
    function showSlide(index) {
        const totalSlides = images.length;
        currentIndex = (index + totalSlides) % totalSlides; // Wrap around if index is out of bounds
        slides.style.transform = `translateX(${-currentIndex * 100}%)`;
    }

    // Event listeners for navigation buttons
    prevButton.addEventListener('click', () => showSlide(currentIndex - 1));
    nextButton.addEventListener('click', () => showSlide(currentIndex + 1));

    // Automatically move to the next slide every 10 seconds
    setInterval(() => {
        showSlide(currentIndex + 1);
    }, 10000); // 10000ms = 10 seconds
});