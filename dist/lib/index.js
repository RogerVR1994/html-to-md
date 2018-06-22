const parseHtml = message => message.replace(/<li>/g, '\n<strong>').replace(/<\/li>/g, '\n</strong>').replace(/<b>|<strong>/g, '||b¬¬').replace(/<\/b>|<\/strong>/g, '||/b¬¬').replace(/<a/, '||a').replace(/<\/a/g, '||/a').replace(/<p>/g, '\n').replace(/">/g, '¬¬').replace(/<(?:.|\n)*?>/gm, '').replace(/\|\|/g, '<').replace(/¬¬/g, '>').replace(/ class="a-popup/g, '');

module.exports.parseHtml = parseHtml;