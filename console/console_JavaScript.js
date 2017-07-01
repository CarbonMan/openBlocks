Blockly.JavaScript['console'] = function(block) {
  var type = block.getFieldValue('type');
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  // vars[..] holds the values of the variables because they are public across platforms.
  code += "console." + type + "(" + value_name + ");\n";
  return code;
};
