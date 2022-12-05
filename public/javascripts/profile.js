
const $ = (element) => document.getElementById(element);
console.log("userRegister.js connected!");



/* ---------------------eliminar usuario "Profile"-------------------- */
$("eliminar").addEventListener("submit", function (e) {
    e.preventDefault();

    swal({
        title: "¿Estás seguro?",
        text: "Esta accion eliminara su perfil",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        })
        .then((willDelete) => {
        if (willDelete) {
            swal("Su perfil se elimino correctamente", {
            icon: "success",
        });
        } else {
            swal("Su perfil no a sido eliminado");
        }
    });

});