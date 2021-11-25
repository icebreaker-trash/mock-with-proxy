# mock-with-proxy

> Mock api with recursive proxy

## Usage

### Typescript/ESM

```ts
import { createProxy } from 'mock-with-proxy'

let obj: Record<string, any>
let mockObj: Record<string, any>
obj = createProxy({})
mockObj = createProxy(
  {},
  {
    handler(path, t, done) {
      switch (path) {
        case 'a.1.b': {
          return new Promise((resolve, reject) => {
            resolve({
              a: 'b',
              t,
            })
          })
        }
        case 'b.10.a': {
          return {
            b: 'a',
            t,
          }
        }
      }
      return done()
    },
  }
)

// Then default
const params = {
  img: [],
}
const res = await obj.aaa(params)
expect(res.errCode).toBe(0)
expect(res.invokePath).toBe('aaa')
expect(res.args[0]).toEqual(params)
const res1 = await obj.search.imageSearch(params)
expect(res1.errCode).toBe(0)
expect(res1.invokePath).toBe('search.imageSearch')
expect(res1.args[0]).toEqual(params)

// with map
const res = mockObj.a.a.a.a()
expect(res.invokePath).toBe('a.a.a.a')
const res1 = await mockObj.a[1].b()
expect(res1.a).toBe('b')
const res2 = mockObj.b[10].a()
expect(res2.b).toBe('a')
```

### Commonjs

```js
// the only difference is the require...
const { createProxy } = require('mock-with-proxy')

// then code start here
```

Use as wechat SCF openapi mock by [sonofmagic/simple-cloudbase](https://github.com/sonofmagic/simple-cloudbase)
