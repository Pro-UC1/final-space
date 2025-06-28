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
  // Get the selected start date from the input
  const selectedDate = startInput.value;

  // If no date is selected, show a message and stop
  if (!selectedDate) {
    const galleryDiv = document.getElementById('gallery');
    if (galleryDiv) {
      galleryDiv.innerHTML = `<p>Please select a date first.</p>`;
    }
    return;
  }

  // Build the API URL with the selected date
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${selectedDate}`;

  // Fetch the NASA image for the selected date
  fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log('NASA APOD data:', data);

      const galleryDiv = document.getElementById('gallery');
      if (galleryDiv) {
        // Check if the media is an image
        if (data.media_type === 'image') {
          galleryDiv.innerHTML = `
            <h2>${data.title}</h2>
            <img src="${data.url}" alt="${data.title}" style="max-width:100%;">
            <p>${data.explanation}</p>
          `;
        } else {
          // If it's not an image (e.g., a video), show a message
          galleryDiv.innerHTML = `
            <h2>${data.title}</h2>
            <p>This date's media is not an image. Try another date!</p>
          `;
        }
      }
    })
    .catch(function(error) {
      console.error('Error fetching NASA data:', error);
      const galleryDiv = document.getElementById('gallery');
      if (galleryDiv) {
        galleryDiv.innerHTML = `<p>Sorry, something went wrong loading the NASA image.</p>`;
      }
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
