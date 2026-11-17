// Offline checks for repository organization and pure helper functions.
// These tests intentionally do not call Firebase or any external service.
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const required = [
  'index.html', 'css/styles.css', 'js/app.js', 'js/router.js',
  'js/auth.js', 'js/firebase-config.example.js', 'js/pages/dashboard.js',
  'js/pages/study-flashcards.js', 'js/pages/study-write.js',
  'js/pages/study-spell.js', 'js/pages/study-learn.js',
  'js/pages/study-mcq.js', 'js/utils/helpers.js'
];
for (const file of required) assert.equal((await stat(resolve(root,file))).isFile(), true);
const source = await readFile(resolve(root, 'js/utils/helpers.js'), 'utf8');
const helpers = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
assert.deepEqual(helpers.importAnkiDeck('Hello\tHola\nGoodbye\tAdiós\n'), [
  { term: 'Hello', definition: 'Hola' },
  { term: 'Goodbye', definition: 'Adiós' }
]);
assert.equal(helpers.escapeHTML('<b title="yes">A&B</b>'), '&lt;b title=&quot;yes&quot;&gt;A&amp;B&lt;/b&gt;');
assert.deepEqual(helpers.shuffleArray(['a', 'b', 'c']).sort(), ['a', 'b', 'c']);
const main = await readFile(resolve(root,'js/app.js'),'utf8');
assert.match(main, /github\.com\/nih00002\/StudyForge-Learning-Platform/);
assert.doesNotMatch(main, /github\.io|web\.app/);
console.log('StudyForge offline source checks passed.');
