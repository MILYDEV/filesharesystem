// Function to handle file upload from app.html to folder CHAMBER
function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
  
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    // Replace 'upload.php' with the appropriate server-side script to handle file upload
    fetch('upload.php', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message); // Display server response, e.g., "File uploaded successfully!"
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  // Function to fetch file data from the server (hosting) and populate the admin.html table
  function populateFilesTable() {
    // Replace 'get_files.php' with the appropriate server-side script to get file data from the CHAMBER folder
    fetch('get_files.php')
      .then(response => response.json())
      .then(data => {
        const table = document.querySelector('table');
        table.innerHTML = `
          <tr>
            <th>File Name</th>
            <th>Type/Format</th>
            <th>Last Modified</th>
            <th>Size</th>
            <th>Download</th>
          </tr>
        `;
  
        data.forEach(file => {
          const { name, type, lastModified, size } = file;
          const formattedDate = new Date(lastModified).toLocaleString();
  
          const row = `
            <tr>
              <td>${name}</td>
              <td>${type}</td>
              <td>${formattedDate}</td>
              <td>${(size / 1024).toFixed(2)} KB</td>
              <td><a href="CHAMBER/${name}" download>Download</a></td>
            </tr>
          `;
  
          table.innerHTML += row;
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  // Function to update the realtime clock in app.html
  function updateRealtimeClock() {
    const realtimeClock = document.getElementById('realtimeClock');
  
    function updateClock() {
      const currentTime = new Date();
      const formattedTime = currentTime.toLocaleString();
      realtimeClock.textContent = `Realtime Clock: ${formattedTime}`;
    }
  
    updateClock();
    setInterval(updateClock, 1000); // Update every second
  }
  
  // Call functions to populate the table and update the realtime clock
  populateFilesTable();
  updateRealtimeClock();
  
  // Function to delete a file
function deleteFile(fileName) {
    // Replace 'delete.php' with the appropriate server-side script to handle file deletion
    fetch('delete.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileName: fileName }),
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message); // Display server response, e.g., "File deleted successfully!"
      populateFilesTable(); // Refresh the table after deletion
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  // Function to add delete button to each row in the table
  function addDeleteButtonToRows() {
    const table = document.querySelector('table');
    const rows = table.getElementsByTagName('tr');
  
    for (let i = 1; i < rows.length; i++) {
      const deleteCell = rows[i].insertCell();
      deleteCell.innerHTML = '<button onclick="deleteFile(\'' + rows[i].cells[0].innerText + '\')">Delete</button>';
    }
  }
  
  // Call functions to populate the table, update the realtime clock, and add delete buttons
  populateFilesTable();
  updateRealtimeClock();
  addDeleteButtonToRows();
  