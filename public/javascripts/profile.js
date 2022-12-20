
const $ = (element) => document.getElementById(element);
console.log("profile.js connected!");
/* const apiUrlBase = "https://apis.datos.gob.ar/georef/api" */

const exRegs = {
    exRegAlfa: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/,
    exRegEmail: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/ /* /w+([.-]?\w+)*(\.\w{2,10})+$ / */,
    exRegPass:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{6,12}/,
};

/* ----------------------- errorNomre----------------------------- */
$("firstName").addEventListener("blur",function(){
    switch (true) {
        case !this.value.trim():
            $('errorNombre').innerText = 'El nombre es obligatorio'
            break;
    
        case this.value.trim().length < 2:
            $('errorNombre').innerText ='El nombre debe tener como minimo 2 caracteres'
            break;

        case !exRegs.exRegAlfa.test(this.value):
            $('errorNombre').innerText ="El nombre debe tener solo letras"
            break;

        default:
            $('errorNombre').innerText =null
            break;
    }
})

/* ---------------------errorApellido----------------------------- */

$("lastName").addEventListener("blur",function(){
    switch (true) {
        case !this.value.trim():
            $('errorApellido').innerText = 'El apellido es obligatorio'
            break;
    
        case this.value.trim().length < 2:
            $('errorApellido').innerText ='El apellido debe tener como minimo 2 caracteres'
            break;

        case !exRegs.exRegAlfa.test(this.value):
            $('errorApellido').innerText ="El apellido debe tener solo letras"
            break;

        default:
            $('errorApellido').innerText =null
            break;
    }
})


/* -------------------------------error fecha de nacimiento----------------------------- */
/* $("dateBirth").addEventListener("blur",function(){
    switch (true) {
        case !this.value.trim():
            $('errorNacimiento').innerText = 'La fecha de nacimiento es obligatoria'
            break;
    
        default:
            $('errorNacimiento').innerText =null
            break;
    }
}) */

/* -------------------------------error calle----------------------------- */
/* $("address").addEventListener("blur",function(){
    switch (true) {
        case !this.value.trim():
            $('errorCalle').innerText = 'su direccion es obligatoria'
            break;
    
        default:
            $('errorCalle').innerText =null
            break;
    }
}) */


/* -------------------------------error Ciudad----------------------------- */
$("city-input").addEventListener("blur",function(){
    switch (true) {
        case !this.value.trim():
            $('errorCiudad').innerText = 'La ciudad es obligatoria'
            break;
    
        default:
            $('errorCiudad').innerText =null
            break;
    }
})


/* -------------------------------error Provincia----------------------------- */
$("province-input").addEventListener("blur",function(){
    switch (true) {
        case !this.value.trim():
            $('errorProvincia').innerText = 'La Provincia es obligatoria'
            break;
    
        default:
            $('errorProvincia').innerText =null
            break;
    }
})



/* -------------------------------error Pais----------------------------- */
$("country").addEventListener("blur",function(){
    switch (true) {
        case !this.value.trim():
            $('errorPais').innerText = 'El pais es obligatorio'
            break;
    
        default:
            $('errorPais').innerText =null
            break;
    }
})



/* -------------------------------Sobre  mi----------------------------- */
/* $("sobreMi").addEventListener("blur",function(){
    switch (true) {
        case !this.value.trim():
            $('errorSobreMi').innerText = 'nos interesa saber sobre usted'
            break;

            case this.value.trim().length < 15:
            $('errorSobreMi').innerText ='minimo 15 caractares'
            break;
    
        default:
            $('errorSobreMi').innerText =null
            break;
    }
}) */




 /* $("imagenPerfil").addEventListener('click', 
    function fileValidation(){
        let filePath = $("imagenPerfil").value, 
            allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i 
        if(!allowefExtensions.exec(filePath)){ 
            errorImgPerfil.innerHTML = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
            return false;
        }else{
            $('errorImgPerfil').innerText =null
            }
        }
    );
 */

    $("profileForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const elements = this.elements;
        let error = false
            for (let i = 0; i < elements.length - 1; i++) {
                if(!elements[i].value.trim() && i != 12){
                    error = true
                    $('errorFormPerfil').innerText = 'Algunos de los campos no es valido'
                    //console.log(elements[i],i)
                }
            
        }
        if(!error){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cambio realizado con éxito',
                showConfirmButton: false,
                timer: 60000
            })
            this.submit();
        }
    });



/* ---------------------eliminar usuario "Profile"-------------------- */


$("delete-button").addEventListener("click", function (e) {
    e.preventDefault();

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'bt-confirm',
            cancelButton: 'bt-cancel'
        },
        buttonsStyling: false
    })
    
        swalWithBootstrapButtons.fire({
        title: 'Desea eliminar el usuario?',
        text: "Si confirma la accion su usuario se eliminara permanentemente!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
        }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                'Eliminado!',
                'Su usuario se a eliminado',
                /* 'Satisfactoriamente' */
                document.querySelector("#eliminar").submit()
            )
        } else if (
          /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
                swalWithBootstrapButtons.fire(
                    'Cancelado',
                    'El usuario no se a eliminado :)',
                    
                )
            }
        })

});

