Blockly.JavaScript['codeBlock'] = function (block) {
    var code = Blockly.JavaScript.statementToCode(block, 'contained_code');
    var ev = {
        context: block.T$.context,
        outputType: "string",
        type: "Javascript",
        code: code
    };
    // Allow blocks (such as nlsql_verbal_output to restructure the code)
    block.IOTKEY.fire("generate", ev)
    console.log(ev.code);
    // The type can be set to hub/nlSql meaning it is to be executed on the hub
    return "<codeBlock type='" + ev.type + "' id='" + escape(block.id) + "'" +
        " outputType='" + ev.outputType + "'>" +
        escape(ev.code) +
        "</codeBlock>";
};
