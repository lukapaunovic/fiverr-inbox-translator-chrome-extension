import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const ext=path.join(root,'extension');
const manifest=JSON.parse(fs.readFileSync(path.join(ext,'manifest.json'),'utf8'));
assert.equal(manifest.manifest_version,3);
const references=[manifest.background.service_worker,manifest.options_page,manifest.action.default_popup,...Object.values(manifest.icons),...manifest.content_scripts.flatMap(x=>x.js)];
for(const file of references)assert(fs.existsSync(path.join(ext,file)),file);
assert(!fs.existsSync(path.join(ext,'private-config.json')));
for(const file of fs.readdirSync(ext)){
 if(file.endsWith('.js'))execFileSync(process.execPath,['--check',path.join(ext,file)]);
 if(/\.(js|html|json|css)$/.test(file)){
  const source=fs.readFileSync(path.join(ext,file),'utf8');
  assert(!/sk-(?:proj-)?[A-Za-z0-9_-]{30,}/.test(source),'Possible credential in '+file);
  assert(!source.includes('private-config.json'),'Private bootstrap in '+file);
 }
}
console.log('Manifest references, JavaScript syntax and public-package checks passed.');
