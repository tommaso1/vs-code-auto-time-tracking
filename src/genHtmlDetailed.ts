import { Entry } from "./entry";
import { Dictionary, groupBy } from "lodash";

export function genWebviewContentDetailed(entries: Record<string, Entry[]>) {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Cat Coding</title>
  </head>
  <body>
	  ${Object.keys(entries).map(key => getWorkspacesList(key, entries[key])).join('\n')}
  </body>
  </html>`;
}

function getWorkspacesList(key: string, records: Entry[]) {
	const totalMilliseconds = records.reduce((acc, x) => acc + new Date(x.closedAt).getTime() - new Date(x.startedAt).getTime(), 0);
	const entriesGroupedByDay = groupBy(records, (record) => record.startedAt.substring(0, 10));
	return `
		<h1><span style="text-transform: capitalize;">${key}</span>: (${fromatDuration(totalMilliseconds)})</h1>
		<ul>
			${Object.keys(entriesGroupedByDay).map(key => getDailyEntryView(key, entriesGroupedByDay[key])).join('\n')}
		</ul>
	`;
}

function getDailyEntryView(day: string, records: Entry[]) {
	const totalMilliseconds = records.reduce((acc, x) => acc + new Date(x.closedAt).getTime() - new Date(x.startedAt).getTime(), 0);

	const entriesGroupedByFile = groupBy(records, (entry) => entry.filename ?? 'No filename');

	return `
	<h2><span style="text-transform: capitalize;">${day}</span>: (${fromatDuration(totalMilliseconds)})</h2>
	<li>
		<ul>
		${Object.keys(entriesGroupedByFile).map(key => getByFileView(key, entriesGroupedByFile[key])).join('\n')}
		</ul>
	</li>
`;
}

function getByFileView(fileName: string, records: Entry[]) {
	const totalMilliseconds = records.reduce((acc, x) => acc + new Date(x.closedAt).getTime() - new Date(x.startedAt).getTime(), 0);

	const entriesGroupedByFile = groupBy(records, (entry) => entry.filename ?? 'No filename');

	return `
	<h3><span style="text-transform: capitalize;">${fileName}</span>: (${fromatDuration(totalMilliseconds)})</h3>
	<li>
		<ul>
			${records.map(entry => genEntryView(entry)).join('\n')}
		</ul>
	</li>
`;
}

function genEntryView(entry: Entry) {
	return `
	<li>
		${(new Date(entry.startedAt)).toLocaleString()} - ${(new Date(entry.closedAt)).toLocaleString()}${entry.filename ? (' -' + entry.filename) : ''}
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