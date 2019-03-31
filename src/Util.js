const range = (from, to, step = 1) => Array.from(Array(to + 1).keys()).slice(from).map(x => x * step)

module.exports = { range }
