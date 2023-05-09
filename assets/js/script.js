//Se captura en una variable el presupuesto ingresado por el usuario.
var presupuesto = document.getElementById("inputIngresos");
//Se captura en una variable la etiqueta en donde se inyectará el monto del presupuesto. 
var tdPresupuesto = document.getElementById("tdPresupuesto");
//Se captura en una variable el botón "calcular".
var btnCalcular = document.getElementById("btnCalcular");
//Se guarda la variable  presupuestoFinal y gastoFinal que después serán reescritas.
var presupuestoFinal = 0;
var gastoFinal = 0;

//Se escucha el evento "click" realizado al botón "calcular" y se ejecuta una función.
btnCalcular.addEventListener("click", function(event){
    //Evito que los datos ingresados al formulario se recargen/borren.
    event.preventDefault();
    //Condicional que muestra una alerta si no se ingresa un valor en el input presupuesto.
    if (presupuesto.value == "") {
        alert("Debe ingresar un monto para el presupuesto");
        return;
    }
    //Inyecto a la tabla el monto del presupuesto, ingresado por el usuario
    tdPresupuesto.innerHTML =`$${Number(presupuesto.value).toLocaleString('es-cl')}`;
    //Se reescribe el valor de presupuestoFinal por el ingresado por el usuario.
    presupuestoFinal= Number(presupuesto.value);
    //Deshabilito el botón "calcular" una vez que se haya ingresado el monto y presionado el botón.
    btnCalcular.classList.add("disabled"); 
})

//Capturo en una variable el nombre del gasto ingresado por el usuario.
var inputNombreGasto = document.getElementById("inputNombreGasto");
//Capturo en una variable el monto del gasto ingresado por el usuario.
var inputMontoGasto = document.getElementById("inputMontoGasto");
//Capturo en una variable la etiqueta en donde se inyectará el gasto ingresado por el usuario.
var tdGastos = document.getElementById("tdGastos");
//Capturo en una variable el botón "añadir gasto".
var btnAñadirGasto = document.getElementById("btnAñadirGasto");

//Array vacío en donde se inyectarán el nombre y el monto de el/los gasto/s ingresados por el usuario.
let gastos = [];

//Función que agrega el objeto con sus atributos al array "gastos"
function agregarGastoAlArray(){
    //Se guarda en let el nombre del gasto ingresado por el usuario.
    let nombreGasto = inputNombreGasto.value;
    //Se guarda en let el monto del gasto ingresado por el usuario.
    let montoGasto = inputMontoGasto.value;
    //Condicional que muestra una alerta si el nombre del gasto no es ingresado.
    if (nombreGasto == "") {
        alert("Debe ingresar la descripción del gasto");
        return;
    }
    //Condicional que muestra una alerta si el monto del gasto no es ingresado.
    if (montoGasto == "") {
        alert("Debe ingresar el monto del gasto");
        return;
    }
    //Objeto sus atributos.
    var objetoGasto = {
        nombreDelGasto: nombreGasto,
        montoDelGasto: parseFloat(montoGasto)
    };
    //Se agrega al array "gastos" un objeto gasto.
    gastos.push(objetoGasto);
    //Luego de agregar un nombre, el input se limpia para ingresar otro nombre.
    inputNombreGasto.value = "";
    //Luego de agregar un monto, el input se limpia para ingresar otro monto.
    inputMontoGasto.value = "";
    //Imprimo por consola el array.
    console.log(gastos);
}

//Función que inyecta los gastos a la tabla.
function inyectarGastos(){
    //Elimina las primeras inyecciones para mostrar solo lá última vuelta del foreach
    document.getElementById("tbodyGastos").innerHTML = "";
    //Ciclo foreach para recorrer el array, inyectar los gastos y obtener su índice
    gastos.forEach((gasto, index) => {
        //Estructura html a inyectar junto con los datos del gasto.
        var tr = ` 
        <tr>
        <td>${gasto.nombreDelGasto}</td>
        <td>$${Number(gasto.montoDelGasto).toLocaleString('es-cl')}</td>
        <td><i class="fa-solid fa-trash-can" style="color: #005eff;" onclick="eliminarGasto(${index})"></i></td>
        </tr>
      `
      //Inyección
      document.getElementById("tbodyGastos").innerHTML += tr;
    })
}

//Función que reduce el array "gastos" a una expresión, es decir, suma o resta los objetos agregados al array.
function calcularTotalGastos(){
    //Se guarda en let la reducción de todos los gastos utilizando método reduce().
    let total = gastos.reduce((total, gasto) => {
        return total + gasto.montoDelGasto;
    },0)
    //Inyecto en la columna "Gastos" del let "total".
    document.getElementById("tdGastos").innerHTML =`$${Number(total).toLocaleString('es-cl')}`;
    //Se reescribe el valor de "gastoFinal" por total.
    gastoFinal = Number(total);
}

//Se escucha el evento "click" realizado al botón "añadir gasto" y se ejecuta una función.
btnAñadirGasto.addEventListener("click", function(event){
    //Evito que los datos ingresados al formulario se recarguen/borren.
    event.preventDefault();
    //Condicional que ejecuta las funciones mencionadas si el valor del presupuesto es distinto a 0.
    if (presupuestoFinal !== 0) {
        //Se ejecuta la función que agrega los gastos al array "gastos"
        agregarGastoAlArray();
        //Se ejecuta la función que inyecta a la tabla un gasto.
        inyectarGastos();
        //Función que reduce los gastos a una cifra y los inyecta en la columna "gastos"
        calcularTotalGastos();
        //Función que calcula el saldo y lo inyecta en la columna "saldo".
        calcularSaldo();
    //Si es igual a 0 se arroja una alerta.
    }else{
        alert("Debe Ingresar un monto para el presupuesto");
        return
    }
})

//Función que es ejecutada cuando se hace click en el ícono trash. Elimina un gasto.
function eliminarGasto(index){
    //Se elimina un gasto del array "gastos" con el método splice().
    gastos.splice(index, 1);
    //Imprimo por consola el array "gastos".
    console.log(gastos);
    //Se ejecuta la función que inyecta los gastos, para que se actualicé la tabla, y se borre la fila del html que contenía el gasto eliminado
    inyectarGastos();
    //Se ejecuta la función que calcula el total de gastos, para que se actualice el monto de la columna "gastos" 
    calcularTotalGastos();
    //Se ejecuta la función que calcula el saldo para que actualice el monto de la columna "saldo" 
    calcularSaldo();
}

//Función que calcula el monto saldo y lo inyecta a la tabla
function calcularSaldo(){
    //Se captura en let la etiqueta en donde se inyectará el saldo.
    let tdSaldo = document.getElementById("tdSaldo");
    //Se guarda en saldo la diferencia entre el presupuesto y el gasto final.
    let saldo = presupuestoFinal - gastoFinal;
    //Se inyecta en la columna "saldo".
    tdSaldo.innerHTML = `$${Number(saldo).toLocaleString('es-cl')}`;
}



