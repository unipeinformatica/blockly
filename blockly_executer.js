var MOSTRAR_CODIGO = false;
var VERSION_CODIGO = 1.0;
var actividad = ""
/// Tipos de rutinas
const RUTINAS = {
    FUNCION: 'return',
    PROCEDIMIENTO: 'noreturn'
};
delete Blockly.Blocks.math_change;

Blockly.JavaScript.addReservedWords('posicion_cadena_caracteres');
var posicion_cadena_caracteres = 0;
var color_texto = "#000000";

function setActividad(_actividad) {
    actividad = _actividad;
}

window.onload = function () {
    // document.getElementById("codigo_python").hidden = !MOSTRAR_CODIGO;
}

var workspace = Blockly.inject('blocklyDiv',
    {
        toolbox: document.getElementById('toolbox'),
        zoom:
            {
                controls: true,
                wheel: true,
                startScale: 1.0,
                maxScale: 3,
                minScale: 0.3,
                scaleSpeed: 1.2
            },
        trashcan: true,
        comments: false
    });

// Registra la función generadora de bloques para la categoría MIS_FUNCIONES
workspace.registerToolboxCategoryCallback('MIS_FUNCIONES', misFuncionesCallback);
// Registra la función generadora de bloques para la categoría MIS_PROCEDIMIENTOS
workspace.registerToolboxCategoryCallback('MIS_PROCEDIMIENTOS', misProcedimientosCallback);


// Exit is used to signal the end of a script.
Blockly.JavaScript.addReservedWords('exit');

function myUpdateFunction(event) {
    let code = codigoInicialPython();
    code += Blockly.Python.workspaceToCode(workspace);
    document.getElementById('codigo_python').value = code;
    if (!(event instanceof Blockly.Events.Ui)) {
        // Something changed. Parser needs to be reloaded.
        resetInterpreter();
        generateCodeAndLoadIntoInterpreter();
    }
}


var outputArea = document.getElementById('output_text');
var myInterpreter = null;
var highlightPause = false;
var runButton = document.getElementById('execute');
var latestCode = '';
var runner;

function initApi(interpreter, globalObject) {

    Blockly.DOMParser = window.DOMParser;
    Blockly.Element = window.Element;
    Blockly.document = window.document;

    // Add an API function for the leerCaracter() block.
    let func_leerCaracter = function () {
        return leerCaracter();
    };
    interpreter.setProperty(globalObject, 'leerCaracter',
        interpreter.createNativeFunction(func_leerCaracter));

    // Add an API function for the avanzarCaracter() block.
    let func_avanzarCaracter = function () {
        return avanzarCaracter();
    };
    interpreter.setProperty(globalObject, 'avanzarCaracter',
        interpreter.createNativeFunction(func_avanzarCaracter));

    // Add an API function for the hayMasCaracteres() block.
    let func_hayMasCaracteres = function () {
        return hayMasCaracteres();
    };
    interpreter.setProperty(globalObject, 'hayMasCaracteres',
        interpreter.createNativeFunction(func_hayMasCaracteres));

    // Add an API function for the leerEntradaCompleta() block.
    let func_leerEntradaCompleta = function () {
        return leerEntradaCompleta();
    };
    interpreter.setProperty(globalObject, 'leerEntradaCompleta',
        interpreter.createNativeFunction(func_leerEntradaCompleta));

    // Add an API function for the leerNumero() block.
    let func_leerNumero = function () {
        return leerNumero();
    };
    interpreter.setProperty(globalObject, 'leerNumero',
        interpreter.createNativeFunction(func_leerNumero));

    // Add an API function for the imprimir() block.
    let func_imprimir = function (valor) {
        return imprimir(valor);
    };
    interpreter.setProperty(globalObject, 'imprimir',

        interpreter.createNativeFunction(func_imprimir));

    // Add an API function for the cambiarColorTexto() block.
    let func_cambiarColorTexto = function (color) {
        return cambiarColorTexto(color);
    };
    interpreter.setProperty(globalObject, 'cambiarColorTexto',
        interpreter.createNativeFunction(func_cambiarColorTexto));

    // Add an API function for the obtenerCaracter() block.
    let func_obtenerCaracter = function () {
        return obtenerCaracter();
    };
    interpreter.setProperty(globalObject, 'obtenerCaracter',
        interpreter.createNativeFunction(func_obtenerCaracter));

    // Add an API function for the saltoDeLinea() block.
    let func_saltoDeLinea = function () {
        return saltoDeLinea();
    };
    interpreter.setProperty(globalObject, 'saltoDeLinea',
        interpreter.createNativeFunction(func_saltoDeLinea));

    // Add an API for the wait block.  See wait_block.js
    initInterpreterWaitForSeconds(interpreter, globalObject);


    // Add an API function for highlighting blocks.
    let func_highlightBlock = function (id) {
        return workspace.highlightBlock(id);
    };
    interpreter.setProperty(globalObject, 'highlightBlock',
        interpreter.createNativeFunction(func_highlightBlock));

}

