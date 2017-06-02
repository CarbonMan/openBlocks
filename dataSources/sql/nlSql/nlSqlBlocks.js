//var nlSqlBlocks;
$(function () {
  if (!T$.nlSql){
    console.error(T$.i18n("nlSql environment is not available"));
    return;
  }
  if (!T$.nlSql.dictionary){
    console.error(T$.i18n("nlSql environment has no dictionary"));
    return;
  }
  // This controls the context for blocks that need to refer to the dictionary
  T$.nlSql.blocks = new NlSqlBlocks({
        dictionary: T$.nlSql.dictionary
    });
  T$.nlSql.blocks.buildCustomBlocks();
  
  // Build the toolbox categories and load the blocks into them.
  // The blocks have a custom function T$_toolbox to make it easier to 
  // centralize the code.
  T$.on("load toolbox categories", function(ev){
    var qryCat = ev.toolbox.find("category[name='" + T$.i18n('Query') + "']");
    if (!qryCat.length) 
        qryCat = $("<category name='" + T$.i18n('Query') + "'></category>").appendTo(ev.toolbox);
    // Information request
    var newCat = qryCat.find("category[name='" + T$.i18n('Information request') + "']");
    if (!newCat.length) 
        newCat = $("<category name='" + T$.i18n('Information request') + "'></category>").appendTo(qryCat);
    var blk = cat.find('block[type="nlsql"]');
    if (!blk.length)
      Blockly.Blocks['nlsql'].T$_toolbox(newCat);
    
    // Columns to retrieve
    newCat = qryCat.find("category[name='" + T$.i18n('Columns to retrieve') + "']");
    if (!newCat.length) 
        newCat = $("<category name='" + T$.i18n('Columns to retrieve') + "'></category>").appendTo(qryCat);
    var blk = cat.find('block[type="nlsql_select_field"]');
    if (!blk.length){
      Blockly.Blocks['nlsql_select_field'].T$_toolbox(newCat);
      Blockly.Blocks['nlsql_column_as'].T$_toolbox(newCat);
      Blockly.Blocks['nlsql_select_field_as'].T$_toolbox(newCat);
    }
    
    // Queries
    newCat = qryCat.find("category[name='" + T$.i18n('Queries') + "']");
    if (!newCat.length) 
        newCat = $("<category name='" + T$.i18n('Queries') + "'></category>").appendTo(qryCat);
    var blk = cat.find('block[type="nlsql_query"]');
    if (!blk.length)
      Blockly.Blocks['nlsql_query'].T$_toolbox(newCat);
    
    // Expressions
    newCat = qryCat.find("category[name='" + T$.i18n('Expressions') + "']");
    if (!newCat.length) 
        newCat = $("<category name='" + T$.i18n('Expressions') + "'></category>").appendTo(qryCat);
    var blk = cat.find('block[type="nlsql_field"]');
    if (!blk.length)
      Blockly.Blocks['nlsql_field'].T$_toolbox(newCat);
    
    // Output
    newCat = qryCat.find("category[name='" + T$.i18n('Output') + "']");
    if (!newCat.length) 
        newCat = $("<category name='" + T$.i18n('Output') + "'></category>").appendTo(qryCat);
    var blk = cat.find('block[type="nlsql_js"]');
    if (!blk.length){
      Blockly.Blocks['nlsql_js'].T$_toolbox(newCat);
      Blockly.Blocks['nlsql_tsv'].T$_toolbox(newCat);
      Blockly.Blocks['nlsql_verbal_output'].T$_toolbox(newCat);
      Blockly.Blocks['nlsql_ethercalc_output'].T$_toolbox(newCat);
    }
  });  
});

function NlSqlBlocks(opts) {
    var me = this;
    me.primaryTable = "";
    me.relations = [];
    me.dictionary = opts.dictionary;
    me.tableNames = [];
}

