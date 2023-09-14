const owner = 'iamsureshrr'; // Replace with your GitHub username
const repo = 'invitation';   // Replace with your GitHub repository name
const filename = 'user_data.csv';
const token = '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'; // Replace with your GitHub PAT

const sampleData = ['Alice', 'Bob', 'Charlie'];

// Encode sample data for CSV format
const csvData = sampleData.join(',') + '\n';

// Define the API URL
const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filename}`;

// Prepare the request headers
const headers = new Headers({
  Authorization: `token ${token}`,
  Accept: 'application/vnd.github.v3+json',
});

// Create a PUT request to update the file
const requestBody = {
  message: 'Update sample data',
  content: btoa(csvData), // Encode data as base64
  branch: 'main',         // Replace with your branch name
};

const requestOptions = {
  method: 'PUT',
  headers: headers,
  body: JSON.stringify(requestBody),
};

// Send the PUT request
fetch(apiUrl, requestOptions)
  .then((response) => {
    if (response.status === 200) {
      console.log('Sample data updated in the GitHub repository.');
    } else {
      console.error('Failed to update sample data in the GitHub repository.');
    }
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });


  // Function to update the welcome message and save the username
  function updateWelcomeMessage() {
    const nameInput = document.getElementById('name-input').value;
    const welcomeMessage = document.getElementById('welcome-message');

    if (nameInput.trim() === '') {
      alert('Please enter your name.');
    } else {
      // Save the username to GitHub as CSV
      createGitHubCSV(nameInput);

      // Update the welcome message
      welcomeMessage.textContent = `Hi ${nameInput} and family, Together with our families, We invite you to share this day of happiness!`;
    }
  }

  // Event listener for the submit button
  const updateButton = document.getElementById('update-button');
  updateButton.addEventListener('click', updateWelcomeMessage);

  // Show the modal after 2 seconds
  setTimeout(function() {
    $('#nameModal').modal('show');
  }, 2000);