// Attach an event listener to the button
document.getElementById("showModalBtn").addEventListener("click", function () {
  // Make the HTTP request and display the table in a modal
  // ...

  // Make an HTTP GET request to the API endpoint
  fetch("https://dummy.restapiexample.com/api/v1/employees")
    .then((response) => response.json())
    .then((data) => {
      // Parse the response data
      const employees = data.data;

      // Create the HTML table
      const table = document.createElement("table");
      const thead = document.createElement("thead");
      const tbody = document.createElement("tbody");

      // Create the table header
      const headers = Object.keys(employees[0]);
      const headerRow = document.createElement("tr");
      headers.forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);

      // Populate the table with the retrieved data
      employees.forEach((employee) => {
        const row = document.createElement("tr");
        headers.forEach((header) => {
          const cell = document.createElement("td");
          cell.textContent = employee[header];
          row.appendChild(cell);
        });
        tbody.appendChild(row);
      });
      table.appendChild(tbody);

      // Show the table in a modal or popup
      // Here, I'm using the Bootstrap modal component for demonstration purposes
      const modal = document.createElement("div");
      modal.classList.add("modal", "fade");
      modal.innerHTML = `
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Employee Data</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="closeModalBtn">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body"></div>
            </div>
          </div>
        `;
      modal.querySelector(".modal-body").appendChild(table);
      document.body.appendChild(modal);

      // Show the modal
      $(modal).modal("show");

      // Close the modal when the close button is clicked
      const closeModalBtn = modal.querySelector("#closeModalBtn");
      closeModalBtn.addEventListener("click", () => {
        $(modal).modal("hide");
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
