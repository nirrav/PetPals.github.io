document.addEventListener('DOMContentLoaded', function () {
    // Retrieve pet index from URL query string
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const index = parseInt(urlParams.get('index'));

    // Load pets array from localStorage
    const pets = JSON.parse(localStorage.getItem('pets'));

    // Function to generate HTML for pet profile
    function generatePetProfile(pet) {
        // Generate pet profile HTML
        const profileHtml = `
            <!-- Updated HTML for pet profile -->
            <div class="col-md-6">
                <div class="pet-profile">
                    <img src="${pet.photo}" class="img-fluid" alt="Pet Image">
                    <h2>${pet.name}</h2>
                    <p>Animal: ${pet.animalType}</p>
                    <p>Age: ${pet.age} years</p>
                    <p>Color: ${pet.color}</p>
                    <p>Blood Group: ${pet.bloodGroup}</p>
                    <button id="uploadButton" class="btn btn-dark">Upload Photos</button>
                </div>
            </div>
        `;

        // Generate HTML for the note
        const noteHtml = `
            <div class="col-md-6">
                <div class="pet-note">
                    <h3>Note About ${pet.name}:</h3>
                    <p>${pet.note}</p>
                </div>
            </div>
        `;

        // Generate HTML for the image gallery
        const galleryHtml = `
            <div class="row-md-12 mt-4">
                <h1 class="gallery-title">Image Gallery</h1>
                <div id="imageGallery${index}" class="image-gallery"></div>
            </div>
        `;

        return profileHtml + noteHtml + galleryHtml;
    }

    // Render pet profile
    function renderPetProfile() {
        if (pets && index >= 0 && index < pets.length) {
            const pet = pets[index];
            const petProfileHtml = generatePetProfile(pet);
            document.getElementById('pet-profile').innerHTML = petProfileHtml;

            // Display images from local storage
            displayImagesFromLocalStorage(index);

            // Add event listener to upload button
            const uploadButton = document.getElementById('uploadButton');
            uploadButton.addEventListener('click', function () {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.multiple = true;
                input.onchange = function(event) {
                    handleFileSelect(event, index);
                };
                input.click();
            });
        } else {
            document.getElementById('pet-profile').innerHTML = "<p>No pet found.</p>";
        }
    }

    // Handle file selection for image gallery
    function handleFileSelect(event, petIndex) {
        const gallery = document.getElementById(`imageGallery${petIndex}`);
        const files = event.target.files;

        // Save image data to local storage
        const imageDataArray = JSON.parse(localStorage.getItem(`imageDataArray${petIndex}`)) || [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = function (e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.classList.add('gallery-image');
                gallery.appendChild(img);

                // Add image data to array
                imageDataArray.push(e.target.result);

                // Save image data array to local storage
                localStorage.setItem(`imageDataArray${petIndex}`, JSON.stringify(imageDataArray));
            };

            reader.readAsDataURL(file);
        }
    }

    // Display images from local storage
    function displayImagesFromLocalStorage(petIndex) {
        const imageDataArray = JSON.parse(localStorage.getItem(`imageDataArray${petIndex}`));

        if (imageDataArray && imageDataArray.length > 0) {
            const gallery = document.getElementById(`imageGallery${petIndex}`);

            imageDataArray.forEach(function(imageData) {
                const img = document.createElement('img');
                img.src = imageData;
                img.classList.add('gallery-image');
                gallery.appendChild(img);
            });
        }
    }

    // Load and render pet profile on page load
    renderPetProfile();
});
