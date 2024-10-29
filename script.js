

// Your existing JavaScript code
document.querySelectorAll('.skills-list li').forEach(function(item) {
    item.addEventListener('mouseover', function() {
        item.style.setProperty('--hover-color', item.getAttribute('data-color'));
    });
});
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('mouseover', function() {
        const previewContainer = document.querySelector('.preview-container');
        const previewImage = previewContainer.querySelector('.preview-image');
        previewImage.src = this.getAttribute('data-preview');
        previewContainer.style.display = 'flex';
    });

    link.addEventListener('mouseout', function() {
        const previewContainer = document.querySelector('.preview-container');
        previewContainer.style.display = 'none';
    });
});


// Initialize the slider