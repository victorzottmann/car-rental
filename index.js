function addCarToList(cars) {
  const div = document.querySelector('.cars');
  const ul = document.createElement('ul');

  cars.forEach((car) => {
    let li = document.createElement('li');

    for(let i in car) {
      li.innerHTML += `
        <p><span class="property">${i}:</span> ${car[i]}</p>
      `;
    }

    ul.appendChild(li);
  })

  div.appendChild(ul);
}

function getCars() {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', './data/cars.json', true);
    
    xhr.onload = function () { 
      if (this.status == 200) {
        const data = JSON.parse(this.responseText);
        const cars = data.cars;
        
        addCarToList(cars);
      }
    }

    xhr.send();
  } catch (error) {
    console.log(error);
  }
}

getCars();