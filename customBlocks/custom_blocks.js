Blockly.defineBlocksWithJsonArray([{
    "type": "leer_caracter",
    "message0": "Leer caracter de entrada",
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "Leer caracter de entrada",
    "helpUrl": ""
  },
  {
    "type": "avanzar_caracter",
    "message0": "Avanzar caracter",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Avanzar un caracter de entrada",
    "helpUrl": ""
  },
])

  Blockly.JavaScript['leer_caracter'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = '\'' + leerCaracter() + '\'';    
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
   
  };

  Blockly.JavaScript['avanzar_caracter'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = '' + avanzarCaracter() + ';';    
    return [code];
   
  };

  Blockly.Python['leer_caracter'] = function(block) {
    // TODO
    
    var code = '"manola"';
    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  Blockly.Python['avanzar_caracter'] = function(block) {
    // TODO
    var code = 'codigo';    
    return [code];
   
  };
