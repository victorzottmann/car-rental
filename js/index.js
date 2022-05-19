$(document).ready(function() {

  function showCar(car) {
    let carAvailable = car.availability ? "Available" : "Unavailable";
    let className = car.availability ? "car-available" : "car-unavailable";
  
    const carModelLowerCase = car.model.split("-").join("").toLowerCase();

    let output = `
      <div class="col">
        <div class="card h-100">
          <img 
            src="./img/${carModelLowerCase}.jpeg" 
            class="card-img-top" 
            alt="Image of the car ${car.brand} ${car.model}"
          />
          <div class="card-body">
            <h5 class="card-title" id="${car.model}-name">${car.brand} ${car.model}</h5><br />
            <p class="card-text">Mileage: <span id="${car.model}-mileage">${car.mileage} Km</span></p>
            <p class="card-text">Fuel type: <span id="${car.model}-fuel">${car.fuelType}</span></p>
            <p class="card-text">Price per day: <span id="${car.model}-price">${car.pricePerDay}</span></p>
            <p class="card-text"><span class="${className}">${carAvailable}</span></p>
            <button id="btn-${car.model}" class="btn-reserve">Reserve</button>
          </div>
        </div>
      </div>
    `;
    $('.row').append(output);

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
        price: parseFloat(carPrice),
        inCart: 0,
      }

      if (carStatus) {
        updateCartCount();
        storeItem(carObject);
        calculateTotalCost(carObject);
        alert(`${carObject.name} was successfuly added to the cart.`)
      } else {
        alert("This car is currently unavailable. Please select another car.");
      }
    });
    
  }

  function storeItem(carObject) {
    let cartItems = sessionStorage.getItem('cars');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
      if (cartItems[carObject.tag] == undefined) {
        cartItems = {
          ...cartItems,
          [carObject.tag]: carObject
        }
      }
      cartItems[carObject.tag].inCart += 1;
    } else {
      carObject.inCart = 1;
      cartItems = {
        [carObject.tag]: carObject
      }
    }

    sessionStorage.setItem("cars", JSON.stringify(cartItems));
  }

  
  function calculateTotalCost(carObject) {
    let cartCost = sessionStorage.getItem('totalCost');
    
    if (cartCost != null) {
      cartCost = parseFloat(cartCost);
      sessionStorage.setItem('totalCost', cartCost += carObject.price);
    } else {
      sessionStorage.setItem('totalCost', carObject.price);
    }
  }


  function displayCart() {
    let totalInCart = sessionStorage.getItem('carsAddedToCart');
    let cartCost = sessionStorage.getItem("totalCost");
    let cartItems = sessionStorage.getItem('cars');
    cartItems = JSON.parse(cartItems);
    
    let output = "";
    let basket = "";

    let table = document.querySelector('.cart-table');

    if (cartItems && table) {
      Object.values(cartItems).map(car => {
        output += `
        <tr id="${car.tag}" class="car-row">
          <td><img src="./img/${car.model}.jpeg" alt=""></td>
          <td>${car.name}</td>
          <td>
            <button class="btn-quantity btn-quantity-minus">-</button>
            ${car.inCart}
            <button class="btn-quantity btn-quantity-plus">+</button>
          </td>
          <td>$${car.price}.00</td>
          <td><input type="number" value="1" min="1" max="31"></td>
          <td>$${car.price * car.inCart}.00</td>
          <td><button id="${car.tag}" class="btn-remove">Remove</button></td>
        </tr>
        `;
      });

      basket += `
        <div class="basket-total-container">
          <p class="basket-total-title">
            Cart Total:
          </p>
          <p class="basket-total">
            $${cartCost}.00
          </p>
        </div>
      `;
    }

    removeFromCart();

    $('.cart-table').append(output);
    $('.cart-container').append(basket);
    $('.cart-count').text(sessionStorage.getItem('carsAddedToCart'));
  }
  displayCart();


  function removeFromCart() {
    let removeButtons = document.querySelectorAll('.btn-remove');

    let totalInCart = sessionStorage.getItem('carsAddedToCart');
    let cartCost = sessionStorage.getItem("totalCost");
    let cartItems = sessionStorage.getItem('cars');
    cartItems = JSON.parse(cartItems);

    let productName;

    console.log('[total in cart]', totalInCart);

    for(let i=0; i < removeButtons.length; i++) {
      removeButtons[i].addEventListener('click', () => {
        let row = removeButtons[i].parentElement.parentElement;

        productName = removeButtons[i].parentElement.parentElement.childNodes[3].innerText;
        productName = productName.split(" ").join("").toLowerCase();

        let totalInCartUpdate = totalInCart - cartItems[productName].inCart;
        let totalCostUpdate =  cartCost - (cartItems[productName].price * cartItems[productName].inCart);
        console.log(totalCostUpdate);
        sessionStorage.setItem('carsAddedToCart', totalInCartUpdate);

        $('.basket-total').text(`$${totalCostUpdate}.00`);
        sessionStorage.setItem('totalCost', totalCostUpdate);

        delete cartItems[productName];
        row.remove();
        sessionStorage.setItem('cars', JSON.stringify(cartItems));

        onLoadCartCount();
      });
    }
  }
  removeFromCart();


  function onLoadCartCount() {
    let totalAddedToCart = sessionStorage.getItem('carsAddedToCart'); // returns a string
    if (totalAddedToCart) {
      $('.cart-count').text(totalAddedToCart)
    }
  }


  function updateCartCount() {
    let totalAddedToCart = sessionStorage.getItem('carsAddedToCart'); // returns a string
    totalAddedToCart = parseInt(totalAddedToCart);
    
    if (totalAddedToCart) {
      sessionStorage.setItem('carsAddedToCart', totalAddedToCart += 1);
      $('.cart-count').text(totalAddedToCart)
    } else {
      sessionStorage.setItem('carsAddedToCart', 1);
      $('.cart-count').text(1)
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

  onLoadCartCount();
});