/**
* Handle events from the Blockly workspace
*/
NlSqlBlocks.prototype.onWorkSpaceChange = function(ev) {
    var workspace = Blockly.Workspace.getById(ev.workspaceId);
    var currBlock = workspace.getBlockById(ev.blockId);
    var groupId = ev.group;

    console.log(ev.type);
    switch (ev.type) {
        case "create":
            /*
            switch (currBlock.type) {
                case "db_select_field":
                    var inp = currBlock.inputList[1];
                    var fields = inp.fieldRow;
                    inp.removeField(fields[1]);
                    inp.removeField(fields[0]);
                    break;
            }
            */
            break;
        case "move":
            // currBlock will be null if the block is moved to the garbage bin
            if (currBlock) {
                var it = currBlock.T$;
                if (it && it.onGenerate) {
                    var codeBlock = workspace.getTopBlocks()[0];
                    if (ev.oldParentId) {
                        console.log("Removing gen handler");
                        codeBlock.T$.removeListener("generate", it.onGenerate);
                    }
                    if (ev.newParentId) {
                        console.log("Adding gen handler");
                        codeBlock.T$.on("generate", it.onGenerate);
                    }
                }
            }
            console.log(ev);
            break;
    }
};


NlSqlBlocks.prototype.getAllFieldsFor = function (tableName) {
    var fields = [];
    var dTable = this.dictionary.tables[tableName];
    for (var field in dTable.fields) {
        var dField = dTable.fields[field];
        if (dField.aliases.length) {
            for (var a = 0; a < dField.aliases.length; a++) {
                fields.push([dField.aliases[a], field]);
            }
        } else
            fields.push([field,field]);
    }
    return fields;
};

/**
 *  All paths lead from the primary table
 */
NlSqlBlocks.prototype.setPrimaryTable = function (pTb) {
    var me = this;
    if (me.dictionary.tables[pTb])
        me.primaryTable = pTb;
    else {
        for (var t in me.dictionary.tables) {
            var table = me.dictionary.tables[t];
            if (table.aliases.indexOf(pTb) > -1) {
                me.primaryTable = t;
            }
        }
    }
    if (!me.primaryTable)
        throw new Error(pTb + " is not recognized");
    // Set the valid relationships for this context
    for (var r = 0; r < this.dictionary.relations.length; r++) {
        var relation = this.dictionary.relations[r];
        if (relation.source == pTb || relation.target == pTb) {
            me.relations.push(relation);
        }
    }
};

NlSqlBlocks.prototype.buildCustomBlocks = function (cb) {
    var me = this;
    // Get the dictionary from the host
    var dict = me.dictionary;
    for (var t in dict.tables) {
        var table = dict.tables[t];
        if (table.aliases.length) {
            // Show aliases as well
            for (var i = 0; i < table.aliases.length; i++) {
                me.tableNames.push([table.aliases[i] + " (" + t + ")", t]);
            }
        } else
            me.tableNames.push([t, t]);
    }
}

/**
* These fields are defined within buildCustomBlocks because they rely on
* the context to populate the dropdowns
*/
Blockly.Blocks['nlsql_table'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Table")
            .appendField(new Blockly.FieldDropdown(T$.nlSql.blocks.tableNames,
                function (e) { me.setPrimaryTable(e); }), "tableName");
        this.setInputsInline(true);
        this.setOutput(true, "nlsql_tableAlias");
        this.setColour(135);
        this.setTooltip('Primary context');
        this.setHelpUrl('');
    },
  T$_toolbox: function(cat){
    $('<block type="nlsql_table">'+
        '<field name="tableName">name...</field>'+
      '</block>').appendTo(cat);
  }
};

