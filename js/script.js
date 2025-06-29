// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');

// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers to:
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)
setupDateInputs(startInput, endInput);

// NASA API key
const apiKey = 'OEpJ1dlF0E1klY25qJQbJgtvtnrVexTBySvQ3Gse';

// Find the "Get Space Images" button on the page
const getImagesButton = document.querySelector('.filters button');

// Add a click event listener to the button
getImagesButton.addEventListener('click', function() {
  // Get the selected start and end dates
  const startDate = startInput.value;
  const endDate = endInput.value;

  // Show a loading message
  const galleryDiv = document.getElementById('gallery');
  galleryDiv.innerHTML = `<div class="placeholder"><div class="placeholder-icon">🔄</div><p>Loading space photos…</p></div>`;

  // Build the API URL for a date range
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;

  // Fetch the NASA images for the selected date range
  fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // data is an array of APOD entries
      let galleryHTML = '';
      data.forEach(function(item, index) {
        if (item.media_type === 'image') {
          // Show the image
          galleryHTML += `
            <div class="gallery-item" style="cursor:pointer;" data-index="${index}">
              <h2>${item.title}</h2>
              <img src="${item.url}" alt="${item.title}" style="max-width:100%;">
              <p>${item.explanation}</p>
            </div>
          `;
        } else if (item.media_type === 'video') {
          // Show the video
          galleryHTML += `
            <div class="gallery-item">
              <h2>${item.title}</h2>
              <div class="video-wrapper">
                <iframe src="${item.url}" frameborder="0" allowfullscreen style="width:100%;height:315px;"></iframe>
              </div>
              <p>${item.explanation}</p>
            </div>
          `;
        }
      });
      galleryDiv.innerHTML = galleryHTML;

      // Add modal click events for images
      // Select all gallery items that are images
      const imageItems = galleryDiv.querySelectorAll('.gallery-item[style*="cursor:pointer"]');
      imageItems.forEach(function(itemDiv) {
        // Get the index from the data-index attribute
        const index = itemDiv.getAttribute('data-index');
        const apod = data[index];
        itemDiv.onclick = function() {
          showModal(apod.url, apod.title, apod.date, apod.explanation);
        };
      });
    })
    .catch(function(error) {
      // If there's an error, show a message
      console.error('Error fetching NASA data:', error);
      galleryDiv.innerHTML = `<p>Sorry, something went wrong loading the NASA images.</p>`;
    });
});

// Example: Fetch Astronomy Picture of the Day (APOD) from NASA API
// Build the API URL using template literals
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

// Use fetch to get data from the NASA API
fetch(apiUrl)
  .then(function(response) {
    // Convert the response to JSON
    return response.json();
  })
  .then(function(data) {
    // Log the data to the console so we can see what we got
    console.log('NASA APOD data:', data);

    // Find the gallery container to show the result
    const galleryDiv = document.getElementById('gallery');
    if (galleryDiv) {
      // Insert the title and image using template literals
      galleryDiv.innerHTML = `
        <h2>${data.title}</h2>
        <img src="${data.url}" alt="${data.title}" style="max-width:100%;">
        <p>${data.explanation}</p>
      `;
    }
  })
  .catch(function(error) {
    // Handle any errors
    console.error('Error fetching NASA data:', error);
    // Helpful for students: show a message on the page if something goes wrong
    const galleryDiv = document.getElementById('gallery');
    if (galleryDiv) {
      galleryDiv.innerHTML = `<p>Sorry, something went wrong loading the NASA image.</p>`;
    }
  });

// Helper function to show the modal with image details
function showModal(imageUrl, title, date, explanation) {
  // Get modal elements
  const modal = document.getElementById('modal');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDate = document.getElementById('modalDate');
  const modalExplanation = document.getElementById('modalExplanation');

  // Set modal content
  modalImage.src = imageUrl;
  modalImage.alt = title;
  modalTitle.textContent = title;
  modalDate.textContent = date ? `Date: ${date}` : '';
  modalExplanation.textContent = explanation;

  // Show the modal
  modal.style.display = 'flex';
}

// Helper function to hide the modal
function hideModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

// Wait until the page is fully loaded before adding modal event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Get the close button and modal elements
  const closeModalBtn = document.getElementById('closeModal');
  const modal = document.getElementById('modal');

  // When the close button is clicked, hide the modal
  if (closeModalBtn) {
    closeModalBtn.onclick = hideModal;
  }

  // When you click outside the modal content, hide the modal
if (modal) {
    modal.onclick = function(event) {
      // Only close if the background (not the content) is clicked
      if (event.target === modal) {
        hideModal();
      }
    };
  }

  // Array of fun space facts for "Did You Know?"
  const facts = [
    "Did you know? The Sun is 400 times larger than the Moon but is also 400 times farther away from Earth.",
    "Did you know? One day on Venus is longer than one year on Venus!",
    "Did you know? There are more stars in the universe than grains of sand on all the beaches on Earth.",
    "Did you know? Jupiter is so big that over 1,300 Earths could fit inside it.",
    "Did you know? Neutron stars can spin at a rate of 600 rotations per second.",
    "Did you know? The footprints on the Moon will be there for millions of years."
  ];

  // Pick a random fact from the array
  const randomFact = facts[Math.floor(Math.random() * facts.length)];

  // Find the "Did You Know?" section in the HTML
  const didYouKnowDiv = document.getElementById('didYouKnow');

  // Show the random fact in the section
  if (didYouKnowDiv) {
    didYouKnowDiv.textContent = randomFact;
  }
}); // <-- This closes the DOMContentLoaded event listener
