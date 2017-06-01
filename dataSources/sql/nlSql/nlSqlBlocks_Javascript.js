Blockly.JavaScript['codeBlock'] = function (block) {
    var code = Blockly.JavaScript.statementToCode(block, 'contained_code');
    var ev = {
        context: block.IOTKEY.context,
        outputType: "string",
        type: "javascript",
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

Blockly.JavaScript['nlsql'] = function (block) {
    var context = Blockly.JavaScript.valueToCode(block, 'context', Blockly.JavaScript.ORDER_ATOMIC);
    console.log(context);
    // Columns to be returned
    var statements_columns = Blockly.JavaScript.statementToCode(block, 'columns');
    if (!statements_columns) {
        alert("No columns selected");
        return "";
    }
    var columns = statements_columns.replace(/ +/g, "").split("\n");
    columns.pop();
    var columnList = columns.join(" ");
    console.log(columnList);
    // Query
    var value_query = Blockly.JavaScript.valueToCode(block, 'query', Blockly.JavaScript.ORDER_ATOMIC);
    console.log(value_query);
    // Where clause
    var statements_where = Blockly.JavaScript.valueToCode(block, 'whereClause');
    console.log(statements_where);
    // Build the statement
    var code = 'select ' + columnList + " from " +
        context.replace("(", "").replace(")", "");
    if (value_query) {
        code += ' by ' + value_query.replace("(", "").replace(")", "");
    }
    if (statements_where) {
        code += ' where ' + statements_where;
    }
    console.log(code);
    return code;
};

Blockly.JavaScript['nlsql_table'] = function (block) {
    var dropdown_tablename = block.getFieldValue('tableName');
    // TODO: Assemble JavaScript into code variable.
    var code = dropdown_tablename;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['nlsql_select_field'] = function (block) {
    var dropdown_tablename = block.getFieldValue('tableName');
    var dropdown_fieldname = block.getFieldValue('fieldName');
    var value_table = Blockly.JavaScript.valueToCode(block, 'table', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = "(" + dropdown_tablename + "." + dropdown_fieldname + ")\n";
    return code;
};

Blockly.JavaScript['nlsql_field'] = function (block) {
    var dropdown_fieldname = block.getFieldValue('fieldName');
    var code = dropdown_fieldname;
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['nlsql_query'] = function (block) {
    var dropdown_query = block.getFieldValue('query');
    // TODO: Assemble JavaScript into code variable.
    //var code = ' by ' + dropdown_query;
    // TODO: Change ORDER_NONE to the correct strength.
    //return dropdown_query;
    return [dropdown_query, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['nlsql_ethercalc_output'] = function (block) {
    var text_cell_name = block.getFieldValue('cell_name');
    // TODO: Assemble JavaScript into code variable.
    var code = ' into cell ' + text_cell_name;
    return code;
};

Blockly.JavaScript['nlsql_verbal_output'] = function (block) {
    // Code is handled on an event because it restructures the statement to be
    // "Tell me ...."
    // see the block def.
    return "";
};

/**
* TSV output format
*/
Blockly.JavaScript['nlsql_tsv'] = function (block) {
    // Code is handled on an event because it restructures the statement to be
    // "Tell me ...."
    // see the block def.
    return "";
};

/**
* JS Output format
*/
Blockly.JavaScript['nlsql_js'] = function (block) {
    // Code is handled on an event because it restructures the statement to be
    // "Tell me ...."
    // see the block def.
    return "";
};


Blockly.JavaScript['nlsql_column_as'] = function (block) {
    var text_alias = block.getFieldValue('alias');
    // TODO: Assemble JavaScript into code variable.
    var code = ' as ' + text_alias;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};

/**
* Operators
*/
Blockly.JavaScript['logic_operation'] = function (block) {
    // Operations 'and', 'or'.
    var operator = (block.getFieldValue('OP') == 'AND') ? 'AND' : 'OR';
    var order = (operator == 'AND') ? Blockly.JavaScript.ORDER_LOGICAL_AND :
        Blockly.JavaScript.ORDER_LOGICAL_OR;
    var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order);
    var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order);
    if (!argument0 && !argument1) {
        // If there are no arguments, then the return value is false.
        argument0 = 'false';
        argument1 = 'false';
    } else {
        // Single missing arguments have no effect on the return value.
        var defaultArgument = (operator == 'AND') ? 'true' : 'false';
        if (!argument0) {
            argument0 = defaultArgument;
        }
        if (!argument1) {
            argument1 = defaultArgument;
        }
    }
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};
