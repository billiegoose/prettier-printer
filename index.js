const RenderKid = require('renderkid')
const meta = require('object-metadata')
// TODO: obtain the terminal width if this is a TTY
// but don't throw an error if in the browser.

let settings = {
  number: {
    precision: 5
  },
  string: {
    limit: 200
  }
}

r = new RenderKid()
r.style({
  string: { color: "white" },
  number: { color: "bright-magenta" },
  boolean: { color: "bright-yellow" },
  null: { color: "grey" },
  undefined: { color: "grey" },
  function: { color: "green" },
  date: { color: "magenta" },
  regexp: { color: "cyan" }
})

// Plain un-colored render
let render = {
  'string': (x) => {
    return (x.length > settings.string.limit) ?
        `"${x.slice(0, settings.string.limit)}…"` :
        `"${x}"`
  },
  'number': (x) => {
    let s = String(x)
    return (s.length > settings.number.precision) ?
        Number(x).toPrecision(settings.number.precision) + '…' :
        s
  },
  'boolean': (x) => String(x),
  'null': (x) => String(x),
  'undefined': (x) => String(x),
  'function': (x) => (x.toString()+'\n').match(/([^{]*)[{\n]/)[1].trim(),
  'date': (x) => x.toJSON(),
  'regexp': (x) => String(x),
}

// Wrap in renderkid tags
function renderWithTags (value) {
  let m = meta(value)
  let type = m.type.toLowerCase()
  return `<${type}>${render[type](m.value)}</${type}>`
}

// Colorize by evaluating with renderkid


function renderwrap (value) {
  let s = renderWithTags(value)
  console.log(r.render(s))
  return s
}

module.exports = renderwrap
