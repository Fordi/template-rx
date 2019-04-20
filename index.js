const rx = (strings, ...expressions) => {
  let flags = '';
  let expr = strings.map((string, index) => string + (
    Array.isArray(expressions[index])
      ? `(?:${expressions[index].map(rx.escape).join('|')})`
      : rx.escape(expressions[index])
  )).join('');
  const m = expr.match(/\/([gimsuy]*)$/);
  if (m && expr[0] === '/') {
    expr = expr.substr(1, expr.length - 1 - m[0].length);
    flags = m[1];
  }
  return new RegExp(expr, flags);
};

rx.escape = src => {
  return String(src||'').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

module.exports = rx;


const selfCloser = tagName => rx`/<(${tagName})([^>]+)/>/ig`;

const html = '<html><head><meta charset="utf-8" /></head><body><img src="logo.png" /></html>';
// /<meta([^>]+)\/>/g
const metaRx = selfCloser('meta');
// /<(?:meta|img)([^>]+)\/>/g
const metaImgRx = selfCloser(['meta', 'img']);

console.log(html.match(metaRx));
// > ['<meta charset="utf-8" />', ' charset="utf-8" ']
console.log(html.match(metaImgRx));
