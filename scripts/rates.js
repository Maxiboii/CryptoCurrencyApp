const exchangeValuesURL = 'https://api.coingecko.com/api/v3/exchange_rates'

function addToPage(data) {
  let div = document.createElement('div')
  let table = document.createElement('table')
  for (key in data) {
    const tr = document.createElement('tr')
    const type = document.createElement('td')
    const unit = document.createElement('td')
    const name = document.createElement('td')
    const rate = document.createElement('td')
    type.textContent = data[key].type
    unit.textContent = data[key].unit
    name.textContent = data[key].name
    rate.textContent = data[key].value

    tr.append(type)
    tr.append(unit)
    tr.append(name)
    tr.append(rate)
    table.appendChild(tr)
  }
  div.appendChild(table)
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