'use babel';

import HtmlToJavascriptView from './html-to-javascript-view';
import { CompositeDisposable } from 'atom';

export default {

	htmlToJavascriptView: null,
	modalPanel: null,
	subscriptions: null,

	activate(state) {
		this.htmlToJavascriptView = new HtmlToJavascriptView(state.htmlToJavascriptViewState);
		this.modalPanel = atom.workspace.addModalPanel({
			item: this.htmlToJavascriptView.getElement(),
			visible: false
		});

		// Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
		this.subscriptions = new CompositeDisposable();

		// Register command that toggles this view
		this.subscriptions.add(atom.commands.add('atom-workspace', {
			'html-to-javascript:convert': () => this.convert()
		}));
	},

	deactivate() {
		this.modalPanel.destroy();
		this.subscriptions.dispose();
		this.htmlToJavascriptView.destroy();
	},

	serialize() {
		return {
			htmlToJavascriptViewState: this.htmlToJavascriptView.serialize()
		};
	},

	convert() {
		var editor = atom.workspace.getActiveTextEditor();
		if (editor){
			var selection = editor.getSelectedText()
			if (!!!selection.trim()) return;

			// # Replace all ' in file with \'
			selection = selection.replace(/'/g , "\\'");

			// # Edit selection:
			var lines = selection.split("\n");



			var js_string = "''+\n";
			// # Wrap beginning and end of lines with '
			// # (for the beginning of a line, put it at the beginning of the first non space)
			// # (for the end of a line, trim the end putting '+ at the end of the line)
			for (var i = 0; i < lines.length; i++) {
				var line = lines[i];

				num_leading_whitespace = line.search(/\S|$/);
				var string_leading = '';
				if (num_leading_whitespace){
					for (var i = 0; i < num_leading_whitespace; i++) {
						string_leading += "\t";
					}
				}

				js_string += string_leading + "'" + line.trim() + "'+\n";

			}

			editor.insertText(js_string.substring(0,js_string.length-2), {
				select: true
			}); //# Ignores the last 2 symbols "+\n"
		}

	}

};
