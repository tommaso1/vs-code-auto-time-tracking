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
	const totalMilliseconds = records.reduce((acc, x) => acc + new Date(x.closedAt).getTime() - new Date(x.startedAt).getTime(), 0);
	return `
		<h1><span style="text-transform: capitalize;">${key}</span>: (${fromatDuration(totalMilliseconds)})</h1>
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

function fromatDuration(ms: number) {
	if (ms < 0) { ms = -ms; }
	const time = {
		h: Math.floor(ms / 3600000),
		m: Math.floor(ms / 60000) % 60,
		s: Math.floor(ms / 1000) % 60
	};
	return Object
		.entries(time)
		.filter(v => v[1] !== 0)
		.map(v => `${v[1]}${v[0]}`)
		.join(', ');
}