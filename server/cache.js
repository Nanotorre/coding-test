const NodeCache = require( "node-cache" );

const cache = new NodeCache({ stdTTL: 60 * 60 * 24})

function set (page, data) {
  return cache.set(page, data)
}

function get (page) {
  return  cache.get(page)
}

function del (page) {
  return  cache.del(page)
}

function keys (page) {
  return  cache.keys()
}

let membersBuffer = 120;
let page = 0;

module.exports = { get, set, del, membersBuffer, page, keys }