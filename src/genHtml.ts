import { Entry } from "./entry";

export function genWebviewContent(entries: Record<string, Entry[]>) {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Cat Coding</title>
  </head>
  <body>
	  ${Object.keys(entries).map(key => genList(key, entries[key])).join('\n')}
  </body>
  </html>`;
}



function genList(key: string, records: Entry[]) {
	return `
		<h1>${key}:</h1>
		<ul>
			${records.map(entry => genEntryView(entry)).join('\n')}
		</ul>
	`;
}

function genEntryView(entry: Entry) {
	return `
	<li>
		${(new Date(entry.startedAt)).toLocaleString()} - ${(new Date(entry.closedAt)).toLocaleString()}
	</li>
`;
}