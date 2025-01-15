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
// Selecciona todos los botones que tengan el atributo 'data-selector' y los almacena en una NodeList
const botonNumero = document.querySelectorAll('[data-numero]');
const botonOperador = document.querySelectorAll('[data-operador]');

// Selecciona el botón que tenga el atributo 'data-igual'
const botonIgual = document.querySelector('[data-igual]');

// Selecciona el botón que tenga el atributo 'data-borrar-todo'
const botonBorrarTodo = document.querySelector('[data-borrar-todo]');

// Selecciona el botón que tenga el atributo 'data-borrar'
const botonBorrar = document.querySelector('[data-borrar]');

// Selecciona el elemento que muestra el valor superior en la pantalla de la calculadora
const textoValorSuperior = document.querySelector('[data-valor-superior]');

// Selecciona el elemento que muestra el valor inferior en la pantalla de la calculadora
const textoValorInferior = document.querySelector('[data-valor-inferior]');


// Define una clase llamada 'calculadora'
class Calculadora {
    // Constructor de la clase, inicializa las propiedades con los valores dados
    constructor(textoValorInferior, textoValorSuperior) {
        // Propiedad que almacena el elemento donde se muestra el valor inferior en la pantalla
        this.textoValorInferior = textoValorInferior;
        // Propiedad que almacena el elemento donde se muestra el valor superior en la pantalla
        this.textoValorSuperior = textoValorSuperior;
        // Inicializa el valor inferior como una cadena vacía
        this.ValorInferior = '';
        // Inicializa el valor superior como una cadena vacía
        this.ValorSuperior = '';
        // Inicializa el operador como 'undefined', lo que indica que aún no se ha seleccionado uno
        this.operador = undefined;
    }

    // Método para agregar un número al valor inferior
    agregarNumero(numero) {
        // Concatena el número proporcionado al valor inferior actual
        this.ValorInferior = this.ValorInferior + numero;
    }

    // Método para actualizar la pantalla de la calculadora con los valores actuales
    imprimirDisplay() {
        // Actualiza el texto del elemento que muestra el valor inferior en la pantalla
        this.textoValorInferior.innerText = this.ValorInferior
        this.textoValorSuperior.innerText = this.ValorSuperior
    }

    borrar(){
        this.ValorInferior = this.ValorInferior.slice(0,-1)
    }
    elegirOperacion(operador){
        if(this.ValorInferior == '') return
        if(this.ValorSuperior != '') {
            this.realizarCalculo()
        }
        this.operador = operador
        this.ValorSuperior = this.ValorInferior
        this.ValorInferior == ''
    }

    realizarCalculo(){
        let resultado
        let conversionValorSuperior =  parseFloat(this.ValorSuperior)
        let conversionValorInferior = parseFloat(this.ValorInferior)

        resultado = conversionValorSuperior + conversionValorInferior
        resultado = conversionValorSuperior - conversionValorInferior
        resultado = conversionValorSuperior * conversionValorInferior
        resultado = conversionValorSuperior / conversionValorInferior


    }
}

// Crea una nueva instancia de la clase Calculadora con los elementos de la pantalla
const calculadora = new Calculadora(textoValorInferior, textoValorSuperior);

// Itera sobre cada botón en la lista 'botonNumero'
botonNumero.forEach(boton => {
    // Agrega un evento 'click' a cada botón
    boton.addEventListener('click', () => {
        // Llama al método 'agregarNumero' de la clase 'calculadora' con el texto del botón como argumento
        calculadora.agregarNumero(boton.innerText);

        // Llama al método 'imprimirDisplay' de la clase 'calculadora' para actualizar la pantalla
        calculadora.imprimirDisplay();
    });
});

botonBorrar.addEventListener('click', () => {
    calculadora.borrar()
    calculadora.imprimirDisplay()
})