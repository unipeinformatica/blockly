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
        "message0": "Cambiar texto a color: %1",
        "args0": [
            {
                "type": "field_colour",
                "name": "COLOUR",
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

])

Blockly.JavaScript['leer_caracter'] = function (block) {
    var code = 'leerCaracter()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];

};

Blockly.JavaScript['avanzar_caracter'] = function (block) {
    var code = 'avanzarCaracter();';
    return code;

};

Blockly.JavaScript['hay_mas_caracteres'] = function (block) {
    var code = 'hayMasCaracteres()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];

};

Blockly.JavaScript['leer_entrada_completa'] = function (block) {
    var code = 'leerEntradaCompleta()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['obtener_caracter'] = function (block) {
    var code = 'obtenerCaracter()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['cambiar_color_texto'] = function (block) {
    var color = block.getFieldValue('COLOUR');
    var code = 'cambiarColorTexto("' + color + '");';
    return code;

};

Blockly.Python['leer_caracter'] = function (block) {

    // TODO

    var code = '"manola"';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['avanzar_caracter'] = function (block) {
    // TODO
    var code = 'codigo';
    return code;
};

Blockly.Python['hay_mas_caracteres'] = function (block) {
    // TODO
    var code = 'codigo';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['leer_entrada_completa'] = function (block) {
    var code = 'leerEntradaCompleta()';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['obtener_caracter'] = function (block) {
    // TODO: revisar que luego imprima el código correspondiente
    var codigo_python = 'caracter = input_text.get(posicion_cadena_caracteres) ' +
        '\n posicion_cadena_caracteres +=1 \n return caracter';
    return codigo_python;

};

Blockly.Python['cambiar_color_texto'] = function (block) {
    var code = 'cambiarColorTexto()';
    return code;

};