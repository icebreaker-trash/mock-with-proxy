const { createProxy } = require('../../')

let mockObj = createProxy({})

const res = mockObj.a[1].a()
console.log(res)

mockObj = createProxy({}, {
  handler(p, t, done) {
    if (p === 'a.b.c') {
      return Promise.resolve({
        ok: 200
      })
    }
    return done()
  }
})

mockObj.a.b.c().then(res => {
  return res.ok === 200
})
