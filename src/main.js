import './style.css'
import Split from 'split-grid'
import { encode, decode } from 'js-base64'

const $ = selector => document.querySelector(selector)

Split({
    columnGutters: [{
        track: 1,
        element: $('.gutter-col-1'),
    }],
    rowGutters: [{
        track: 1,
        element: $('.gutter-row-1'),
    }]
})


console.log("main!")

const $js = $('#js')
const $css = $('#css')
const $html = $('#html')


$js.addEventListener('input', update)
$css.addEventListener('input', update)
$html.addEventListener('input', update)

function init () {
    const { pathname } = window.location

    const [rawHtml, rawCss, rawJs] = pathname.slice(1).split('%7C')

    const html = decode(rawHtml)
    const css = decode(rawCss)
    const js = decode(rawJs)

    $html.value = html
    $css.value = css
    $js.value = js

    const output = createHtml({html, css, js})
    $('iframe').setAttribute('srcdoc', output)
}

function update () {
    const html = $html.value
    const css = $css.value
    const js = $js.value

    const hashedCode = `${encode(html)}|${encode(css)}|${encode(js)}`
    console.log(hashedCode)

    window.history.replaceState(null, null, `/${hashedCode}`)

    const output = createHtml({html, css, js})
    $('iframe').setAttribute('srcdoc', output)
}

const createHtml = ({html, css, js}) => {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <style>
        ${css}
    </style>
</head>
<body>
    ${html}
    <script>
        ${js}
    </script>
</body>
</html>`
}

init()