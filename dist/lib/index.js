'use strict';

var parseHtml = function parseHtml(message) {
  return message.replace(/<li>/g, '\n||b¬¬*****||/b¬¬').replace(/<strong>/g, '||b¬¬').replace(/<\/strong>/g, '||/b¬¬').replace(/<p>/g, '').replace(/<\/p>/g, '\n').replace(/<br>/g, '\n').replace(/<a/g, '||a').replace(/<\/a>/g, '||/a¬¬').replace().replace(/<(?:.|\n)*?>/gm, '').replace(/ class="a-popup"/g, '').replace(/\|\|/g, '<').replace(/¬¬/g, '>').replace(/\/>/g, '/">');
};

module.exports.parseHtml = parseHtml;