Blockly.Blocks['nlsql_select_field'] = {
    init: function () {
        var tableFieldDd = new Blockly.FieldDropdown([["field", "field"]]);
        var tableDd = new Blockly.FieldDropdown(T$.nlSql.blocks.tableNames, function (e) {
            // Clear the field dropdown but keep the same reference to the array
            // object
            var arr = tableFieldDd.getOptions();
            arr.length = 0;
            arr.push.apply(arr, me.getAllFieldsFor(e));
        });
        this.appendDummyInput()
            .appendField("Column");
        this.appendDummyInput()
            .appendField(tableDd, "tableName")
            .appendField(tableFieldDd, "fieldName");
        this.setInputsInline(true);
        this.setPreviousStatement(true, ["nlsql", "nlsql_selectFieldAlias"]);
        this.setNextStatement(true, "nlsql_selectFieldAlias");
        this.setColour(135);
        this.setTooltip('What columns to return');
        this.setHelpUrl('');
    },
  T$_toolbox: function(cat){
    var entry = '<block type="nlsql_select_field">'+
      '<field name="tableName">' + T$.i18n("table name ...") + '</field>'+
      '<field name="fieldName">' + T$.i18n("field name ...") + '</field>'+
    '</block>';
    $(entry).appendTo(cat);
  }
};

Blockly.Blocks['nlsql_field'] = {
    init: function () {
        if (!me.primaryTable)
            return false;
        var fields = me.getAllFieldsFor(me.primaryTable);
        var tableFieldDd = new Blockly.FieldDropdown(fields, function (e) {
        });
        this.appendDummyInput()
            .appendField("Column")
            .appendField(tableFieldDd, "fieldName");
        this.setInputsInline(true);
        this.setOutput(true);
        //this.setOutput(true, "db_fieldAlias");
        this.setColour(135);
        this.setTooltip('Field');
        this.setHelpUrl('');
    },
  T$_toolbox: function(cat){
    var entry = '<block type="nlsql_field">'+
      '<field name="fieldName">' + T$.i18n("field name ...") + '</field>'+
    '</block>';
    $(entry).appendTo(cat);
  }
};

Blockly.Blocks['nlsql_tableField'] = {
    init: function () {
        var tableFieldDd = new Blockly.FieldDropdown([["field", "field"]]);
        var tableDd = new Blockly.FieldDropdown(T$.nlSql.blocks.tableNames, function (e) {
            // Clear the field dropdown but keep the same reference to the array
            // object
            var arr = tableFieldDd.getOptions();
            arr.length = 0;
            arr.push.apply(arr, me.getAllFieldsFor(e));
        });
        this.appendDummyInput()
            .appendField("Column")
            .appendField(tableDd, "tableName")
            .appendField(tableFieldDd, "fieldName");
        this.setInputsInline(true);
        this.setOutput(true);
        //this.setOutput(true, "db_fieldAlias");
        this.setColour(135);
        this.setTooltip('Table column');
        this.setHelpUrl('');
    },
  T$_toolbox: function(cat){
    var entry = '<block type="nlsql_tableField">'+
      '<field name="tableName">' + T$.i18n("table name ...") + '</field>'+
      '<field name="fieldName">' + T$.i18n("field name ...") + '</field>'+
    '</block>';
    $(entry).appendTo(cat);
  }
};

Blockly.Blocks['nlsql_query'] = {
    init: function () {
        if (!me.primaryTable || !dict.queries)
            return false;
        if (!Object.keys(dict.queries).length)
            return false;
        var queries = [];
        for (var q in dict.queries) {
            var query = dict.queries[q];
            if (query.table == me.primaryTable) {
                queries.push([q, q]);
            }
        }
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(queries), "query");
        this.setOutput(true, "nlsql_namedQuery");
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
    },
  T$_toolbox: function(cat){
    var entry = '<block type="nlsql_query">'+
      '<field name="query">' + T$.i18n("query name ...") + '</field>'+
    '</block>';
    $(entry).appendTo(cat);
  }
};

