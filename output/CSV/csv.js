$(function () {
	// Build the toolbox categories and load the blocks into them.
	// The blocks have a custom function toolbox$ to make it easier to
	// centralize the code.
	T$.on("load toolbox categories", function (ev) {
		var cat = ev.toolbox.find("category[name='" + T$.i18n('Display') + "']");
		if (!cat.length)
			qryCat = $("<category name='" + T$.i18n('Display') + "'></category>").appendTo(ev.toolbox);
	});
});
/**
 * csv entries
 */
Blockly.Blocks['csv'].toolbox$ = function ($toolbox) {
	var cat = $toolbox.find("category[name='" + T$.i18n('Display') + "']");
	if (cat)
		$('<block type="csv"></block>').appendTo(cat);
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
