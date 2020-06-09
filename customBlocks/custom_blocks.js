Blockly.Blocks.sensores = { COLOUR: '#2ca5e2' };

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
    "type": "leer_entrada_completa",
    "message0": "Leer texto de entrada",
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "Leer texto de entrada",
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
  {
    "type": "hay_mas_caracteres",
    "message0": "¿Hay más caracteres en la entrada?",
    "inputsInline": true,
    "output": null,
    "colour": Blockly.Blocks.sensores.COLOUR,
    "tooltip": "Informa si hay o no más caracteres en la entrada",
    "helpUrl": ""
  }
])

  Blockly.JavaScript['leer_caracter'] = function(block) {
    var code = 'leerCaracter()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  
  };

  Blockly.JavaScript['avanzar_caracter'] = function(block) {
    var code = 'avanzarCaracter();';    
    return code;
   
  };

  Blockly.JavaScript['hay_mas_caracteres'] = function(block) {
    var code = 'hayMasCaracteres()';    
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
   
  };

  Blockly.JavaScript['leer_entrada_completa'] = function(block) {
    var code = 'leerEntradaCompleta()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  
  };

  Blockly.Python['leer_caracter'] = function(block) {
    // TODO
    
    var code = '"manola"';
    return [code, Blockly.Python.ORDER_ATOMIC];
  };

  Blockly.Python['avanzar_caracter'] = function(block) {
    // TODO
    var code = 'codigo';    
    return code;
   
  };

  Blockly.Python['hay_mas_caracteres'] = function(block) {
    // TODO
    var code = 'codigo';    
    return [code, Blockly.Python.ORDER_ATOMIC];
   
  };

  Blockly.Python['leer_entrada_completa'] = function(block) {
    var code = 'leerEntradaCompleta()';
    return [code, Blockly.Python.ORDER_ATOMIC];
  
  };
