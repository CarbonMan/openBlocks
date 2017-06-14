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
