var MOSTRAR_CODIGO = false;
var VERSION_CODIGO = 1.0;
var actividad = ""

Blockly.JavaScript.addReservedWords('posicion_cadena_caracteres');
var posicion_cadena_caracteres = 0;
var color_texto = "#000000";

function setActividad(_actividad) {
    actividad = _actividad;
}

window.onload = function () {
    document.getElementById("codigo_python").hidden = !MOSTRAR_CODIGO;
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

// Registra la función generadora de bloques para la categoría MIS_PROCEDIMIENTOS
workspace.registerToolboxCategoryCallback('MIS_PROCEDIMIENTOS', misProcedimientosCallback);


// Exit is used to signal the end of a script.
Blockly.JavaScript.addReservedWords('exit');

function myUpdateFunction(event) {
    var code = Blockly.Python.workspaceToCode(workspace);
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

    // Add an API function for the alert() block, generated for "text_print" blocks.
    var wrapper = function (text) {
        text = text ? text.toString() : '';
        outputArea.innerHTML = outputArea.innerHTML + "<span style='color:" + color_texto + "'>" + text + "</span>";
    };
    interpreter.setProperty(globalObject, 'alert',
        interpreter.createNativeFunction(wrapper));

    // Add an API function for the prompt() block.
    var wrapper = function (text) {
        text = text ? text.toString() : '';
        return interpreter.createPrimitive(prompt(text));
    };
    interpreter.setProperty(globalObject, 'prompt',
        interpreter.createNativeFunction(wrapper));
    Blockly.DOMParser = window.DOMParser;
    Blockly.Element = window.Element;
    Blockly.document = window.document;

    // Add an API function for the leerCaracter() block.
    var wrapper = function () {
        return leerCaracter();
    };
    interpreter.setProperty(globalObject, 'leerCaracter',
        interpreter.createNativeFunction(wrapper));

    // Add an API function for the avanzarCaracter() block.
    var wrapper = function () {
        return avanzarCaracter();
    };
    interpreter.setProperty(globalObject, 'avanzarCaracter',
        interpreter.createNativeFunction(wrapper));

    // Add an API function for the hayMasCaracteres() block.
    var wrapper = function () {
        return hayMasCaracteres();
    };
    interpreter.setProperty(globalObject, 'hayMasCaracteres',
        interpreter.createNativeFunction(wrapper));

    // Add an API function for the leerEntradaCompleta() block.
    var wrapper = function () {
        return leerEntradaCompleta();
    };
    interpreter.setProperty(globalObject, 'leerEntradaCompleta',
        interpreter.createNativeFunction(wrapper));


    // Add an API function for the cambiarColorTexto() block.
    var wrapper = function (color) {
        return cambiarColorTexto(color);
    };
    interpreter.setProperty(globalObject, 'cambiarColorTexto',
        interpreter.createNativeFunction(wrapper));

    // Add an API for the wait block.  See wait_block.js
    initInterpreterWaitForSeconds(interpreter, globalObject);

    // Add an API function for highlighting blocks.
    var wrapper = function (id) {
        return workspace.highlightBlock(id);
    };
    interpreter.setProperty(globalObject, 'highlightBlock',
        interpreter.createNativeFunction(wrapper));

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
        Blockly.Events.disable()
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(solucion), workspace);
    } catch (e) {
        console.error(e);
        throw "Lo siento, este archivo no tiene una solución de UNIPE Blockly.";
    }

    let errors = [];

    if (this.actividad !== data.actividad) {
        errors.push("Cuidado, el archivo indica que es para otra actividad (".concat(data.actividad, "). Se cargará de todas formas, pero puede fallar."));
    }

    if (VERSION_CODIGO > data.version) {
        errors.push("Cuidado, el archivo indica que es de una versión anterior. Se cargará de todas formas, pero te sugerimos que resuelvas nuevamente el ejercicio y guardes un nuevo archivo.");
    }

    if (errors.length !== 0) {
        throw errors.join('\n');
    }
}

function save() {
    let contenido = {
        version: VERSION_CODIGO,
        actividad: actividad,
        solucion: btoa(Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace())))
    };
    var a = document.createElement("a");
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
                    var hasMore = myInterpreter.run();
                    if (hasMore) {
                        // Execution is currently blocked by some async call.
                        // Try again later.
                        setTimeout(runner, 10);
                    } else {
                        // Program is complete.
                        outputArea.innerHTML += '\n\n<< Program complete >>';
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

function avanzarCaracter() {
    posicion_cadena_caracteres += 1;
}

function hayMasCaracteres() {
    return document.getElementById("input_text").value.length > posicion_cadena_caracteres;
}

function leerEntradaCompleta() {
    return document.getElementById("input_text").value;
}

function cambiarColorTexto(unColor) {
    color_texto = unColor;
}

/**
 * Genera, al vuelo, los bloques de llamada para cada procedimiento definido en el workspace.
 * @param {!Blockly.Workspace} Espacio de trabajo de Blockly.
 * @return {!Array.<!Element>} Lista con bloques de tipo "llamada a procedimiento" (formato XML).
 */
function misProcedimientosCallback(workspace) {
    var xmlList = [];
    var procedureDefs = workspace.getBlocksByType('procedures_defnoreturn', true);
    for (var index in procedureDefs) {
        var blockText = '<block type="procedures_callnoreturn">' +
            '<field name="NAME">' + procedureDefs[index].getFieldValue('NAME') + '</field>' +
            '</block>';
        var block = Blockly.Xml.textToDom(blockText);
        xmlList.push(block);
    }
    return xmlList;
};
