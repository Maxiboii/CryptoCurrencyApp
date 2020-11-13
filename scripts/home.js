const exchangesURL = "https://api.coingecko.com/api/v3/exchanges"


function addToPage(data) {
  let div = document.createElement('div')
  let table = document.createElement('table')
  for (key in data) {
    let image = document.createElement('img')
    let button = document.createElement('button')
    const tr = document.createElement('tr')
    const icon = document.createElement('td')
    const name = document.createElement('td')
    const amount = document.createElement('td')
    const buttonTd = document.createElement('td')
    image.setAttribute('src', data[key].image)
    icon.appendChild(image)
    name.textContent = data[key].name
    amount.textContent =  data[key].trade_volume_24h_btc_normalized
    button.textContent = 'Detail (open modal)'
    button.setAttribute('data-btn', 'detail')
    button.setAttribute('data-id', key)

    buttonTd.appendChild(button)

    tr.appendChild(icon)
    tr.appendChild(name)
    tr.appendChild(amount)
    tr.appendChild(buttonTd)
    table.appendChild(tr)
  }
  div.appendChild(table)
  document.querySelector('.main').appendChild(div)
}


fetch(exchangesURL, {
  method: "GET",
})
.then(response => response.json()) 
.then(json => {
  addToPage(json)
  return json
})
.catch(err => console.log(err))

