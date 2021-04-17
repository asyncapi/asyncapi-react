const defaultColors = {
  keyClass: 'text-orange-500',
  numberClass: 'text-blue-500',
  stringClass: 'text-teal-500',
  trueClass: 'text-blue-500',
  falseClass: 'text-blue-500',
  nullClass: 'text-gray-500',
};

const entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '`': '&#x60;',
  '=': '&#x3D;',
};

function escapeHtml(html: any) {
  return String(html).replace(/[&<>"'`=]/g, function(s) {
    return entityMap[s];
  });
}

export function formatHighlight(json: any, colorOptions = {}): string {
  const valueType = typeof json;
  if (valueType !== 'string') {
    json = JSON.stringify(json, null, 2) || valueType;
  }
  let colors = Object.assign({}, defaultColors, colorOptions);
  json = json
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>');
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+]?\d+)?)/g,
    (match: any) => {
      let color = colors.numberClass;
      let style = '';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          color = colors.keyClass;
        } else {
          color = colors.stringClass;
          match = '"' + escapeHtml(match.substr(1, match.length - 2)) + '"';
          style = 'word-wrap:break-word;white-space:pre-wrap;';
        }
      } else {
        color = /true/.test(match)
          ? colors.trueClass
          : /false/.test(match)
          ? colors.falseClass
          : /null/.test(match)
          ? colors.nullClass
          : color;
      }
      return `<span style="${style}" class="${color}">${match}</span>`;
    },
  );
}
