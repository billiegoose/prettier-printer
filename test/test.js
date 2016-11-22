"use strict"
let test = require('ava').test
let pp = require('..')

function fn (x) {
  return x
}

let lambda = (x, y) => x * y

test('primitive types', t => {
  t.is(pp(""), '<string>""</string>')
  t.is(pp(42), '<number>42</number>')
  t.is(pp(true), '<boolean>true</boolean>')
  t.is(pp(false), '<boolean>false</boolean>')
  t.is(pp(null), '<null>null</null>')
  t.is(pp(undefined), '<undefined>undefined</undefined>')
  t.is(pp(fn), '<function>function fn(x)</function>')
  t.is(pp(lambda), '<function>(x, y) => x * y</function>')
})

test('object types', t => {
  t.is(pp(new String()), '<string>""</string>')
  t.is(pp(new Number(0)), '<number>0</number>')
  t.is(pp(new Boolean(true)), '<boolean>true</boolean>')
  t.is(pp(/./g), '<regexp>/./g</regexp>')
  t.is(pp(new Date("November 5, 1984")), '<date>1984-11-05T05:00:00.000Z</date>')
})

test('truncated values', t => {
  t.is(pp(Math.PI), '<number>3.1416…</number>')
  t.is(pp(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in elit at
ex efficitur volutpat non sed nisl. Aenean congue facilisis sem. Integer eget ante
dictum, eleifend nibh volutpat, tincidunt nunc. Nullam vel tempor odio. Phasellus
mollis risus eget semper aliquet. Pellentesque accumsan tristique ex id dictum.
Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque erat
tellus, mollis sodales mi eget, gravida pulvinar tortor. Curabitur vitae congue
turpis. Aliquam erat volutpat. Suspendisse vel euismod eros.`),

`<string>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in elit at
ex efficitur volutpat non sed nisl. Aenean congue facilisis sem. Integer eget ante
dictum, eleifend nibh volutpat, tincidunt nun…"</string>`)
})

// test('compound types', t => {
//   t.is(pp({}), '<object>{}</object>', 'object')
//   t.is(pp([]), '<array>[]</array>', 'array')
//   t.is(pp(new Object()), '<object>{}</object>')
//   t.is(pp(new Array()), '<array>[]</array>')
// })