/**
* Block definitions that don't require context
*/
Blockly.Blocks['nlsql'] = {
  init: function() {
    this.appendValueInput("context")
        .setCheck("nlsql_tableAlias")
        .appendField( T$.i18n("Context") );
    this.appendStatementInput("columns")
        .setCheck("nlsql_selectFieldAlias")
        .appendField( T$.i18n("Columns") );
    this.appendValueInput("query")
        .setCheck("nlsql_namedQuery")
        .appendField( T$.i18n("Named query") );
    this.appendValueInput("whereClause")
        .setCheck("Boolean")
        .appendField( T$.i18n("Where") );
    this.setPreviousStatement(true,"statement");
    this.setNextStatement(true,["statement","nlSqlOutput"]);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
    // Code attached to block.IOTKEY is attached to the codeBlock "generate" event
    // during a move operation. See onWorkSpaceChange
    this.T$ = {
        onGenerate: function (ev) {
            ev.type = "chat";
        }
    };
  },
  T$_toolbox: function(cat){
    var entry = '<block type="nlsql"></block>';
    $(entry).appendTo(cat);
  }
};

Blockly.Blocks['nlsql_ethercalc_output'] = {
  init: function() {
    this.appendDummyInput()
        .appendField( T$.i18n("Spreadsheet cell") )
        .appendField(new Blockly.FieldTextInput("default"), "cell_name");
    this.setPreviousStatement(true, "nlSqlOutput");
    //this.setOutput(true, "nlSqlOutput");
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
  T$_toolbox: function(cat){
    var entry = '<block type="nlsql_ethercalc_output">'+
        '<field name="cell_name">' + T$.i18n("default") + '</field>' + 
        '</block>';
    $(entry).appendTo(cat);
  }
};

Blockly.Blocks['nlsql_verbal_output'] = {
  init: function() {
    this.appendDummyInput()
        .appendField( T$.i18n("Verbal") );
    this.setPreviousStatement(true, "nlSqlOutput");
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
      // Code attached to block.IOTKEY is attached to the codeBlock "generate" event
      // during a move operation. See onWorkSpaceChange
    this.T$ = {
        onGenerate: function (ev) {
            ev.code = "tell me " + ev.code.trim();
        }
    };
  },
  T$_toolbox: function(cat){
    var entry = '<block type="nlsql_verbal_output"></block>';
    $(entry).appendTo(cat);
  }
};

/**
* SQL to Tab Separated Values
*/
Blockly.Blocks['nlsql_tsv'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("TSV");
        this.setPreviousStatement(true, "nlSqlOutput");
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
        // Code attached to block.IOTKEY is attached to the codeBlock "generate" event
        // during a move operation. See onWorkSpaceChange
        T$_editor.document.addBlock(this)
          .setAttribute("requires", "TSVfromSQL");
        /*
        this.T$ = {
            onGenerate: function (ev) {
                // This is the output type from the block
                ev.outputType = "TSV";
                ev.type = "TSVfromSQL";
            }
        };
        */
    },
  T$_toolbox: function(cat){
    var entry = '<block type="nlsql_tsv"></block>';
    $(entry).appendTo(cat);
  }
};

/**
* SQL to JSON
*/
Blockly.Blocks['nlsql_js'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("JS");
        this.setPreviousStatement(true, "nlSqlOutput");
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
        T$_editor.document.addBlock(this)
          .setAttribute("requires", "JSfromSQL");
        // Code attached to block.IOTKEY is attached to the codeBlock "generate" event
        // during a move operation. See onWorkSpaceChange
        /*
        this.T$ = {
            onGenerate: function (ev) {
                // This is the output type from the block
                ev.outputType = "JS";
                ev.type = "JSfromSQL";
            }
        };
        */
    },
  T$_toolbox: function(cat){
    var entry = '<block type="nlsql_js"></block>';
    $(entry).appendTo(cat);
  }
};

