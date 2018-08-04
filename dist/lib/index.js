'use strict';

/**
  * @overview Yum-Rocky is a simple node module that allows 
  * you to convert complex HTML output from a conversation servive
  * lile Watson or LUIS. Telegram only allows bold, itlalic, link, 
  * image, inline-code and pre tags. If the output from your service
  * has more complex HTML, this module will adjust it to display nicely
  * in Telegram. This  module is meant for those that use a web chatbot 
  * and a Telegram Chatbot.
*/

var templates = require('messenger_templates');

/**
  * parseHtml() cleans all HTML tags that are not supported by Telegram and 
  * will leave all valid tags untouched.
  * @param {String} message - direct output from your conversation service.
  * @returns {String} formatted string compatible with Telegram
  */
var parseHtml = function parseHtml(message) {
	return message.replace(/<li>/g, '\n||b¬¬*||/b¬¬').replace(/<strong>|<b>/g, '||b¬¬').replace(/<\/b>/g, '||/b¬¬').replace(/<\/strong>/g, '||/b¬¬').replace(/<\/p>/g, '\n').replace(/<br>|<div>|<hr>/g, '\n').replace(/<a/g, '||a').replace(/<\/a>/g, '||/a¬¬').replace(/<(?:.|\n)*?>/gm, '').replace(/\|\|/g, '<').replace(/¬¬/g, '>').replace(/\/>/g, '/">');
};

/**
  * htmlToTelegram is the function to be used when you have some 
  * properties inside some of the valid tags. For Telegram it is 
  * not valid to have attributes inside of HTML tags. So you will 
  * have to declare all attributes in a JSON.
  * @param {String} message - unformatted HTML text
  * @param {Array} args - array of strings with the attributes inside
  * the bold, italic, links tags
  * @return {String} formatted string compatible with Telegram
  * @example
  * // returns <b>Hello, World!</b><a href="yourwbesite.com">click here</a>
  * htmlToTelegram('<div><b class="your_class">Hello, World!</b></div><a href="yourwbesite.com">click here</a>', ['class="your_class"']);
*/
var htmlToTelegram = function htmlToTelegram(message) {
	var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	var arrToRegEx = args.toString().replace(/,/g, '|');
	var reg = new RegExp(arrToRegEx, 'g');
	message = parseHtml(message);
	return parseHtml(message.replace(reg, ''));
};

var purgeHtml = function purgeHtml(message) {
	return message.replace(/<(?:.|\n)*?>/gm, '');
};

var doubleColumns = function doubleColumns(options) {
	var template = {
		'parse_mode': 'HTML',
		'reply_markup': {
			'inline_keyboard': []
		}
	};
	for (var i = 0; i < Object.keys(options).length; i += 2) {
		if (options[i + 1] !== undefined) {
			template.reply_markup.inline_keyboard.push([{ 'text': templates.purgeHtml(options[i].slice(0, 59)), 'callback_data': templates.purgeHtml(options[i].slice(0, 59)) }, { 'text': templates.purgeHtml(options[i + 1].slice(0, 59)), 'callback_data': templates.purgeHtml(options[i + 1].slice(0, 59)) }]);
		} else {
			template.reply_markup.inline_keyboard.push([{ 'text': templates.purgeHtml(options[i].slice(0, 59)), 'callback_data': templates.purgeHtml(options[i].slice(0, 59)) }]);
		}
	}

	return template;
};

var singleColumns = function singleColumns(options) {
	var template = {
		'parse_mode': 'HTML',
		'reply_markup': {
			'inline_keyboard': []
		}
	};
	for (var i = 0; i < Object.keys(options).length; i += 1) {
		template.reply_markup.inline_keyboard.push([{ 'text': templates.purgeHtml(options[i].slice(0, 59)), 'callback_data': templates.purgeHtml(options[i].slice(0, 59)) }]);
	}

	return template;
};

/**
 * createButtons() is a function that allows you to create a grid of buttons
 * in Telegram using a parameter from Watson.
 * @param {Array} options - Array of possible responses to be displayed in Telegram
 * @returns {Object} template - Object with the correct Telegram format
*/

var createButtons = function createButtons(options) {
	var single;
	options.forEach(function (element, index) {
		if (element.length > 30) {
			single = true;
		}
	});
	if (single) {
		return singleColumns(options);
	}
	return doubleColumns(options);
};

module.exports.htmlToTelegram = htmlToTelegram;
module.exports.createButtons = createButtons;
module.exports.purgeHtml = purgeHtml;