function highlightBlock(id) {
    workspace.highlightBlock(id);
    highlightPause = true;
}


function resetStepUi(clearOutput) {
    workspace.highlightBlock(null);
    highlightPause = false;
    runButton.disabled = '';
    if (clearOutput) {
        outputArea.innerHTML = '';
    }
}

function generateCodeAndLoadIntoInterpreter() {
    // Generate JavaScript code and parse it.
    //para highlightear la linea por la que va
    Blockly.JavaScript.addReservedWords('latestCode')
    //para no tener loops
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';
    resetStepUi(true);
}

function resetInterpreter() {
    myInterpreter = null;
    if (runner) {
        clearTimeout(runner);
        runner = null;
    }
}

document.getElementById('file-upload')
    .addEventListener('change', leerSolucionWeb, false);

function leerSolucionWeb(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    var reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onerror = err => reject(err);

        reader.onload = event => resolve(event.target.result);

        reader.readAsText(archivo);
    }).then(contenido => cargarSolucion(contenido));
}

function cargarSolucion(contenido) {
    // let regex_file = /\.spbq$/
    // let regex_version = /^\d+$/
    let data = null;
    let solucion = null;

    try {
        data = JSON.parse(contenido);
        solucion = atob(data.solucion);
        let workspace = Blockly.getMainWorkspace();
        workspace.clear();
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(solucion), workspace);
    } catch (e) {
        console.error(e);
        alert("Lo siento, este archivo no tiene una solución de UNIPE Blockly.");
    }

    let errors = [];

    if (this.actividad !== data.actividad) {
        errors.push("Cuidado, el archivo indica que es para otra actividad (".concat(data.actividad, "). Se cargará de todas formas, pero puede fallar."));
    }

    if (VERSION_CODIGO > data.version) {
        errors.push("Cuidado, el archivo indica que es de una versión anterior. Se cargará de todas formas, pero te sugerimos que resuelvas nuevamente el ejercicio y guardes un nuevo archivo.");
    }

    if (errors.length !== 0) {
        let e = errors.join('\n')
        console.error(e);
        alert(e);
    }
}

function save() {
    let contenido = {
        version: VERSION_CODIGO,
        actividad: actividad,
        solucion: btoa(Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace())))
    };
    let a = document.createElement("a");
    a.download = actividad + '.spbq';
    a.href = URL.createObjectURL(new Blob([JSON.stringify(contenido)], {type: 'application/octet-stream'}));
    a.type = 'application/octet-stream';
    a.click();
}

function execute() {
    initVariables();
    latestCode = Blockly.JavaScript.workspaceToCode(workspace);
    if (!myInterpreter) {
        initVariables();
        // First statement of this code.
        // Clear the program output.
        resetStepUi(true);
        runButton.disabled = 'disabled';

        // And then show generated code in an alert.
        // In a timeout to allow the outputArea.value to reset first.
        setTimeout(function () {

            // Begin execution
            highlightPause = false;
            myInterpreter = new Interpreter(latestCode, initApi);
            runner = function () {
                if (myInterpreter) {
                    let hasMore = myInterpreter.run();
                    if (hasMore) {
                        // Execution is currently blocked by some async call.
                        // Try again later.
                        setTimeout(runner, 10);
                    } else {
                        // Program is complete.
                        outputArea.innerHTML += '<em><br><br> << Terminó de ejecutar >> </em>';
                        resetInterpreter();
                        resetStepUi(false);
                    }
                }
            };
            runner();
        }, 1);
        return;
    }
}

