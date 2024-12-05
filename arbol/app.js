//Solicita la expresión matemática y genera el árbol de expresión
function solicitarExpresion() {
    const expresion = prompt("Ingresa una expresión matemática");
    if (expresion && expresion.trim()) {
        generarArbolDeExpresion(expresion.replace(/\s+/g, ''));
        alert("Árbol generado exitosamente.");
    } else {
        alert("El campo no puede estar vacío.");
    }
}

// Genera el árbol de expresión y lo muestra en pantalla
function generarArbolDeExpresion(expresion) {
    document.getElementById("tree").innerHTML = ''; // Limpiar el contenido actual del árbol
    const arbol = construirArbolDeExpresion(expresion);
    mostrarArbol(arbol, document.getElementById("tree"));
}

// Construye el árbol de la expresión analizando operadores y paréntesis
function construirArbolDeExpresion(expresion) {
    const operadores = ['+', '-', '*', '/'];
    let nivelParentesis = 0, operadorPrincipal = -1, menorPrecedencia = Infinity;

    for (let i = 0; i < expresion.length; i++) {
        const caracter = expresion[i];
        if (caracter === '(') nivelParentesis++;
        else if (caracter === ')') nivelParentesis--;
        else if (nivelParentesis === 0 && operadores.includes(caracter)) {
            const precedencia = obtenerPrecedencia(caracter);
            if (precedencia <= menorPrecedencia) {
                menorPrecedencia = precedencia;
                operadorPrincipal = i;
            }
        }
    }

    if (operadorPrincipal === -1) {
        return expresion.startsWith('(') && expresion.endsWith(')')
            ? construirArbolDeExpresion(expresion.slice(1, -1))
            : { valor: expresion };
    }

    return {
        valor: expresion[operadorPrincipal],
        izquierda: construirArbolDeExpresion(expresion.slice(0, operadorPrincipal)),
        derecha: construirArbolDeExpresion(expresion.slice(operadorPrincipal + 1))
    };
}

// Retorna la precedencia del operador; a menor valor, mayor precedencia
function obtenerPrecedencia(operador) {
    return { '+': 1, '-': 1, '*': 2, '/': 2 }[operador];
}

// Muestra el árbol de manera recursiva en el DOM
function mostrarArbol(nodo, elementoPadre) {
    if (!nodo) return;

    const elementoNodo = document.createElement("div");
    elementoNodo.className = "tree-node";
    elementoNodo.innerText = nodo.valor;
    elementoPadre.appendChild(elementoNodo);

    if (nodo.izquierda || nodo.derecha) {
        const contenedorHijos = document.createElement("div");
        contenedorHijos.className = "tree-children";
        mostrarArbol(nodo.izquierda, contenedorHijos);
        mostrarArbol(nodo.derecha, contenedorHijos);
        elementoPadre.appendChild(contenedorHijos);
    }
}