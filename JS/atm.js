
//class usuario
/* La clase Usuario tiene un constructor que toma 5 parámetros y los asigna a las propiedades del
del mismo nombre. También crea dos arrays vacíos.*/
class Usuario{
    constructor(nombre,apellido,saldo,usuario,contraseña){
        this.nombre=nombre;
        this.apellido=apellido;
        this.saldo=saldo;
        this.usuario=usuario;
        this.contraseña=contraseña;
        this.tipoOperacion=[];
        this.monto=[];
        this.fecha=[];
    }
}

//funcion para crear usuarios nuevos
/**
 * Esta función crea un nuevo usuario y lo devuelve.
 * @param nombre - nombre del usuario
 * @param apellido - aellido del usuario
 * @param saldo - saldo del usuario
 * @param usuario - username del usuario
 * @param contraseña - password del usuario
 * @returns el objeto creado por la función constructora.
 */
function crearUsuario(nombre,apellido,saldo,usuario,contraseña){
    let cliente=new Usuario(nombre,apellido,saldo,usuario,contraseña);
    return cliente;
}

//funcion para ingresar
/**
 * La función ingresar toma dos parámetros, usuario y contraseña, y devuelve true si el usuario y la
 * contraseña coinciden con el usuario y la contraseña de cualquiera de los objetos de la matriz de usuarios.
 * @param user - username del usuario
 * @param contraseña - password del usuario
 * @returns A boolean value.
 */
function ingresar(user,contraseña){
    let ingreso= usuarios.some((avatar) => avatar.usuario == user && avatar.contraseña == contraseña);
    return ingreso;
}

//funcion para depositar
/**
 * Encuentra el usuario en la matriz y añade el depósito al saldo del usuario
 * @param deposito - la cantidad de dinero a depositar
 */
function depositar(deposito){
    usuarios.find((avatar) => {if(avatar.usuario == user){
        while( isNaN(deposito) || deposito<=0){
            alert("Ingrese un monto válido");
            deposito = parseFloat(prompt("Ingrese el monto a depositar"));
        }
        avatar.saldo+=deposito;
        }
        });
};


//funcion para retirar
/**
 * Encuentre el usuario en la matriz de usuarios y reste el importe de su saldo.
 * @param retiro - La cantidad de dinero que se va a retirar
 */
function retirar(retiro){
    usuarios.find((avatar) => {if(avatar.usuario == user){
        while( isNaN(retiro) || retiro<=0 || retiro>avatar.saldo){
            alert("Ingrese un monto válido");
            retiro = parseFloat(prompt("Ingrese el monto a retirar"));
        }
        avatar.saldo-=retiro;
    }});
}

//funcion para consultar saldo
/**
 * Encuentra al usuario en la matriz y le avisa de su saldo.
 */
function consultarSaldo(){
    usuarios.find((avatar) => {if(avatar.usuario == user){alert("Su saldo es: S/."+avatar.saldo);}});
}

//funcion para armar el historial
/**
 * Toma dos argumentos, una cadena y un número, y los introduce en dos matrices de un objeto.
 * @param tipo - tipo de operación
 * @param monto - cantidad
 */
function historial(tipo,monto){
    usuarios.find((avatar) => {if(avatar.usuario == user){avatar.tipoOperacion.push(tipo);avatar.monto.push(monto);avatar.fecha.push(date.toLocaleString());}});
}

//funcion para mostrar historial
/**
 * Toma el nombre del usuario y lo busca en el array de objetos, luego toma las
 * operaciones e importes del usuario y los muestra en una alerta.
 */
function mostrarHistorial(){
    let historial=">HISTORIAL DE OPERACIONES: "+user+"\n";
    const aux=usuarios.find((avatar) => avatar.usuario == user);
    for(let i=0;i<aux.tipoOperacion.length;i++){
        historial+="  "+aux.tipoOperacion[i]+" S/."+aux.monto[i]+"\n";
    }
    alert(historial);
}

function mostrarHtml(){
    let nombre=document.getElementById("s_user");
    let money = document.getElementById("s_saldo");
    let tabla = document.getElementById("historial");
    let historial="";
    const aux=usuarios.find((avatar) => avatar.usuario == user);
    for(let i=0;i<aux.tipoOperacion.length;i++){
        historial+="<tr><td>"+aux.tipoOperacion[i]+"</td><td>S/."+
        aux.monto[i]+"</td><td>"+aux.fecha[i]+"</td><td><a href=''><i class='fa-solid fa-eye'></i>Ver</a></td></tr>";
    }
    nombre.innerHTML=user;
    money.innerHTML="Saldo Dispnible : S/."+aux.saldo;
    tabla.innerHTML=historial;
}

//variables globales
let user="";
let contrasena="";
//arreglo de usuarios
const usuarios = [];
let ciclo=true;
let opcion=0;
let date = new Date();
//programa principal
/* Le pedirá al usuario que elija una opción, y dependiendo de la opción, ejecutará un codigo.
function. */

    while(ciclo){
        opcion = parseInt(prompt("                                 *************ATM*************\n"+
        "Ingrese una opción: \n 1 --> Crear un usuario \n 2 --> Ingresar \n 3 --> Salir\nOpcion [1-3]: "));
    
        switch(opcion){
            case 1:
                let nombre = prompt("Ingrese su nombre");
                let apellido = prompt("Ingrese su apellido");
                let saldo = parseFloat(prompt("Ingrese su saldo"));
                user = prompt("CREANDO SU USUARIO \n Ingrese su usuario:");
                contrasena = prompt("CREANDO SU CONTRASENA \n Ingrese su contrasena");
                usuarios.push(crearUsuario(nombre,apellido,saldo,user,contrasena));
                break;
            case 2:
                user = prompt("Ingrese su usuario");
                contrasena = prompt("Ingrese su contraseña");
                let ingreso = ingresar(user,contrasena);
                if(ingreso==true){
                    alert("Bienvenido: "+user);
                    while(ciclo){
                        let opcion2 = parseInt(prompt("                                 *************ATM-"+user+"*************\n"+
                        "Ingrese una opción: \n 1 --> Depositar \n 2 --> Retirar \n 3 --> Consultar saldo \n 4 --> Historial \n 5 --> Salir \nOpcion [1-5]: "));
                        switch(opcion2){
                            case 1:
                                let deposito = parseFloat(prompt("Ingrese el monto a depositar"));
                                depositar(deposito);
                                alert("DEPÓSITO REALIZADO");
                                historial("DEPÓSITO",deposito);
                                break;
                            case 2:
                                let retiro = parseFloat(prompt("Ingrese el monto a retirar"));
                                retirar(retiro);
                                alert("RETIRO REALIZADO");
                                historial("RETIRO",retiro);
                                break;
                            case 3:
                                consultarSaldo();
                                break;
                            case 4:
                                mostrarHistorial();
                                break;
                            case 5:
                                ciclo=false;
                                break;
                            default:
                                alert("Opción inválida");
                        }
                    }
                    ciclo=true;
                }else{
                    alert("Usuario o contrasena incorrectos");
                }
                break;
            case 3:
                mostrarHtml();
                ciclo=false;
                alert("Gracias por usar nuestro ATM");
                break;
            default:
                alert("Opción inválida");
        }
    }

