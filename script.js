/* 
Definición de 'document' y 'querySelector':

1. 'document': 
   - Es un objeto global que representa el DOM (Document Object Model) de la página web cargada.
   - Permite interactuar con el contenido HTML, como buscar, modificar o agregar elementos.

   Ejemplo: 
   const titulo = document.querySelector('h1'); // Selecciona el primer <h1> en el documento

2. 'querySelector': 
   - Es un método del objeto 'document' que selecciona el PRIMER elemento que coincida con un selector CSS válido.
   - Devuelve 'null' si no encuentra ningún elemento.
   - Puede usar selectores de etiquetas, clases, ID o atributos (por ejemplo: 'div', '.mi-clase', '#mi-id', '[data-atributo]').

   Ejemplo: 
   const boton = document.querySelector('.mi-boton'); // Selecciona el primer elemento con la clase "mi-boton"

3. 'querySelectorAll': 
   - Similar a 'querySelector', pero selecciona TODOS los elementos que coincidan con el selector CSS.
   - Devuelve una NodeList, que es una colección de nodos (similar a un array).

   Ejemplo:
   const botones = document.querySelectorAll('.mi-boton'); // Selecciona todos los elementos con la clase "mi-boton"
*/
// Selecciona todos los botones que tengan el atributo 'data-numero' y los almacena en una NodeList
const botonNumero = document.querySelectorAll("[data-numero]");

// Selecciona todos los botones que tengan el atributo 'data-operador' y los almacena en una NodeList
const botonOperador = document.querySelectorAll("[data-operador]");

// Selecciona el botón que tenga el atributo 'data-igual'
const botonIgual = document.querySelector("[data-igual]");

// Selecciona el botón que tenga el atributo 'data-borrar-todo'
const botonBorrarTodo = document.querySelector("[data-borrar-todo]");

// Selecciona el botón que tenga el atributo 'data-borrar'
const botonBorrar = document.querySelector("[data-borrar]");

// Selecciona el elemento que muestra el valor superior en la pantalla de la calculadora
const textoValorSuperior = document.querySelector("[data-valor-superior]");

// Selecciona el elemento que muestra el valor inferior en la pantalla de la calculadora
const textoValorInferior = document.querySelector("[data-valor-inferior]");

// Define una clase llamada 'Calculadora'
class Calculadora {
  // Constructor de la clase, inicializa las propiedades con los valores dados
  constructor(textoValorInferior, textoValorSuperior) {
    // Propiedad que almacena el elemento donde se muestra el valor inferior en la pantalla
    this.textoValorInferior = textoValorInferior;
    // Propiedad que almacena el elemento donde se muestra el valor superior en la pantalla
    this.textoValorSuperior = textoValorSuperior;
    // Inicializa el valor inferior como una cadena vacía
    this.ValorInferior = "";
    // Inicializa el valor superior como una cadena vacía
    this.ValorSuperior = "";
    // Inicializa el operador como 'undefined', lo que indica que aún no se ha seleccionado uno
    this.operador = undefined;
  }

  // Método para agregar un número al valor inferior
  agregarNumero(numero) {
    // Evita agregar más de un punto decimal en el número
    if (numero == "." && this.ValorInferior.includes(".")) return;
    // Concatena el número proporcionado al valor inferior actual
    this.ValorInferior = this.ValorInferior + numero;
  }

  // Método para actualizar la pantalla de la calculadora con los valores actuales
  imprimirDisplay() {
    // Actualiza el texto del elemento que muestra el valor inferior en la pantalla
    this.textoValorInferior.innerText = this.ValorInferior;
    // Actualiza el texto del elemento que muestra el valor superior en la pantalla
    this.textoValorSuperior.innerText = this.ValorSuperior;
  }

  // Método para borrar el último carácter del valor inferior
  borrar() {
    // Elimina el último carácter de la cadena almacenada en ValorInferior
    this.ValorInferior = this.ValorInferior.slice(0, -1);
  }

