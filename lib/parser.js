import { parse as babylon } from 'babylon';
import fs from 'fs';
import glob from 'glob';
import path from 'path';

import walk from './walk';
import handlers from './handlers';
import resolve from './utils/resolve';

export default function parse(files, options = {}) {
  let result = [];

  files = Array.isArray(files) ? files : Array.of(files);

  for (let fileGlob of files) {
    for (let file of glob.sync(fileGlob)) {
      result = result.concat(parseFile(file, options));
    }
  }

  result.sort();

  return result;
}

function parseFile(file, options = {}) {
  let result = [];
  let content = fs.readFileSync(file).toString();

  try {
    let ast = babylon(content, options.parsing);

    walk(ast, undefined, node => {
      let handler = handlers[node.type];

      if (handler) {
        let type = resolve(handler.type, [node], handler.type);
        let opts = resolve(handler.opts, [node], {});

        let tag = createTag(node, file, type, opts, options);

        if (tag) {
          result.push(tag);
        }
      }
    });
  } catch(e) {
    if (!options.silent) {
      throw e;
    }
  }

  return result;
}

function createTag(item, filename, type, opts, options) {
  let idKey = item.id ? 'id' : item.key ? 'key' : 'local';

  if (!item[idKey] || !item[idKey].name) {
    return null;
  }

  let name = item[idKey].name;

  let tag = [
    name,
    options.absolutePaths ? path.resolve(filename) : filename,
    `${item.loc.start.line - 1}/\\<${name}\\>/;"`,
    type,
    `lineno:${item.loc.start.line}`
  ];

  for (let name of Object.keys(opts)) {
    tag.push(`${name}:${opts[name]}`);
  }

  return tag.join('\t');
}
