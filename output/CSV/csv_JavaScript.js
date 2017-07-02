Blockly.JavaScript['csv'] = function (block) {
    var inputVariable = 
        Blockly.JavaScript.variableDB_.getName(block.getFieldValue('inputVariable'), Blockly.Variables.NAME_TYPE);
    var code = "_.run.outputCSV({\n" +
            "values: " + "_.vars['" + inputVariable + "']\n" +
        "});\n";
    return code;
};


/**
* See Blockly.JavaScript['csv']
*/
CodeBlockTree.prototype.outputCSV = function (opts) {
	function convertArrayOfObjectsToCSV(args) {
		var result,
		ctr,
		keys,
		columnDelimiter,
		lineDelimiter,
		data;

		data = args.data || null;
		if (data == null || !data.length) {
			return null;
		}

		columnDelimiter = args.columnDelimiter || ',';
		lineDelimiter = args.lineDelimiter || '\n';

		keys = Object.keys(data[0]);

		result = '';
		result += keys.join(columnDelimiter);
		result += lineDelimiter;

		data.forEach(function (item) {
			ctr = 0;
			keys.forEach(function (key) {
				if (ctr > 0)
					result += columnDelimiter;

				result += item[key];
				ctr++;
			});
			result += lineDelimiter;
		});

		return result;
	}

	function downloadCSV(args) {
		var data,
		filename,
		link;

		var csv = convertArrayOfObjectsToCSV({
				data: args.values
			});
		if (csv == null)
			return;

		filename = args.filename || 'export.csv';

		if (!csv.match(/^data:text\/csv/i)) {
			csv = 'data:text/csv;charset=utf-8,' + csv;
		}
		data = encodeURI(csv);

		link = document.createElement('a');
		link.setAttribute('href', data);
		link.setAttribute('download', filename);
		link.click();
	}
  downloadCSV({ values: opts.values, filename: "result.csv" });
};
