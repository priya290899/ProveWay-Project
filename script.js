// Get all box elements
const boxes = document.querySelectorAll('.box, .bottombox, .midbox');

// Disable all radio buttons initially
boxes.forEach(box => {
    box.querySelector('input[type="radio"]').disabled = true;
});

// Add click event listener to each box
boxes.forEach(box => {
    box.addEventListener('click', function () {
        const isExpanded = this.classList.contains('expanded');

        // Toggle the expanded class for the clicked box
        this.classList.toggle('expanded');
        this.classList.toggle('border'); // Toggle border class

        // Enable or disable radio button for the selected box
        this.querySelector('input[type="radio"]').disabled = isExpanded;

        // Reset other boxes and hide their dropdowns
        boxes.forEach(otherBox => {
            if (otherBox !== this) {
                otherBox.classList.remove('expanded', 'border');
                otherBox.querySelector('input[type="radio"]').disabled = true;
                otherBox.querySelector('.options select[name="size"]').style.display = 'none';
                otherBox.querySelector('.options select[name="Color"]').style.display = 'none';
            }
        });

        // Display or hide the size and color dropdowns based on the expanded class
        const sizeDropdown = this.querySelector('.options select[name="size"]');
        const colorDropdown = this.querySelector('.options select[name="Color"]');
        sizeDropdown.style.display = isExpanded ? 'none' : 'block';
        colorDropdown.style.display = isExpanded ? 'none' : 'block';
    });

    // Add change event listener to each size and color dropdown to update the selected value
    const dropdowns = box.querySelectorAll('.options select');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function (event) {
            // Stop the click event propagation to the box
            event.stopPropagation();
        });

        dropdown.addEventListener('change', function () {
            console.log(`Selected ${this.name}: ${this.value}`);
            // After selecting an option, close the dropdown and update its visibility
            this.style.display = 'none';
            this.closest('.expanded').classList.remove('expanded', 'border');
        });
    });
});
