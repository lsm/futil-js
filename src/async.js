import _ from 'lodash/fp'
import Promise from 'bluebird'

export const asyncMap = _.curry((fn, obj) => Promise.all(_.map(fn, obj)))

export const asyncReduce = _.curry(async (fn, obj) => {
  let r = obj[0]
  let i = 1
  while (i < obj.length) {
    r = await fn(r, obj[i])
    i++
  }
  return r
})

export const asyncIterator = async iterator => {
  let results = []
  while (true) {
    let result = iterator.next()
    if (!result || result.done) break
    results.push(await result.value)
  }
  return results
}
