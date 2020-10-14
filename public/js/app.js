//const { response } = require("express")



const cotacoesForm = document.querySelector('form')

const MsgTitulo = document.querySelector('h3')
const retSymbol = document.querySelector('#symbol')
const retName = document.querySelector('#name')
const retPrice = document.querySelector('#price')

cotacoesForm.addEventListener('submit', (event) => {
    MsgTitulo.innerText = ''
    retSymbol.innerHTML = ''
    retPrice.innerHTML = ''
    MsgTitulo.innerText = 'Buscando....'
    event.preventDefault()
    const ativo = document.querySelector('input').value
    fetch(`http://localhost:3000/cotacoes?ativo=${ativo}`).then((response => {
        response.json().then((data) => {
            if (data.error) {
                MsgTitulo.innerText = `Algo deu errado: ${data.error.mensage} código ${data.error.code}`
            } else {
                MsgTitulo.innerText = 'Cotação atualizada:'
                retSymbol.innerHTML = `${data.symbol} - ${data.name}`
                retPrice.innerHTML = `Valor atual: ${data.price}`
            }

        })
    }))
})