Blockly.Blocks['nlsql_column_as'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("as")
        .appendField(new Blockly.FieldTextInput("default"), "alias");
    this.setOutput(true, "nlsql_columnAs");
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
  T$_toolbox: function(cat){
    var entry = '<block type="nlsql_column_as">'+
        '<field name="alias">' + T$.i18n("default") + '</field>' + 
        '</block>';
    $(entry).appendTo(cat);
  }
};

Blockly.Blocks['nlsql_select_field_as'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Column");
    this.appendValueInput("table")
        .setCheck("nlsql_columnAs")
        .appendField(new Blockly.FieldDropdown([["option","OPTIONNAME"]]), "tableName")
        .appendField(new Blockly.FieldDropdown([["option","OPTIONNAME"]]), "fieldName");
    this.setInputsInline(true);
    this.setPreviousStatement(true, ["nlsql", "nlsql_selectFieldAlias"]);
    this.setNextStatement(true, "nlsql_selectFieldAlias");
    this.setColour(135);
    this.setTooltip('What columns to return');
    this.setHelpUrl('');
  },
  T$_toolbox: function(cat){
    var entry = '<block type="nlsql_select_field_as">'+
      '<field name="tableName">' + T$.i18n("table name ...") + '</field>'+
      '<field name="fieldName">' + T$.i18n("field name ...") + '</field>'+
    '</block>';
    $(entry).appendTo(cat);
  }
};

/*
Blockly.Blocks['nlsql_where_field'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Column");
    this.appendValueInput("lhs")
        .setCheck("comparator")
        .appendField(new Blockly.FieldDropdown([["option","OPTIONNAME"]]), "tableName")
        .appendField(new Blockly.FieldDropdown([["option","OPTIONNAME"]]), "fieldName");
    this.appendValueInput("rhs")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, "whereClause");
    this.setColour(135);
    this.setTooltip('What columns to return');
    this.setHelpUrl('');
  },
  T$_toolbox: function(cat){
    var entry = '<block type="nlsql_ethercalc_output">'+
        '<field name="cell_name">' + T$.i18n("default") + '</field>' + 
        '</block>';
    $(entry).appendTo(cat);
  }
};
*/

/*
Blockly.Blocks['nlsql_where_field_connected'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Column");
    this.appendValueInput("lhs")
        .setCheck("comparator")
        .appendField(new Blockly.FieldDropdown([["option","OPTIONNAME"]]), "tableName")
        .appendField(new Blockly.FieldDropdown([["option","OPTIONNAME"]]), "fieldName");
    this.appendValueInput("rhs")
        .setCheck(null);
    this.appendValueInput("join")
        .setCheck("logicalJoin")
        .appendField("Join");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "whereClause");
    this.setNextStatement(true, "whereClause");
    this.setColour(135);
    this.setTooltip('What columns to return');
    this.setHelpUrl('');
  },
  T$_toolbox: function(cat){
    var entry = '<block type="nlsql_ethercalc_output">'+
        '<field name="cell_name">' + T$.i18n("default") + '</field>' + 
        '</block>';
    $(entry).appendTo(cat);
  }
};

Blockly.Blocks['logicaljoiners'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["AND","AND"], ["OR","OR"]]), "NAME");
    this.setOutput(true, "logicalJoin");
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
  T$_toolbox: function(cat){
    var entry = '<block type="nlsql_ethercalc_output">'+
        '<field name="cell_name">' + T$.i18n("default") + '</field>' + 
        '</block>';
    $(entry).appendTo(cat);
  }
};

Blockly.Blocks['comparators'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["equals","="], ["not equals","!="], ["greater than",">"], ["greater than or equal to",">="], ["less than","<"], ["less than or equal to","<="]]), "NAME");
    this.setOutput(true, "comparator");
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
  T$_toolbox: function(cat){
    var entry = '<block type="nlsql_ethercalc_output">'+
        '<field name="cell_name">' + T$.i18n("default") + '</field>' + 
        '</block>';
    $(entry).appendTo(cat);
  }
};
*/
