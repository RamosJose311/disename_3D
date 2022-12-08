const $ = (element) => document.getElementById(element);
console.log("userRegister.js connected!");


const exRegs = {
    exRegAlfa: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/,
    exRegEmail: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/ /* /w+([.-]?\w+)*(\.\w{2,10})+$ / */,
    exRegPass:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{6,12}/,}

$("email").addEventListener("blur",async function(){
    switch (true) {
        case !this.value.trim():
            $('errorEmail').innerText = 'El email es obligatorio'
            break;
    
        case !exRegs.exRegEmail.test(this.value):
            $('errorEmail').innerText ="El Email no tiene el formato correcto"
            break;

         default:
            $('errorEmail').innerText =null
            break;
    }
}),
$("password").addEventListener("blur",function(){
    switch (true) {
        case !this.value.trim():
            $('errorPassword').innerText = 'La contraseña es obligatoria'
            break;


        default:
            $('errorPassword').innerText =null
            break;
    }
})
$("login_section_main-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const elements = this.elements;
        for (let i = 0; i < elements.length - 1; i++) {

        if(!elements[i].value.trim()){
            $('errorForm').innerText = 'Algunos de los campos no es valido'
        }else{
            this.submit()
        }
    }

});