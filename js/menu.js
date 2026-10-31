
const botonMenu = document.querySelector(".boton-menu");
const navegacion = document.querySelector("#navegacion-principal");

const pantallaPequena = window.matchMedia("(max-width: 900px)");


if (botonMenu && navegacion) {

   
    function cambiarEstadoMenu(abierto) {
        navegacion.hidden = !abierto;

        botonMenu.setAttribute(
            "aria-expanded",
            abierto ? "true" : "false"
        );

        botonMenu.setAttribute(
            "aria-label",
            abierto ? "Cerrar menú principal" : "Abrir menú principal"
        );
    }

   
    function adaptarMenu() {
        const focoActual = document.activeElement;

        if (pantallaPequena.matches) {
            botonMenu.hidden = false;

            
            if (navegacion.contains(focoActual)) {
                botonMenu.focus();
            }

            cambiarEstadoMenu(false);
        } else {
            cambiarEstadoMenu(true);

           
            if (focoActual === botonMenu) {
                navegacion.querySelector("a").focus();
            }

            botonMenu.hidden = true;
        }
    }


    botonMenu.addEventListener("click", function () {
        cambiarEstadoMenu(navegacion.hidden);
    });

    
    document.addEventListener("keydown", function (evento) {
        const focoEnMenu =
            document.activeElement === botonMenu ||
            navegacion.contains(document.activeElement);

        if (
            evento.key === "Escape" &&
            pantallaPequena.matches &&
            !navegacion.hidden &&
            focoEnMenu
        ) {
            botonMenu.focus();
            cambiarEstadoMenu(false);
        }
    });

    
    pantallaPequena.addEventListener("change", adaptarMenu);

   
    adaptarMenu();
}