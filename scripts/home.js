const exchangesURL = "https://api.coingecko.com/api/v3/exchanges"

let retrievedData


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
    button.textContent = 'Detail'
    button.setAttribute('data-btn', 'detail')
    button.setAttribute('data-id', data[key].id)

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
  const detailModal = $.modal({
    title: 'Detail',
    closable: true,
    width: '500px',
    footerButtons: [
        {text: 'Close', type: 'primary', handler() {
          detailModal.close()
        }}
    ]
  })


  document.querySelector('.main').addEventListener('click', event => {
      event.preventDefault()
      const btnType = event.target.dataset.btn
      const id = event.target.dataset.id
      const currency = json.find(c => c.id === id)
            
      if (btnType === 'detail') {
        console.log(currency)
        const description = currency.description === null ? '' : currency.description
        detailModal.setContent(`
          <table>
          <tr><td><img src="${currency.image}"</img></td></tr>
          <tr><td>${currency.name}</td></tr>
          <tr><td>Trade volume</td>
              <td>${currency.trade_volume_24h_btc_normalized}</td>
          </tr>
          <tr><td>Country</td>
              <td>${currency.country}</td>
          </tr>
          <tr><td>Description</td>
              <td>${description}</td>
          </tr>
          <tr><td>Trust score</td>
              <td>${currency.trust_score}</td>
          </tr>
          </table>
          <p><a href="${currency.url}" target="_blank">Website</a></p>
          
          `)

        detailModal.open()
      } 
      // else if (btnType === 'remove') {
      //     $.confirm({
      //         title: 'Вы уверены?',
      //         content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`
      //     }).then(() => {
      //         fruits = fruits.filter(f => f.id !== id)
      //         render()
      //         console.log('remove')
      //     }).catch(() => {
      //         console.log('cancel')
      //     })
      // }
  })
  return json
})
.catch(err => console.log(err))

