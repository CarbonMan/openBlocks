Blockly.JavaScript['console'] = function(block) {
  var type = block.getFieldValue('type');
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = "console." + type + "(" + value_name + ");\n";
  return code;
};