  // Método para seleccionar un operador y mover el valor inferior al superior
  elegirOperacion(operador) {
    // Si el valor inferior está vacío, no hace nada
    if (this.ValorInferior == "") return;

    // Si ya hay un valor en el display superior, realiza el cálculo antes de continuar
    if (this.ValorSuperior != "") {
      this.realizarCalculo();
    }

    // Guarda el operador seleccionado
    this.operador = operador;

    // Mueve el valor inferior al superior
    this.ValorSuperior = this.ValorInferior;

    // Vacía el valor inferior para permitir el ingreso de un nuevo número
    this.ValorInferior = "";
  }

  // Método para realizar el cálculo según el operador seleccionado
  realizarCalculo() {
    // Variable para almacenar el resultado del cálculo
    let resultado;

    // Convierte los valores de los displays a números para realizar operaciones
    let conversionValorSuperior = parseFloat(this.ValorSuperior);
    let conversionValorInferior = parseFloat(this.ValorInferior);

    // Si alguno de los valores no es un número válido, no realiza el cálculo
    if (isNaN(conversionValorSuperior) || isNaN(conversionValorInferior)) return;

    // Realiza la operación según el operador seleccionado
    switch (this.operador) {
      case "+":
        resultado = conversionValorSuperior + conversionValorInferior;
        break;
      case "-":
        resultado = conversionValorSuperior - conversionValorInferior;
        break;
      case "*":
        resultado = conversionValorSuperior * conversionValorInferior;
        break;
      case "/":
        resultado = conversionValorSuperior / conversionValorInferior;
        break;
    }

    // Actualiza el valor inferior con el resultado
    this.ValorInferior = resultado;

    // Restablece el operador a 'undefined' y el valor superior a vacío
    this.operador = undefined;
    this.ValorSuperior = "";
  }

  // Método para limpiar toda la pantalla de la calculadora
  limpiarPantalla() {
    // Restablece los valores superior e inferior y el operador a sus estados iniciales
    this.ValorInferior = "";
    this.ValorSuperior = "";
    this.operador = undefined;
  }
}

// Crea una nueva instancia de la clase Calculadora con los elementos de la pantalla
const calculadora = new Calculadora(textoValorInferior, textoValorSuperior);

// Itera sobre cada botón en la lista 'botonNumero'
botonNumero.forEach((boton) => {
  // Agrega un evento 'click' a cada botón
  boton.addEventListener("click", () => {
    // Llama al método 'agregarNumero' de la clase 'Calculadora' con el texto del botón como argumento
    calculadora.agregarNumero(boton.innerText);

    // Llama al método 'imprimirDisplay' de la clase 'Calculadora' para actualizar la pantalla
    calculadora.imprimirDisplay();
  });
});

// Agrega un evento 'click' al botón de borrar para eliminar el último carácter
botonBorrar.addEventListener("click", () => {
  // Llama al método 'borrar' de la clase 'Calculadora'
  calculadora.borrar();

  // Llama al método 'imprimirDisplay' para actualizar la pantalla
  calculadora.imprimirDisplay();
});

// Itera sobre cada botón en la lista 'botonOperador'
botonOperador.forEach((boton) => {
  // Agrega un evento 'click' a cada botón
  boton.addEventListener("click", () => {
    // Llama al método 'elegirOperacion' de la clase 'Calculadora' con el texto del botón como argumento
    calculadora.elegirOperacion(boton.innerText);

    // Llama al método 'imprimirDisplay' de la clase 'Calculadora' para actualizar la pantalla
    calculadora.imprimirDisplay();
  });
});

// Agrega un evento 'click' al botón de igual para realizar el cálculo
botonIgual.addEventListener("click", () => {
  // Llama al método 'realizarCalculo' de la clase 'Calculadora'
  calculadora.realizarCalculo();

  // Llama al método 'imprimirDisplay' para mostrar el resultado
  calculadora.imprimirDisplay();
});

// Agrega un evento 'click' al botón de borrar todo para limpiar la pantalla
botonBorrarTodo.addEventListener("click", () => {
  // Llama al método 'limpiarPantalla' de la clase 'Calculadora'
  calculadora.limpiarPantalla();

  // Llama al método 'imprimirDisplay' para reflejar los cambios en la pantalla
  calculadora.imprimirDisplay();
});
