const apiKey = "quBkEKlICyx8BY3DF8QQcT9YuNa9CimIvNcmiAmNg7676nNNEkFdm7Sn";  // Replace with your API key
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input input");

// Fullscreen Modal Elements
const modal = document.createElement("div");
modal.id = "fullscreen-modal";
modal.classList.add("modal");
modal.innerHTML = `
    <span class="close">&times;</span>
    <img class="modal-content" id="fullscreen-img">
`;
document.body.appendChild(modal);

const fullscreenImg = document.getElementById("fullscreen-img");
const closeModal = modal.querySelector(".close");

// Function to fetch images from API
async function fetchImages(query = "vintage") {
    const url = `https://api.pexels.com/v1/search?query=${query}&per_page=30`;
     
    const response = await fetch(url, {
        headers: {
            Authorization: apiKey
        }
    });

    const data = await response.json();
    displayImages(data.photos);
}

// Function to display images dynamically
function displayImages(images) {
    gallery.innerHTML = "";  // Clear previous images

    images.forEach(image => {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");

        const imgElement = document.createElement("img");
        imgElement.src = image.src.large;
        imgElement.alt = image.photographer;
        imgElement.classList.add("gallery-img");

        // Event listener to open fullscreen modal
        imgElement.addEventListener("click", () => {
            fullscreenImg.src = imgElement.src;
            modal.style.display = "flex";
        });

        // Create download button
        const downloadButton = document.createElement("button");
        downloadButton.classList.add("download-button");
        downloadButton.innerText = "Download";

        // Create like button
        const likeButton = document.createElement("i");
        likeButton.classList.add("fa-regular", "fa-heart", "like-icon");

        // Toggle like button on click
        likeButton.addEventListener("click", () => {
            likeButton.classList.toggle("fa-regular");
            likeButton.classList.toggle("fa-solid");
            likeButton.classList.toggle("liked");
        });

        // Download functionality
        downloadButton.addEventListener("click", async () => {
            try {
                const response = await fetch(imgElement.src);
                const blob = await response.blob();

                const a = document.createElement("a");
                a.href = URL.createObjectURL(blob);
                a.download = "downloaded_image.jpg";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                URL.revokeObjectURL(a.href);
            } catch (error) {
                console.error("Download failed:", error);
            }
        });

        // Append elements to the container
        imageContainer.appendChild(imgElement);
        imageContainer.appendChild(likeButton);
        imageContainer.appendChild(downloadButton);

        gallery.appendChild(imageContainer);
    });
}

// Close fullscreen modal on click
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close modal when clicking outside the image
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Fetch default images on page load
fetchImages();

// Event listener for search functionality
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        fetchImages(searchInput.value);
    }
});
const images = document.querySelectorAll(".carousel-image");
const bullets = document.querySelectorAll(".bullet");
let currentIndex = 0;
let interval;

// Function to show a specific image
function showImage(index) {
    images.forEach(img => img.classList.remove("active"));
    bullets.forEach(b => b.classList.remove("active"));

    images[index].classList.add("active");
    bullets[index].classList.add("active");

    currentIndex = index;
}

// Auto-slide function
function startAutoSlide() {
    interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }, 3000); // Change image every 3 seconds
}
bullets.forEach((bullet, index) => {
    bullet.addEventListener("click", () => {
        clearInterval(interval); // Stop auto-slide on user interaction
        showImage(index);
    });
});
startAutoSlide();

