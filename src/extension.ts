import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('keyboard-translator.cyrillicTranslate', function () {
		// Get the active text editor
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			const selection = editor.selection;

			// Get the word within the selection
			var word = document.getText(selection);

			const result = translateToLatin(word);

			editor.edit(editBuilder => {
				editBuilder.replace(selection, result);
			});
		}
	});

	context.subscriptions.push(disposable);
}

export function cyrillicLatin(str: string): string {
	const cyrillic = [
		"ё", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
		"ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э",
		"я", "ч", "с", "м", "и", "т", "ь", "б", "ю"
	];

	const latin = [
		"`", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "\\[", "\\]",
		"a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'",
		"z", "x", "c", "v", "b", "n", "m", ",", "\\."
	];


	for (var i = 0; i < cyrillic.length; i++) {
		var reg = new RegExp(cyrillic[i], 'mig');
		str = str.replace(reg, function (a) {
			return a == a.toLowerCase() ? latin[i] : latin[i].toUpperCase();
		});
	}

	return str;
}

export function ukrCyrillicLatin(str: string): string {
	const ukrCyrillic = [
		"й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ї",
		"ф", "і", "в", "а", "п", "р", "о", "л", "д", "ж", "є",
		"я", "ч", "с", "м", "и", "т", "ь", "б", "ю"
	];

	const latin = [
		"q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "\\[", "\\]",
		"a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'",
		"z", "x", "c", "v", "b", "n", "m", ",", "\\."
	];


	for (var i = 0; i < ukrCyrillic.length; i++) {
		var reg = new RegExp(ukrCyrillic[i], 'mig');
		str = str.replace(reg, function (a) {
			return a == a.toLowerCase() ? latin[i] : latin[i].toUpperCase();
		});
	}

	return str;
}

export function translateToLatin(str: string): string {
	let result = '';
	let ukrLetters = ['і', 'ї', 'є']
	if (ukrLetters.some(el => str.includes(el))) {
		result = ukrCyrillicLatin(str);
	}
	else {
		result = cyrillicLatin(str);
	}

	return result;
}
