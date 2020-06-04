var MOSTRAR_CODIGO = false;
window.onload = function () {
    document.getElementById("textarea").hidden = !MOSTRAR_CODIGO;
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


// Exit is used to signal the end of a script.
Blockly.JavaScript.addReservedWords('exit');
function myUpdateFunction(event) {
    var code = Blockly.Python.workspaceToCode(workspace);
    document.getElementById('textarea').value = code;
    if (!(event instanceof Blockly.Events.Ui)) {
        // Something changed. Parser needs to be reloaded.
        resetInterpreter();
        generateCodeAndLoadIntoInterpreter();
    }
}


var outputArea = document.getElementById('output');
var myInterpreter = null;
var highlightPause = false;
var runButton = document.getElementById('execute');
var latestCode = '';
var runner;
function initApi(interpreter, globalObject) {
    // Add an API function for the alert() block, generated for "text_print" blocks.
    var wrapper = function (text) {
        text = text ? text.toString() : '';
        outputArea.value = outputArea.value + '\n' + text;
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

    // Add an API for the wait block.  See wait_block.js
    initInterpreterWaitForSeconds(interpreter, globalObject);

    // Add an API function for highlighting blocks.
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
        outputArea.value = '';
    }
}

function generateCodeAndLoadIntoInterpreter() {
    // Generate JavaScript code and parse it.
    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    Blockly.JavaScript.addReservedWords('highlightBlock');
    //para highlightear la linea por la que va
    Blockly.JavaScript.addReservedWords('latestCode')
    //para no tener loops
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';
    latestCode = Blockly.JavaScript.workspaceToCode(workspace);
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
    .addEventListener('change', open, false);

function open(e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
        var contents = e.target.result;
        displayContents(contents);
    };
    reader.readAsText(file);
}

function displayContents(contents) {

    let workspace = Blockly.getMainWorkspace();
    workspace.clear();
    data = JSON.parse(contents);
    solucion = atob(data.solucion);
    Blockly.Xml.domToWorkspace(solucion, workspace);
}

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
        Blockly.Xml.domToWorkspace(solucion, workspace);
    } catch (e) {
        console.error(e);
        throw "Lo siento, este archivo no tiene una solución de Pilas Bloques.";
    }


    let errors = [];

    if ("holamundo" !== data.actividad) {
        errors.push("Cuidado, el archivo indica que es para otra actividad (".concat(data.actividad, "). Se cargar\xE1 de todas formas, pero puede fallar."));
    }

    if (1.0 > data.version) {
        errors.push("Cuidado, el archivo indica que es de una versión anterior. Se cargará de todas formas, pero te sugerimos que resuelvas nuevamente el ejercicio y guardes un nuevo archivo.");
    }

    if (errors.length !== 0) {
        throw errors.join('\n');
    }
}

function save() {
    let contenido = {
        version: 1.0,
        actividad: "holamundo",
        solucion: btoa(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()))
    };
    var a = document.getElementById("placeholder");
    a.download = 'hola.spbq';
    a.href = URL.createObjectURL(new Blob([JSON.stringify(contenido)], { type: 'application/octet-stream' }));
    a.type = 'application/octet-stream';
    a.click();
}

function execute() {
    if (!myInterpreter) {
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
                        outputArea.value += '\n\n<< Program complete >>';
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
