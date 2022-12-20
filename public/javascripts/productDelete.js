console.log("Borrar producto -- Conectado!!")
const $getId = (element) => document.getElementById(element);   

window.onload = function(){

    $getId("product_Delete").addEventListener('click', function(event){
        event.preventDefault()
        console.log('estamos haciendo click')

        const swalButtons = Swal.mixin({
            customClass: {
                confirmButton: 'bt-confirm',
                cancelButton: 'bt-cancel'
            },
            buttonsStyling: false
        })
        
            swalButtons.fire({
            title: 'Desea eliminar el producto?',
            text: "Si confirma la accion el producto se eliminara permanentemente!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirmar!',
            cancelButtonText: 'Cancelar!',
            reverseButtons: true
            }).then((result) => {
            if (result.isConfirmed) {
                swalButtons.fire(
                    'Eliminado!',
                    'El producto se a eliminado',
                ).then(()=>{
                    $getId("form_delete").submit()
                })
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                    swalButtons.fire(
                        'Cancelado',
                        'El producto no se a eliminado :)',
                    )
                }
            })
    })
}
