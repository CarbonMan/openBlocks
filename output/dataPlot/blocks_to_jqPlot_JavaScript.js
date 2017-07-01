Blockly.JavaScript['line_chart'] = function (block) {
    var dataSource = Blockly.JavaScript.valueToCode(block, 'dataSource', Blockly.JavaScript.ORDER_ATOMIC);
    var text_title = block.getFieldValue('title');
    var text_yaxis = block.getFieldValue('yAxis');
    var text_xaxis = block.getFieldValue('xAxis');
    var firstcolumnxaxisticks = block.getFieldValue('firstColumnXaxisTicks') == 'TRUE';
    var statements_labels = Blockly.JavaScript.statementToCode(block, 'labels');
    // Convert the data from the dataBlock to a data series 
    // Run the chart against the data series
    // The code is run in the CodeBlockTree context
    var code = 'T$.codeBlocks.plot({' +
        'context: me.context,' +
        'uid: me.uid,' +
        'threadId: me.threadId,' +
        'data: vars["' + dataSource + '"],' + 
        'firstColumnXaxisTicks:' + (firstcolumnxaxisticks ? "true" : "false") +
        '});\n';
    return code;
};

Blockly.JavaScript['series_label'] = function (block) {
    var text_name = block.getFieldValue('name');
    // TODO: Assemble JavaScript into code variable.
    var code = text_name + '\n';
    return code;
};

