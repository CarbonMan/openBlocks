Blockly.JavaScript['task'] = function (block) {
    var code = Blockly.JavaScript.statementToCode(block, 'script');
    return code;
    /*
    // Any event listener could use T$.bot.getUserState() to get more 
    // details about the context
    var ev = {
        outputType: "string",
        language: "JavaScript",
        code: code
    };
    // Allow blocks (such as nlsql_verbal_output to restructure the code)
    block.IOTKEY.fire("generate", ev)
    console.log(ev.code);
    // The type can be set to hub/nlSql meaning it is to be executed on the hub
    return "<task language='" + ev.type + "' id='" + escape(block.id) + "'" +
        " outputType='" + ev.outputType + "'>" +
        escape(ev.code) +
        "</task>";
    */
};

/**
* The JS variable assignment is overriden so that any variables created are
* stored within the context and passed between platforms. It is the only
* way (for today) to get a coherent state across the different devices as a
* program executes.
* 'this' refers to context.vars
*/
Blockly.JavaScript['variables_get'] = function(block) {
  // Variable getter.
  var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  var code = "_.vars['" + varName + "']";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['variables_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.JavaScript.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  // Must set both the global and local copies of the variable. The "getter" above is not consistently invoked.
  // See nlsql_js for an example.
  return '_.vars["' + varName + '"]=' + varName + '=' + argument0 + ';\n';
};
