import { Entry } from "./entry";

export function genWebviewContentRaw(entries: Record<string, Entry[]>) {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Cat Coding</title>
  </head>
  <body>
	  ${Object.values(entries).flatMap(key => key.map(entry => genEntryView(entry))).join('\n')}
  </body>
  </html>`;
}

function genEntryView(entry: Entry) {
	return `
	<li>
		${(new Date(entry.startedAt)).toLocaleString()} - ${(new Date(entry.closedAt)).toLocaleString()}${entry.filename ? (' -' + entry.filename) : ''}
	</li>
`;
}
