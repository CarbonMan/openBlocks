Blockly.JavaScript['csv'] = function (block) {
    var inputVariable = 
        Blockly.JavaScript.variableDB_.getName(block.getFieldValue('inputVariable'), Blockly.Variables.NAME_TYPE);
    var code = "_.run.outputCSV({\n" +
            "values: " + "_.vars['" + inputVariable + "']\n" +
        "});\n";
    return code;
};
