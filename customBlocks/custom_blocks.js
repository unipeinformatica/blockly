Blockly.JavaScript.addReservedWords('posicion_cadena_caracteres');

function initVariables() {
    var posicion_cadena_caracteres = 0;
}

Blockly.defineBlocksWithJsonArray([{
    "type": "leer_caracter",
    "message0": "Leer caracter de entrada",
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "Leer caracter de entrada",
    "helpUrl": ""
  }])

  Blockly.JavaScript['leer_caracter'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var functionName = Blockly.JavaScript.provideFunction_(
        'mostrarTexto',
        [ 'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '() {',
          'var texto = '+ document.getElementById("input_text") +'.value',
          ' return texto.charAt(0);',
          '}']);
    
    var code = functionName + '()';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };

  function leerCaracter() {
      return  + "";
  }

  Blockly.Python['leer_caracter'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    
    var code = '"manola"';
    return [code, Blockly.Python.ORDER_ATOMIC];
  };