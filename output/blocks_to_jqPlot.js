/**
* Generate an jqPlot chart statement
*/
IOTKEY.on("load toolbox blocks", function(ev){
    var cat = $("category[name='Display']");
    if (cat){
        $('<block type="line_chart"></block>').appendTo(cat);
        $('<block type="series_label"></block>').appendTo(cat);
    }
});

/**
* Chart statements
*/
Blockly.Blocks['line_chart'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Line chart");
        this.appendDummyInput()
            .appendField("Chart title")
            .appendField(new Blockly.FieldTextInput("               "), "title");
        this.appendDummyInput()
            .appendField("Y axis title")
            .appendField(new Blockly.FieldTextInput("               "), "yAxis");
        this.appendDummyInput()
            .appendField("X axis title")
            .appendField(new Blockly.FieldTextInput("               "), "xAxis");
        this.appendDummyInput()
            .appendField("First column is X axis ticks")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "firstColumnXaxisTicks");
        this.appendStatementInput("labels")
            .setCheck("series_label")
            .appendField("Series labels");
        this.setPreviousStatement(true, "display");
        //this.setNextStatement(true, "statement");
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Blocks['series_label'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Label")
            .appendField(new Blockly.FieldTextInput("series_name"), "name");
        this.setPreviousStatement(true, "series_label");
        this.setNextStatement(true, "series_label");
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

/**
* Generators
*/
Blockly.JavaScript['line_chart'] = function (block) {
    var text_title = block.getFieldValue('title');
    var text_yaxis = block.getFieldValue('yAxis');
    var text_xaxis = block.getFieldValue('xAxis');
    var firstcolumnxaxisticks = block.getFieldValue('firstColumnXaxisTicks') == 'TRUE';
    var statements_labels = Blockly.JavaScript.statementToCode(block, 'labels');
    // Convert the data from the dataBlock to a data series 
    var code = 'var cb = IOTKEY.codeBlocks;\n';
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

