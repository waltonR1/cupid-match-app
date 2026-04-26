const fs = require('node:fs')
const { dbPath, defaultData } = require('./config')

const db = loadDb()

function loadDb() {
  const source = JSON.parse(fs.readFileSync(dbPath, 'utf8'))
  return { ...structuredClone(defaultData), ...source }
}

function persistDb() {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2) + '\n', 'utf8')
}

module.exports = {
  db,
  persistDb,
}
