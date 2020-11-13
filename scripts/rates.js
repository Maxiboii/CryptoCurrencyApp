const exchangeValuesURL = 'https://api.coingecko.com/api/v3/exchange_rates'

function addToPage(data) {
  let div = document.createElement('div')
  let ul = document.createElement('ul')
  for (key in data) {
    let li = document.createElement('li')
    li.textContent = `(${data[key].unit}) ${data[key].name} -- ${data[key].value} (${data[key].type})`
    let button = document.createElement('button')
    button.textContent = 'Details (open modal)'

    li.appendChild(button)
    ul.appendChild(li)
  }
  div.appendChild(ul)
  document.querySelector('.main').appendChild(div)
}

fetch(exchangeValuesURL, {
  method: "GET",
})
.then(response => response.json()) 
.then(json => {
  addToPage(json.rates)
  console.log(json)
  return json
})
.catch(err => console.log(err))