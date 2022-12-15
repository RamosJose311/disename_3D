const $ = (element) => document.getElementById(element);
console.log("userRegister.js connected!");

const exRegs = {
    exRegAlfa: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/,
    exRegEmail: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/ /* /w+([.-]?\w+)*(\.\w{2,10})+$ / */,
    exRegPass:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{6,12}/,
    /* exRegMayu: /[A-Z]/,
    exRegMinu: /[a-z]/,
    exRegNum: /[0-9]/,
    exRegEsp: /[$@$!%*?&]/,
    exRegMin: /.{6,}/,
    exRegMax: /.{12}/, */
};

/* funcion que te verifica si email ya existe */
const verifyEmail = async (email) => {
        try {
            let response = await fetch("/api/users/verify-email", {
            method: "POST",
            body: JSON.stringify({
                email: email,
        }),
        headers: {
        "Content-Type": "application/json",
        },
        });

    let result = await response.json();

    console.log(result);

    return result.verified;
    } catch (error) {
    console.error;
    }
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

/* -----------------------errorEmail-------------------------------- */

$("email").addEventListener("blur",async function(){
    switch (true) {
        case !this.value.trim():
            $('errorEmail').innerText = 'El email es obligatorio'
            break;
    
        case !exRegs.exRegEmail.test(this.value):
            $('errorEmail').innerText ="El Email no tiene el formato correcto"
            break;

        case await verifyEmail(this.value):
            $('errorEmail').innerText ="El Email ya se encuentra registrado"
            break;

        default:
            $('errorEmail').innerText =null
            break;
    }
})


/* ------------------------password------------------------------------ */

$("password").addEventListener("blur",function(){
    switch (true) {
        case !this.value.trim():
            $('errorPassword').innerText = 'La contraseña es obligatoria'
            break;

        case !exRegs.exRegPass.test(this.value):
            $('errorPassword').innerText ="La contraseña debe ser de 6 a 12 caracteres incluyendo un número, una mayúscula, una minúscula y sin espacios"
            break;

        default:
            $('errorPassword').innerText =null
            break;
    }
})

/* -------------------cartelito password--------------------- */
$("password").addEventListener("click",function(){
    $("recommended").classList.remove("class-recommended")
    $("recommended").classList.add("class-recommended2")

})

$("password2").addEventListener("click",function (){
    $("recommended").classList.remove("class-recommended2")
    $("recommended").classList.add("class-recommended")
})


/* ------------------------confirmacion del password------------------------------------ */

$("password2").addEventListener("blur",function(){
    switch (true) {
        case !this.value.trim():
            $('errorPassword2').innerText = 'Debe confirmar su contraseña'
            break;

        case this.value.trim() !== $('password').value.trim():
            $('errorPassword2').innerText ="Las contraseña no coinciden "
            break;

        default:
            $('errorPassword2').innerText =null
            break;
    }
})


/* --------------------no envia el formulario hasta llenarlo correctamente */


    $("register_section_main-form").addEventListener("submit", function (e) {
        e.preventDefault();

        const elements = this.elements;
            for (let i = 0; i < elements.length - 1; i++) {
            if(!elements[i].value.trim()){
                $('errorForm').innerText = 'Algunos de los campos no es valido'
                console.log('no Esta todo bien')               
            }else{
                this.submit()
            }
        }
    });



