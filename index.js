const detailModal = $.modal({
    title: 'Detail',
    closable: true,
    width: '300px',
    footerButtons: [
        {text: 'Close', type: 'primary', handler() {
            priceModal.close()
        }}
    ]
})


document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id

    if (btnType === 'detail') {
      detailModal.setContent(`
        <p>Detail : </p>
        <p><strong>Price: $</strong></p>
        ${id}
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