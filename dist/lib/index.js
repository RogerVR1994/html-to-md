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
*/
var htmlToTelegram = function htmlToTelegram(message) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var arrToRegEx = args.toString().replace(/,/g, '|');
  var reg = new RegExp(arrToRegEx, "g");
  message = parseHtml(message);
  return parseHtml(message.replace(reg, ''));
};

module.exports.htmlToTelegram = htmlToTelegram;