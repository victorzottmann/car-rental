function showCar(car) {
  let carAvailable = car.availability ? "Available" : "Unavailable";
  let className = car.availability ? "car-available" : "car-unavailable";

  let output = `
    <div class="col">
      <div class="card h-100">
        <img 
          src="./img/${car.model.split("-").join("").toLowerCase()}.jpeg" 
          class="card-img-top" 
          alt="Image of the car ${car.brand} ${car.model}"
        />
        <div class="card-body">
          <h5 class="card-title">${car.brand} ${car.model}</h5><br />
          <p class="card-text">Mileage: <span class="">${car.mileage} Km</span></p>
          <p class="card-text">Fuel type: <span>${car.fuelType}</span></p>
          <p class="card-text">Price per day: <span>${car.pricePerDay}</span></p>
          <p class="card-text"><span class="${className}">${carAvailable}</span></p>
          ${createReserveBtn(car)}
        </div>
      </div>
    </div>
  `;
  $('.row').append(output);
}

function createReserveBtn(car) {
  let available = car.availability;

  if (available) {
    return `<button class="btn-reserve">Add to Cart</button>`;
  } else {
    return "";
  }
}

(function getCars() {
  try {
    $.ajax({
      type: "GET",
      url: "../data/cars.json",
      success: ({ cars }) => cars.forEach(car => showCar(car))
    });
  } catch (error) {
    console.log(error);
  }
})();


