const rx = (strings, ...expressions) => {
  const expr = strings.map((string, index) => string + (
    Array.isArray(expressions[index])
      ? `(?:${expressions[index].map(rx.escape).join('|')})`
      : rx.escape(expressions[index])
  )).join('');
  if (expr[0] === '/') {
    const m = expr.match(/\/([gimsuy]*)$/);
    if (m) {
      return new RegExp(expr.substr(1, expr.length - 1 - m[0].length), m[1]);
    }
  }
  return new RegExp(expr);
};

rx.escape = src => {
  return String(src||'').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

module.exports = rx;
