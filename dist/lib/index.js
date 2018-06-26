'use strict';

var parseHtml = function parseHtml(message) {
	return message.replace(/<li>/g, '\n||b¬¬*||/b¬¬').replace(/<strong>|<b>/g, '||b¬¬').replace(/<\/b>/g, '||/b¬¬').replace(/<\/strong>/g, '||/b¬¬').replace(/<\/p>/g, '\n').replace(/<br>|<div>/g, '\n').replace(/<a/g, '||a').replace(/<\/a>/g, '||/a¬¬').replace(/<(?:.|\n)*?>/gm, '').replace(/\|\|/g, '<').replace(/¬¬/g, '>').replace(/\/>/g, '/">');
};

var htmlToTelegram = function htmlToTelegram(message) {
	var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	var arrToRegEx = args.toString().replace(/,/g, '|');
	var reg = new RegExp(arrToRegEx, "g");
	message = parseHtml(message);
	return parseHtml(message.replace(reg, ''));
};

module.exports.htmlToTelegram = htmlToTelegram;