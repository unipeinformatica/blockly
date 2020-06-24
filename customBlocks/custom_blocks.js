// Definición de colores sobre estilo Theme Classic que no se cambia
Blockly.Blocks.sensores = {COLOUR: '#2ca5e2'};
Blockly.Blocks.primitivas = {COLOUR: '#4B6CD4'};
Blockly.Themes.Classic.blockStyles.loop_blocks.colourPrimary = "#ee7d16";
Blockly.Themes.Classic.blockStyles.logic_blocks.colourPrimary = "#ee7d16";

Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE = "Definir";
//decidimos eliminar este bloque porque no queremos que les estudiantes
//usen la mala práctica de retornar dentro de los if
delete Blockly.Blocks.procedures_ifreturn;

//esta funcion se debe llamar para que no aparezcan las definiciones de funciones
function noHayFunciones() {
    delete Blockly.Blocks.procedures_defreturn;
}


Blockly.defineBlocksWithJsonArray([
    {
        "type": "leer_caracter",
        "message0": "Leer caracter de entrada",
        "inputsInline": true,
        "output": null,
        "colour": Blockly.Blocks.primitivas.COLOUR,
        "tooltip": "Leer caracter de entrada",
        "helpUrl": ""
    },
    {
        "type": "obtener_caracter",
        "message0": "Obtener caracter de entrada",
        "inputsInline": true,
        "output": null,
        "colour": Blockly.Blocks.primitivas.COLOUR,
        "tooltip": "Lee y avanza un caracter de entrada",
        "helpUrl": ""
    },
    {
        "type": "leer_entrada_completa",
        "message0": "Leer todo el texto de entrada",
        "inputsInline": true,
        "output": null,
        "colour": Blockly.Blocks.primitivas.COLOUR,
        "tooltip": "Leer texto de entrada",
        "helpUrl": ""
    },
    {
        "type": "avanzar_caracter",
        "message0": "Avanzar caracter",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": Blockly.Blocks.primitivas.COLOUR,
        "tooltip": "Avanzar un caracter de entrada",
        "helpUrl": ""
    },
    {
        "type": "hay_mas_caracteres",
        "message0": "¿Hay más caracteres en la entrada?",
        "inputsInline": true,
        "output": null,
        "colour": Blockly.Blocks.sensores.COLOUR,
        "tooltip": "Informa si hay o no más caracteres en la entrada",
        "helpUrl": ""
    },
    {
        "type": "cambiar_color_texto",


        "message0": "Cambiar el color del texto a: %1",

        "args0": [
            {
                "type": "field_colour",
                "name": "COLOR",
                "colour": "#ff4040"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "colour": Blockly.Blocks.primitivas.COLOUR,
        "tooltip": "Cambia el color de texto de la salida",
        "helpUrl": ""
    },
    {
        "type": "imprimir",
        "message0": "Imprimir %1",
        "args0": [
            {

                "type": "input_value",
                "name": "VALOR"

            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": Blockly.Blocks.primitivas.COLOUR,
        "tooltip": "Imprime el valor recibido",
        "helpUrl": ""
    },
])


/**
 * Funciones generadoras de código correspodientes al bloque "leer_caracter"
 * @param {!Blockly.Block} Bloque.
 * @return {!List.<string, enum>} Código JavaScript o Python, Orden de precedencia
 */
Blockly.JavaScript['leer_caracter'] = function (block) {
    var code = 'leerCaracter()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];

};

Blockly.Python['leer_caracter'] = function (block) {
    var code = 'leer_caracter()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};


/**
 * Funciones generadoras de código correspodientes al bloque "leer_entrada_completa"
 * @param {!Blockly.Block} Bloque.
 * @return {!List.<string, enum>} Código JavaScript o Python, Orden de precedencia
Blockly.JavaScript['leer_entrada_completa'] = function (block) {
    var code = 'leerEntradaCompleta()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Python['leer_entrada_completa'] = function (block) {
    var code = 'leer_entrada_completa()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};


/**
 * Funciones generadoras de código correspodientes al bloque "obtener_caracter"
 * @param {!Blockly.Block} Bloque.
 * @return {!List.<string, enum>} Código JavaScript o Python, Orden de precedencia
 */
Blockly.JavaScript['obtener_caracter'] = function (block) {
    var code = 'obtenerCaracter()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.Python['obtener_caracter'] = function (block) {
    var code = 'obtener_caracter()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};


/**
 * Funciones generadoras de código correspodientes al bloque "avanzar_caracter"
 * @param {!Blockly.Block} Bloque.
 * @return {string} Código JavaScript o Python.
 */
Blockly.JavaScript['avanzar_caracter'] = function (block) {
    var code = 'avanzarCaracter();\n';
    return code;

};

Blockly.Python['avanzar_caracter'] = function (block) {
    var code = 'avanzar_caracter()\n';
    return code;
};


/**
 * Funciones generadoras de código correspodientes al bloque "hay_mas_caracteres"
 * @param {!Blockly.Block} Bloque.
 * @return {!List.<string, enum>} Código JavaScript o Python, Orden de precedencia
 */
Blockly.JavaScript['hay_mas_caracteres'] = function (block) {
    var code = 'hayMasCaracteres()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];

};

Blockly.Python['hay_mas_caracteres'] = function (block) {
    var code = 'hay_mas_caracteres()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};


/**
 * Funciones generadoras de código correspodientes al bloque "imprimir"
 * @param {!Blockly.Block} Bloque.
 * @return {string} Código JavaScript o Python.
 */
Blockly.JavaScript['imprimir'] = function (block) {
    var valor = Blockly.JavaScript.valueToCode(block, 'VALOR', Blockly.JavaScript.ORDER_NONE);
    var code = 'imprimir(' + valor + ');\n';
    return code;
};

Blockly.Python['imprimir'] = function (block) {
    var valor = Blockly.Python.valueToCode(block, 'VALOR', Blockly.Python.ORDER_NONE);
    var code = 'imprimir(' + valor + ')\n';
    return code;
};


/**
 * Funciones generadoras de código correspodientes al bloque "cambiar_color_texto"
 * @param {!Blockly.Block} Bloque.
 * @return {string} Código JavaScript o Python.
 */
Blockly.JavaScript['cambiar_color_texto'] = function (block) {
    var color = block.getFieldValue('COLOR');
    var code = 'cambiarColorTexto("' + color + '");\n';
    return code;

};

Blockly.Python['cambiar_color_texto'] = function (block) {
    var color = block.getFieldValue('COLOR');
    var code = 'cambiarColorTexto("' + color + '")\n';
    return code;
};
