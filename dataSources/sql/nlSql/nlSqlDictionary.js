//var nlSqlBlocks;

function NlSqlDictionary(opts) {
    var me = this;
    eventHandler(me);
    me.primaryTable = "";
    me.relations = [];
    me.dictionary = opts.dictionary;
    me.tableNames = [];
    me.queryDd = null;
    me.fields = []
}

/**
* Add a dropdown field for queries
*/
NlSqlDictionary.prototype.setQuery = function(dDfield) {
    this.queryDd = dDfield;
};

/**
* Add a dropdown for the selection of fields from the primary table
*/
NlSqlDictionary.prototype.addPrimaryTableField = function(dDfield) {
    var me = this;
    me.fields.push(dDfield);
    var opts = [];
    if (me.primaryTable)
        opts = me.getAllFieldsFor(me.primaryTable);
    else
        opts = [ T$.i18n('fields') ,''];
    var arr = dDfield.getOptions();
    arr.push( opts );
};

/**
* Handle events from the Blockly workspace
*/
NlSqlDictionary.prototype.onWorkSpaceChange = function(ev) {
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


NlSqlDictionary.prototype.getAllFieldsFor = function (tableName) {
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
NlSqlDictionary.prototype.setPrimaryTable = function (pTb) {
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
    this.setValidQueries();
    this.setValidFields(pTb);
};

/**
* For each dropdown that does not specify the table
* set the available fields according to the primary table
*/
NlSqlDictionary.prototype.setValidFields = function (table) {
    var opts = this.getAllFieldsFor(table);
    this.fields.forEach(function(fld){
        fld.options.push(opts);
    });
};

/**
* Set the query options for the current primary table
* called whenever the primary table changes
*/
NlSqlDictionary.prototype.setValidQueries = function () {
    /*
    if (!me.primaryTable || !dict.queries)
        return false;
    if (!Object.keys(dict.queries).length)
        return false;
    */
    if (!this.queryDd || !this.primaryTable)
        return;
    var arr = this.queryDd.getOptions();
    arr.length = 0;
    var dict = this.dictionary;
    var queries = [];
    for (var q in dict.queries) {
        var query = dict.queries[q];
        if (query.table == this.primaryTable) {
            queries.push([q, q]);
        }
    }
    arr.push.apply(arr, queries);
};

NlSqlDictionary.prototype.buildCustomBlocks = function (cb) {
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
    me.fire("add blocks", {});
}
