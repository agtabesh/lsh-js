const RandomWords = require('random-words')
const Lsh = require('../src/index')

const config = {
  storage: 'memory',
  shingleSize: 5,
  numberOfHashFunctions: 120
}
const lsh = Lsh.getInstance(config)

test('Add documents', () => {
  const numberOfDocuments = 100
  const documents = []

  // generate random documents containing 100 words each
  for (let i = 0; i < numberOfDocuments; i += 1) {
    documents.push(RandomWords({ min: 100, max: 100 }).join(' '))
  }

  // add documents just created to LSH with their id
  console.time(`Add time (${numberOfDocuments} documents each contains 10 words)`)
  for (let i = 0; i < numberOfDocuments; i += 1) {
    lsh.addDocument(i, documents[i])
  }
  console.timeEnd(`Add time (${numberOfDocuments} documents each contains 10 words)`)

  // test documents to be added succesfully
  for (let i = 0; i < numberOfDocuments; i += 1) {
    expect(lsh.getDocument(i)).toBe(documents[i])
  }
})

test('Perform a query', () => {
  // search for a specific document with its id and custom bicketSize
  const q = {
    id: 1,
    bucketSize: 6
  }
  console.time('Query time')
  const result = lsh.query(q)
  console.timeEnd('Query time')

  expect(result).toContain(1)
  expect(result.length).toBeGreaterThanOrEqual(1)
})
