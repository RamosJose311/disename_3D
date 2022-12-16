console.log("newProduct.js connected!");

const $getId = (element) => document.getElementById(element);   

window.onload = function(){
    console.log("estamos llegando")

    let errores = {}    
    let errorGral = false;
    const elementForm = $getId('newProductForm').elements
 
    $getId('name').focus()

    $getId('name').addEventListener('blur', function(){
        if($getId('name').value.length < 1){
            errores.name = "Asigne un nombre a su producto"
        }else{
            errores.name = ""
         } 
        $getId('msg_name').innerHTML = errores.name
    })

    $getId('price').addEventListener('blur', function(){
        if($getId('price').value.length < 1){
            errores.price = "El precio es obligatorio"
        }else if($getId('price').value <= 0.1){
            errores.price = "Debe ingresar un valor mayor a 0.1 cm"
        }else{
            errores.price = ""
        } 
        $getId('msg_price').innerHTML = errores.price
        
    })
    
    $getId('discount').addEventListener('blur', function(){
        if($getId('discount').value.length < 1){
            errores.discount = "El descuento es obligatorio"
        }else if($getId('discount').value < 0 || $getId('discount').value > 99 ){
            errores.discount = "Debe ingresar un valor entre 0 y 99"
        }else{
            errores.discount = ""
        } 
        $getId('msg_discount').innerHTML = errores.discount
        
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

    $getId('time').addEventListener('blur', function(){
        if($getId('time').value.length < 1){
            errores.time = "El tiempo de impresión es obligatorio"
        }else if($getId('time').value <= 0.1){
            errores.time = "Debe ingresar un valor mayor a 0.1 cm"
        }else{
            errores.time = ""
        } 
        $getId('msg_time').innerHTML = errores.time
        
    })

    $getId('categoryId').addEventListener('blur', function(){
        if($getId('categoryId').value.length < 1){
            errores.categoryId = "Debe seleccionar Categoria"
        }else{
            errores.categoryId = ""
         } 
        $getId('msg_categoryId').innerHTML = errores.categoryId
    })

    $getId('description').addEventListener('blur', function(){
        if($getId('description').value.length < 10){
            errores.description = "Debe Ingresar una descripción minima de 10 caracteres "
            errorGral=true
        }else{
            errores.description = ""
         } 
        $getId('msg_description').innerHTML = errores.description
    })


    console.log(errores)

    $getId('newProductGuardar').addEventListener('click', function (event) {
            event.preventDefault()
            console.log("estamos bien")
            console.log(elementForm)
            for (let i=0; i< elementForm.length-2; i++){

                if (!elementForm[i].value){
                    console.log('%cEsta vacio','color: red ', elementForm[i])
                    console.log('%cFalta imagen','color: blue ', elementForm[i])
                    $getId("msg_createProductForm").innerHTML = "Aun hay campos sin completar"
                    errorGral=true
                } else{
                    errorGral=false
                    $getId("msg_createProductForm").innerHTML = "Aun hay campos sin completar"
                }
                if (!errorGral && !elementForm[8].value) {
                    $getId("msg_img_createProductForm").innerHTML = "OOPS!!, No olvide la imagen del producto"
                    errorGral=true
                } else {
                    $getId("msg_img_createProductForm").innerHTML = ""
                } 

                }   
                if(!errorGral){
                    $getId('newProductForm').submit()
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'El producto se ha cargado satisfactoriamente !!',
                        showConfirmButton: false,
                        timer: 15000
                    })    
                }                 
            })
            


    }