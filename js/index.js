$(document).ready(function() {
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


  function showCar(car) {
    const carModelLowerCase = car.model.split("-").join("").toLowerCase();

    let output = `
      <div class="col card-col">
        <div class="card h-100">
          <img 
            src="./img/${carModelLowerCase}.jpeg" 
            class="card-img-top" 
            alt="Image of the car ${car.brand} ${car.model}"
          />
          <div class="card-body">
            <h5 class="card-title" id="${car.model}-name">${car.brand} ${car.model}</h5><br />
            <p class="card-text">Category: <span id="${car.model}-category">${car.category}</span></p>
            <p class="card-text">Mileage: <span id="${car.model}-mileage">${car.mileage} Km</span></p>
            <p class="card-text">Fuel type: <span id="${car.model}-fuel">${car.fuelType}</span></p>
            <p class="card-text">Price per day: A$<span id="${car.model}-price">${car.pricePerDay}</span>.00</p>
            <button id="btn-${car.model}" class="btn-reserve">Reserve</button>
          </div>
        </div>
      </div>
    `;
    $('.card-row').append(output);

    $(`#btn-${car.model}`).click(() => { 
      
      let carName = $(`#${car.model}-name`).text();
      let carMileage = $(`#${car.model}-mileage`).text();
      let carFuel = $(`#${car.model}-fuel`).text();
      let carPrice = $(`#${car.model}-price`).text();
      let carModel = car.model;
      let carStatus = car.availability;
      let carTag = carName.replace(/ /g, "").toLowerCase();
      
      let carObject = {
        tag: carTag,
        name: carName,
        model: carModel,
        mileage: carMileage,
        fuel: carFuel,
        price: parseInt(carPrice),
        inCart: 0,
      }

      if (carStatus) {
        storeCar(carObject);
        calculateTotalCost(carObject);
        updateCartCount(carObject);
        alert(`${carObject.name} was successfuly added to the cart.`)
      } else {
        alert("This car is currently unavailable. Please select another car.");
      }
    });   
  }

  function storeCar(car) {
    let cars = sessionStorage.getItem('cars');
    cars = JSON.parse(cars);

    if (cars != null) {
      if (cars[car.tag] == undefined) {
        cars = {
          ...cars,
          [car.tag]: car
        }
      }
      cars[car.tag].inCart += 1;
    } else {
      car.inCart = 1;
      cars = {
        [car.tag]: car
      }
    }

    sessionStorage.setItem("cars", JSON.stringify(cars));
  }


  function calculateTotalCost(car) {
    let cartCost = sessionStorage.getItem('totalCost');
    
    if (cartCost != null) {
      cartCost = parseInt(cartCost);
      sessionStorage.setItem('totalCost', cartCost += car.price);
    } else {
      sessionStorage.setItem('totalCost', car.price);
    }
  }

  
  function updateCartCount(car) {
    let totalInCart = sessionStorage.getItem('totalInCart'); // returns a string
    
    if (totalInCart != null) {
      totalInCart = parseInt(totalInCart);
      sessionStorage.setItem('totalInCart', totalInCart + 1);
      $('.cart-count').text(sessionStorage.getItem('totalInCart'));
    } else {
      sessionStorage.setItem('totalInCart', car.inCart);
      $('.cart-count').text(sessionStorage.getItem('totalInCart'));
    }
    
  }


  function displayCart() {
    let cars = sessionStorage.getItem('cars');
    cars = JSON.parse(cars);
    
    if (Object.keys(cars).length > 0) {
      $('.cart-table').removeClass('hidden');
      $('.btn-checkout').removeClass('hidden');
    }

    let cartOutput = "";
    let checkoutOutput = "";

    if (cars) {
      Object.values(cars).map(car => {
        cartOutput += `
          <tr id="${car.tag}" class="car-row">
            <td><img src="./img/${car.model}.jpeg" alt="Thumbnail of the car ${car.name}"></td>
            <td>${car.name}</td>
            <td>${car.inCart}</td>
            <td>$${car.price}.00</td>
            <td><input id="rent-days-${car.tag}" class="rent-days" type="number" value="1" min="1" max="31"></td>
            <td><button id="${car.tag}" class="btn-remove">Remove</button></td>
          </tr>
        `;
 
        checkoutOutput += `
          <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 class="my-0">${car.name}</h6>
              <small class="text-muted">Quantity: ${car.inCart}</small>
            </div>
            <span class="text-muted">$${car.price * car.inCart}.00</span>
          </li>
        `;
      });
    } 

    $('.checkout-list').prepend(checkoutOutput);
    $('.cart-table > tbody').append(cartOutput);
    $('.cart-count').text(sessionStorage.getItem('totalInCart'));
    
    $(`.btn-remove`).click((e) => {
      let totalCost = sessionStorage.getItem('totalCost');
      totalCost = parseInt(totalCost);

      let totalInCart = sessionStorage.getItem('totalInCart');
      totalInCart = parseInt(totalInCart);

      let row = e.target.parentElement.parentElement;
      
      let carName = row.childNodes[3].innerText;
      carName = carName.split(" ").join("").toLowerCase();

      sessionStorage.setItem('totalInCart', totalInCart - cars[carName].inCart);
      sessionStorage.setItem('totalCost', totalCost - cars[carName].price);

      delete cars[carName];
      row.remove();

      sessionStorage.setItem('cars', JSON.stringify(cars));
      location.reload();
    });
  };
  displayCart();


  function displayCheckout() {
    let cars = sessionStorage.getItem('cars');
    cars = JSON.parse(cars);

    let totalCost = sessionStorage.getItem('totalCost');

    if (totalCost == null) {
      $('.payment-span').text(0);
    } else {
      $('.payment-span').text(`$${totalCost}.00`);
    }

    $('.btn-checkout').click(() => {
      if (Object.keys(cars).length > 0) {
        window.location.href = './checkout.html';
      } else {
        alert("Please add a car to proceed to payment.")
      }
    });
  }
  displayCheckout();
});
