
console.log(" !!!!!! ESTAMOS CONECTADOS")


const boton = document.querySelector('#boton')


boton.addEventListener('click', function(event){
    console.log(event.target.textContent)
})

