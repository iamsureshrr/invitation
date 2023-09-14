// Initialize an empty array to store the received data
let receivedData = [];

// Function to update the welcome message and store data
function updateWelcomeMessage() {
  const nameInput = document.getElementById('name-input').value;
  const welcomeMessage = document.getElementById('welcome-message');

  if (nameInput.trim() === '') {
    alert('Please enter your name.');
  } else {
    // Create a new object to represent the received data
    const newData = {
      name: nameInput,
      // Add other properties as needed
    };

    // Add the new data to the array
    receivedData.push(newData);

    // Convert the array to a JSON string
    const jsonData = JSON.stringify(receivedData);

    // Store the JSON data in your preferred storage mechanism
    // For example, you can store it in local storage:
    localStorage.setItem('receivedData', jsonData);

    // Update the welcome message
    welcomeMessage.textContent = `Warm welcome😍 ${nameInput} and to your family, Together with our families, We invite you to share this day of happiness!`;
  }
}

// Event listener for the submit button
const updateButton = document.getElementById('update-button');
updateButton.addEventListener('click', updateWelcomeMessage);

// Show the modal after 2 seconds
setTimeout(function() {
  $('#nameModal').modal('show');
}, 2000);
