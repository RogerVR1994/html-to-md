'use strict';

var parseHtml = function parseHtml(message) {
  return message.replace(/<li>/g, '\n<strong>*</strong>').replace(/<b>|<strong>/g, '||b¬¬').replace(/<\/b>|<\/strong>/g, '||/b¬¬').replace(/<a/, '||a').replace(/<\/a/g, '||/a').replace(/<p>/g, '\n').replace(/">/g, '¬¬').replace(/<(?:.|\n)*?>/gm, '').replace(/\|\|/g, '<').replace(/¬¬/g, '>').replace(/ class="a-popup/g, '');
};

module.exports.parseHtml = parseHtml;