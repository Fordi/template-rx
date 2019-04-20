const rx = require('./index');
const assert = (message, actual, expected) => {
  if (expected === 'undefined') {
    if (!expression) throw new Error(message);
  }
  if (expected != actual) {
    throw new Error(`${message}:\n\texpected:${JSON.stringify(expected)}\n\tactual:${JSON.stringify(actual)}`);
  }
}

assert('It should work without guards', rx`<img[^\\]]+\\/>`.toString(), '/<img[^\\]]+\\/>/');
assert('It should work with guards and no flags', rx`/<img[^\\]]+\\/>/`.toString(), '/<img[^\\]]+\\/>/');
assert('It should work with guards and flags', rx`/<img[^\\]]+\\/>/isu`.toString(), '/<img[^\\]]+\\/>/isu');
assert('It should escape expressions', rx`<${'test|expr'}[^\\]]+\\/>`.toString(), '/<test\\|expr[^\\]]+\\/>/');
assert('It should treat arrays as uncaptured option lists', rx`<${['test', 'expr']}[^\\]]+\\/>`.toString(), '/<(?:test|expr)[^\\]]+\\/>/');
assert('rx.escape should be present and should escape regular expression symbols', rx.escape('[]'), '\\[\\]');
