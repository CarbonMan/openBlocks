var nlSqlBlocks;
$(function () {
  if (!T$.nlSql){
    console.error(T$.i18n("nlSql environment is not available"));
    return;
  }
  if (!T$.nlSql.dictionary){
    console.error(T$.i18n("nlSql environment has no dictionary"));
    return;
  }
  nlSqlBlocks = new NlSqlBlocks({
        dictionary: T$.nlSql.dictionary
    });
  nlSqlBlocks.buildCustomBlocks();
});

function NlSqlBlocks(opts) {
    var me = this;
    me.primaryTable = "";
    me.relations = [];
    me.dictionary = opts.dictionary;
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
                        codeBlock.IOTKEY.removeListener("generate", it.onGenerate);
                    }
                    if (ev.newParentId) {
                        console.log("Adding gen handler");
                        codeBlock.IOTKEY.on("generate", it.onGenerate);
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
    var tableNames = [];
    for (var t in dict.tables) {
        var table = dict.tables[t];
        if (table.aliases.length) {
            // Show aliases as well
            for (var i = 0; i < table.aliases.length; i++) {
                tableNames.push([table.aliases[i] + " (" + t + ")", t]);
            }
        } else
            tableNames.push([t, t]);
    }
    /**
    * These fields are defined within buildCustomBlocks because they rely on
    * the context to populate the dropdowns
    */
    Blockly.Blocks['nlsql_table'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("Table")
                .appendField(new Blockly.FieldDropdown(tableNames,
                    function (e) { me.setPrimaryTable(e); }), "tableName");
            this.setInputsInline(true);
            this.setOutput(true, "nlsql_tableAlias");
            this.setColour(135);
            this.setTooltip('Primary context');
            this.setHelpUrl('');
        }
    };

    Blockly.Blocks['nlsql_select_field'] = {
        init: function () {
            var tableFieldDd = new Blockly.FieldDropdown([["field", "field"]]);
            var tableDd = new Blockly.FieldDropdown(tableNames, function (e) {
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
        }
    };

    Blockly.Blocks['nlsql_tableField'] = {
        init: function () {
            var tableFieldDd = new Blockly.FieldDropdown([["field", "field"]]);
            var tableDd = new Blockly.FieldDropdown(tableNames, function (e) {
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
        }
    };
}
