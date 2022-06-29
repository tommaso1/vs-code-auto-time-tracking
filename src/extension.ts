// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Dictionary, groupBy } from 'lodash';
import { genWebviewContent } from './genHtml';
import { Entry } from './entry';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "auto-time-tracker" is now active!');
	if (vscode.workspace.name) {
		vscode.window.showInformationMessage(`Tracking ${vscode.workspace.name}`);
	}


	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('auto-time-tracker.openReport', () => {

		vscode.window.showInformationMessage("Generating Report");

		const allEntries: Record<string, Entry[]> = groupBy(
			context.globalState.keys().map((key) => context.globalState.get(key) as Entry),
			(entry) => entry.workspace
		);

		const panel = vscode.window.createWebviewPanel(
			'time-tracking-report', // Identifies the type of the webview. Used internally
			'Time Tracking Report', // Title of the panel displayed to the user
			vscode.ViewColumn.One, // Editor column to show the new webview panel in.
			{} // Webview options. More on these later.
		);
		panel.webview.html = genWebviewContent(allEntries);

	});



	let workSpaceOpenedAt = new Date();
	let workSpaceClosedAt = new Date();
	let currentWorkspace = vscode.workspace.name;

	let interval = setInterval(() => {

		if (vscode.workspace.name !== currentWorkspace) {
			// chiudo la time entry
			vscode.window.showInformationMessage(`Stop tracking of: ${vscode.workspace.name}`);
			currentWorkspace = vscode.workspace.name;
			workSpaceOpenedAt = new Date();
			workSpaceClosedAt = new Date();
			return;
		}

		workSpaceClosedAt = new Date();
		context.globalState.update(`${currentWorkspace} - ${workSpaceOpenedAt.toISOString()}`, {
			workspace: currentWorkspace,
			startedAt: workSpaceOpenedAt.toISOString(),
			closedAt: workSpaceClosedAt.toISOString()
		});

	}, 5000);

	const intervalDispose: vscode.Disposable = {
		dispose() {
			clearInterval(interval);
		}
	};

	context.subscriptions.push(disposable);
	context.subscriptions.push(intervalDispose);

}

// this method is called when your extension is deactivated
export function deactivate() {
	console.log("Extension deactivated")
}