// Load the interpreter now, and upon future changes.
generateCodeAndLoadIntoInterpreter();
workspace.addChangeListener(myUpdateFunction);


function initVariables() {
    posicion_cadena_caracteres = 0;
    color_texto = "#000000";
}

function leerCaracter() {
    return document.getElementById("input_text").value.charAt(posicion_cadena_caracteres);
}

function saltoDeLinea() {
    return "<br>";
}

function avanzarCaracter() {
    posicion_cadena_caracteres += 1;
}

function hayMasCaracteres() {
    return document.getElementById("input_text").value.length > posicion_cadena_caracteres;
}

function leerEntradaCompleta() {
    return document.getElementById("input_text").value;
}

function leerNumero() {
    let entrada = document.getElementById("input_text").value;
    let salida;
    if (isNaN(entrada)) {
        salida = -1;
    } else {
        salida = Number(entrada);
    }
    return salida;
}

function obtenerCaracter() {
    let caracter = document.getElementById("input_text").value.charAt(posicion_cadena_caracteres);
    posicion_cadena_caracteres += 1;
    return caracter;
}

function imprimir(valor) {
    let texto = valor ? valor.toString() : '';
    outputArea.innerHTML = outputArea.innerHTML + "<span style='color:" + color_texto + "'>" + texto + "</span>";
}


/**
 *
 * @param unColor es un texto de la forma #000000
 */
function cambiarColorTexto(unColor) {
    color_texto = unColor;
}

/**
 * Función de gestión para la categoría "MIS_FUNCIONES" del Toolbox.
 * @param {!Blockly.Workspace} Espacio de trabajo de Blockly.
 * @return {!Array.<!Element>} Lista con bloques de tipo "llamada a función" (formato XML).
 */
function misFuncionesCallback(workspace) {
    return generarBloquesFuncionProcedimiento(workspace, RUTINAS.FUNCION);
}

/**
 * Función de gestión para la categoría "MIS_PROCEDIMIENTOS" del Toolbox.
 * @param {!Blockly.Workspace} Espacio de trabajo de Blockly.
 * @return {!Array.<!Element>} Lista con bloques de tipo "llamada a procedimiento" (formato XML).
 */
function misProcedimientosCallback(workspace) {
    return generarBloquesFuncionProcedimiento(workspace, RUTINAS.PROCEDIMIENTO);
}

/**
 * Genera, al vuelo, los bloques de llamada para cada función/procedimiento definido en el workspace.
 * @param {!Blockly.Workspace} Espacio de trabajo de Blockly.
 * @return {!Array.<!Element>} Lista con bloques de tipo "llamada a función/procedimiento" (formato XML).
 */
function generarBloquesFuncionProcedimiento(workspace, tipoRutina) {
    let xmlList = [];
    let procedureDefs = workspace.getBlocksByType('procedures_def' + tipoRutina, true);
    for (let procIdx in procedureDefs) {
        let blockText = '<block type="procedures_call' + tipoRutina + '">' +

            '<field name="NAME">' + procedureDefs[procIdx].getFieldValue('NAME') + '</field>';


        if (procedureDefs[procIdx].arguments_.length > 0) {
            blockText += '<mutation>';
            for (let argIdx in procedureDefs[procIdx].arguments_) {
                blockText += '<arg name="' + procedureDefs[procIdx].arguments_[argIdx] + '"></arg>';
            }
            blockText += '</mutation>';
        }
        blockText += '</block>';
        let block = Blockly.Xml.textToDom(blockText);
        xmlList.push(block);
    }
    return xmlList;
}

rutinasConsolaPython = ["leer_caracter",
    "leer_entrada_completa",
    "leer_numero",
    "obtener_caracter",
    "avanzar_caracter",
    "hay_mas_caracteres",
    "imprimir",
    "cambiar_color_texto"];


/**
 * Genera el código de inicial Python
 * @return {!String} Código Python con llamadas a import para cada rutina del módulo consola.
 */
function codigoInicialPython() {
    let code = ""
    for (let rutinaIdx in rutinasConsolaPython) {
        code += "from consola import " + rutinasConsolaPython[rutinaIdx] + "\n"
    }
    code += "\n"

    return code
}
