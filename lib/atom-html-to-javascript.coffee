$ = jQuery = require 'jquery'


{CompositeDisposable} = require 'atom'

module.exports =
	subscriptions: null

	activate: ->
		@subscriptions = new CompositeDisposable
		@subscriptions.add atom.commands.add 'atom-workspace',
		'atom-html-to-javascript:convert': => @convert()

	deactivate: ->
		@subscriptions.dispose()

	convert: ->
		if editor = atom.workspace.getActiveTextEditor()
			selection = editor.getSelectedText()
			return if !!!selection.trim()

			# Replace all ' in file with \'
			selection = selection.replace(/'/g , "\\'");

			# Edit selection:
			lines = selection.split("\n");



			js_string = "''+\n"
			# Wrap beginning and end of lines with '
			# (for the beginning of a line, put it at the beginning of the first non space)
			# (for the end of a line, trim the end putting '+ at the end of the line)
			for line in lines
				num_leading_whitespace = line.search(/\S|$/)
				string_leading = ''
				if num_leading_whitespace
					for [1..num_leading_whitespace]
						string_leading += "\t"

				js_string += string_leading + "'" + line.trim() + "'+\n"

			editor.insertText(js_string.substring(0,js_string.length-2), {
					select: true
			}) # Ignores the last 2 symbols "+\n"
