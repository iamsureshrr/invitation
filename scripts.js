// Define your GitHub repository information
const owner = 'iamsureshrr';
const repo = 'invitation';
const token = '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'; // Personal Access Token

// Initialize the user counter from localStorage or set it to 1 if not present
let userCounter = parseInt(localStorage.getItem('userCounter')) || 1;

// Function to receive user data and store it on GitHub
function processUserData() {
  // Function to update the welcome message and store user data
  function updateWelcomeMessageAndStoreData() {
    const nameInput = document.getElementById('name-input').value;
    const welcomeMessage = document.getElementById('welcome-message');

    if (nameInput.trim() === '') {
      alert('Please enter your name.');
    } else {
      welcomeMessage.textContent = `Warm welcome😍 ${nameInput} and to your family, Together with our families, We invite you to share this day of happiness!`;

      // Store user data on GitHub with a filename based on the user's input and order
      const filename = `user/user_${userCounter}_${nameInput}.json`;
      storeUserData(nameInput, filename);

      // Increment the user counter
      userCounter++;

      // Update the userCounter in localStorage
      localStorage.setItem('userCounter', userCounter);
    }
  }

  // Event listener for the submit button
  const updateButton = document.getElementById('update-button');
  updateButton.addEventListener('click', updateWelcomeMessageAndStoreData);

  // Show the modal after 2 seconds
  setTimeout(function() {
    $('#nameModal').modal('show');
  }, 2000);
}

// Function to store user data in the GitHub repository
function storeUserData(username, filename) {
  const data = {
    username: username,
    timestamp: new Date().toISOString(),
  };

  // Prepare the request to create or update the file
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filename}`;
  const requestOptions = {
    method: 'PUT',
    headers: {
      Authorization: `token ${token}`,
    },
    body: JSON.stringify({
      message: `Add user data for ${username}`,
      content: btoa(JSON.stringify(data)), // Encode data as base64
      branch: 'main', // Replace with your branch name
    }),
  };

  // Send the request to GitHub
  fetch(apiUrl, requestOptions)
    .then((response) => {
      if (response.status === 200) {
        console.log('User data stored successfully.');
      } else {
        console.error('Failed to store user data:', response.statusText);
      }
    })
    .catch((error) => {
      console.error('An error occurred:', error);
    });
}

// Call the main function to process user data
processUserData();
