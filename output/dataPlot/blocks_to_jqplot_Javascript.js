Blockly.JavaScript['line_chart'] = function (block) {
    var text_title = block.getFieldValue('title');
    var text_yaxis = block.getFieldValue('yAxis');
    var text_xaxis = block.getFieldValue('xAxis');
    var firstcolumnxaxisticks = block.getFieldValue('firstColumnXaxisTicks') == 'TRUE';
    var statements_labels = Blockly.JavaScript.statementToCode(block, 'labels');
    // Convert the data from the dataBlock to a data series 
    var code = 'var cb = T$.codeBlocks;\n';
    code += 'var dataSeries = cb.outputIntoSeries({' +
        'context: this,' +
        'firstColumnXaxisTicks:' + (firstcolumnxaxisticks ? "true" : "false") +
        '});\n';
    // Run the chart against the data series
    // The code is run in the codeBlocks.context
    code += 'cb.plot.call(this, {' +
        'uid: uid,' +
        'tm: tm,' +
        'dataBlock: this.__dataBlock,' +
        'data: dataSeries' +
        '});\n';
    return code;
};

Blockly.JavaScript['series_label'] = function (block) {
    var text_name = block.getFieldValue('name');
    // TODO: Assemble JavaScript into code variable.
    var code = text_name + '\n';
    return code;
};

