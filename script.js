let sortBy = "None";

// Stringified JSON object that holds initial cards
let cars =
  '[{"carName":"Tesla Model X","imageURL":"https://bit.ly/3uWMnVB","price":"130000"},{"carName":"Jeep Rubicon","imageURL":"https://bit.ly/3wfgjN6","price":"70000"},{"carName":"Tesla Model 3","imageURL":"https://bit.ly/3w4C41Q","price":"65000"},{"carName":"Audi R8","imageURL":"https://bit.ly/34dKatb","price":"170000"}]';
// Parse the stringy JSON
let cards = JSON.parse(cars);

// Find reference to cards container
let cardsContainer = document.getElementById("cards");

// Render Cards
function renderCards() {
  // Clear the container
  cardsContainer.innerHTML = "";
  // Add initial cards
  if (cards.length > 0) {
    cards.forEach((result, index) => {
      // Create HTML for new card
      const newCardHTML = `
          <div class="card">
            <button onClick="deleteOneCard(${index})"class="deleteCard">✖️ Delete</button>
            <img src="${result.imageURL}" alt="${result.carName}" style="width: 100%" />
            <div class="card_container">
              <h4><b>${result.carName}</b></h4>
              <p>$${Number(result.price).toLocaleString()}</p>
            </div>
          </div>
      `;

      // Add new card to cards container
      cardsContainer.innerHTML += newCardHTML;
    });
  } else {
    // Rednder no cards to show
    cardsContainer.innerHTML = `
    <div class="noCards">
      No cards to show 😕
    </div>
`;
  }
}

// Delete all showing cards
function deleteAllCards() {
  cards.splice(0, cards.length);
  renderCards();
}

// Delete selected card
function deleteOneCard(index) {
  cards.splice(index, 1);
  renderCards();
}

// Add card from form
function addCar() {
  // Check all fields are filled out
  if (
    document.getElementById("carname").value.length > 0 &&
    document.getElementById("imgurl").value.length > 0 &&
    document.getElementById("price").value.length > 0
  ) {
    // Check image image URL is valid
    if (
      document.getElementById("imgurl").value.startsWith("https://") ||
      document.getElementById("imgurl").value.startsWith("http://")
    ) {
      // Add car object to array
      cards.push({
        carName: document.getElementById("carname").value,
        imageURL: document.getElementById("imgurl").value,
        price: document.getElementById("price").value,
      });
      clearForm();
      // Sort Cards
      if (sortBy == "Price") {
        sortByPrice();
      } else if (sortBy == "Name") {
        sortByName();
      } else {
        renderCards();
      }
    } else {
      alert("Please enter a valid Image URL!");
    }
  } else {
    alert("Please fill out all fields including Name, Image URL, and Price!");
  }
}

// Reset the form fields
function clearForm() {
  document.getElementById("carname").value = "";
  document.getElementById("imgurl").value = "";
  document.getElementById("price").value = "";
}

// Sort cards by car name
function sortByName() {
  sortBy = "Name";
  cards.sort((a, b) => (a.carName.toLowerCase() > b.carName.toLowerCase() ? 1 : -1));
  renderCards();
}

// Sort cards by price
function sortByPrice() {
  sortBy = "Price";
  cards.sort((a, b) => (parseInt(a.price) > parseInt(b.price) ? 1 : -1));
  renderCards();
}

renderCards();
