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
    var code = '\'' + document.getElementById("input_text").value + '\'';    
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
   
  };

  function leerCaracter() {
      return  + "";
  }

  Blockly.Python['leer_caracter'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    
    var code = '"manola"';
    return [code, Blockly.Python.ORDER_ATOMIC];
  };
