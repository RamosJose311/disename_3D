console.log("personalizado.js connected!");

const $getId = (element) => document.getElementById(element);   

window.onload = function(){
    console.log("estamos llegando")

    let errores = {}    
    const elementForm = $getId('personalizadoForm').elements
 
    $getId('name').focus()

    $getId('name').addEventListener('blur', function(){
        if($getId('name').value.length < 1){
            errores.name = "Asigne un nombre a su producto"
        }else{
            errores.name = ""
         } 
        $getId('msg_name').innerHTML = errores.name
    })

    $getId('height').addEventListener('blur', function(){
        if($getId('height').value.length < 1){
            errores.height = "La altura es obligatoria "
        }else if($getId('height').value <= 0.1){
            errores.height = "Debe ingresar un valor mayor a 0.1 cm"
        }else{
            errores.height = ""
        } 
        $getId('msg_height').innerHTML = errores.height
        
    })

    $getId('materialId').addEventListener('blur', function(){
        if($getId('materialId').value.length < 1){
            errores.materialId = "Debe seleccionar material"
        }else{
            errores.materialId = ""
         } 
        $getId('msg_materialId').innerHTML = errores.materialId
    })

    $getId('categoryId').addEventListener('blur', function(){
        if($getId('categoryId').value.length < 1){
            errores.categoryId = "Debe seleccionar material"
        }else{
            errores.categoryId = ""
         } 
        $getId('msg_categoryId').innerHTML = errores.categoryId
    })

    $getId('description').addEventListener('blur', function(){
        if($getId('description').value.length < 10){
            errores.description = "Debe Ingresar una descripción minima de 10 caracteres "
        }else{
            errores.description = ""
         } 
        $getId('msg_description').innerHTML = errores.description
    })


    console.log(errores)

    $getId('personalizadoGuardar').addEventListener('click', function (event) {
            event.preventDefault()
            console.log("estamos bien")
            for (let i=0; i< elementForm.length-2; i++){
                if (!elementForm[i].value){
                    console.log('%cEsta vacio','color: red ', elementForm[i])
                    $getId("msg_personalizadoForm").innerHTML = "Aun hay campos sin completar"
                } else if (!elementForm[5].value) {
                    $getId("msg_personalizadoForm").innerHTML = "Para finalizar su pedido, es importante que ingrese una imagen ilustrativa"
                } else {
                    console.log('%cYa no Esta vacio','color: green ', elementForm[i])
                    $getId("msg_personalizadoForm").innerHTML = ""
                    $getId('personalizadoForm').submit()
                }
            }
        })


}
