
let tokens = {};

function saveTokens(userId, newTokens) {
  tokens[userId] = newTokens;
}

function getTokens(userId) {
  return tokens[userId] || null;
}

module.exports = { saveTokens, getTokens };
