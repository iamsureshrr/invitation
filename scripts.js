const owner = 'iamsureshrr'; // Replace with your GitHub username
const repo = 'invitation';   // Replace with your GitHub repository name
const filename = 'user_data.csv';
const token = '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'; // Replace with your GitHub PAT

// Define the headers for GitHub API requests
const headers = new Headers({
  Authorization: `token ${token}`,
  Accept: 'application/vnd.github.v3+json',
});

// Rest of your code here...


// Function to update the welcome message and store user data in the CSV file
function updateWelcomeMessageAndStoreData() {
    const nameInput = document.getElementById('name-input').value;
    const welcomeMessage = document.getElementById('welcome-message');
  
    if (nameInput.trim() === '') {
      alert('Please enter your name.');
    } else {
      // Update the welcome message
      welcomeMessage.textContent = `Warm welcome😍 ${nameInput} and family, Together with our families, We invite you to share this day of happiness!`;
  
      // Append the new user data to the existing CSV content
      const csvData = `${nameInput}\n`;
      appendToGitHubCSV(csvData);
    }
  }
  
  // Event listener for the submit button
  const updateButton = document.getElementById('update-button');
  updateButton.addEventListener('click', updateWelcomeMessageAndStoreData);
  
  // Show the modal after 2 seconds
  setTimeout(function() {
    $('#nameModal').modal('show');
  }, 2000);
  
  // Function to append data to the GitHub CSV file
  function appendToGitHubCSV(dataToAppend) {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filename}`;
    
    fetch(apiUrl, { headers: headers })
      .then((response) => response.json())
      .then((fileInfo) => {
        const currentContent = atob(fileInfo.content);
        const updatedContent = currentContent + dataToAppend;
  
        const requestBody = {
          message: `Update CSV with username: ${nameInput}`,
          content: btoa(updatedContent),
          sha: fileInfo.sha,
          branch: 'main', // Replace with your branch name
        };
  
        const requestOptions = {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify(requestBody),
        };
  
        // Send the PUT request to update the CSV file
        fetch(apiUrl, requestOptions)
          .then((response) => {
            if (response.status === 200) {
              console.log('CSV file updated with new data:', dataToAppend);
            } else {
              console.error('Failed to update CSV file:', response.statusText);
            }
          })
          .catch((error) => {
            console.error('An error occurred:', error);
          });
      })
      .catch((error) => {
        console.error('An error occurred while retrieving file info:', error);
      });
  }
  