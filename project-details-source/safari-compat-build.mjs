import postcss from 'postcss'
import { createHash } from 'node:crypto'
import { transform } from 'lightningcss'

// Safari 14 discards entire @layer blocks. Preserve the generated layer order,
// then lower nesting, modern selectors and colors for its CSS parser.
export default function safariCompatBuild() {
  return {
    name: 'portfolio-safari-compatible-css',
    enforce: 'post',
    generateBundle: {
      order: 'post',
      handler(_options, bundle) {
        const renamed = []
        for (const entry of Object.values(bundle)) {
          if (entry.type !== 'asset' || !entry.fileName.endsWith('.css')) continue
          const root = postcss.parse(String(entry.source))
          root.walkAtRules('layer', rule => {
            if (rule.nodes) rule.replaceWith(...rule.nodes)
            else rule.remove()
          })
          const fallback = postcss.atRule({ name: 'supports', params: 'not (translate: 0)' })
          root.walkDecls(/^(translate|scale|rotate)$/, declaration => {
            const rule = declaration.parent
            if (rule.parent.type === 'atrule' && /keyframes/.test(rule.parent.name)) {
              if (declaration.prop === 'translate') declaration.replaceWith({ prop: 'transform', value: `translate(${declaration.value.split(' ').join(',')})` })
              return
            }
            if (rule.type !== 'rule') return
            const value = declaration.prop === 'translate' || declaration.prop === 'scale'
              ? declaration.value.split(/\s+(?![^()]*\))/).join(',') : declaration.value
            const compatible = postcss.rule({ selector: rule.selector })
            compatible.append({ prop: `--portfolio-${declaration.prop}`, value: `${declaration.prop}(${value})` })
            compatible.append({ prop: 'transform', value: 'var(--portfolio-translate,translate(0,0)) var(--portfolio-rotate,rotate(0deg)) var(--portfolio-scale,scale(1,1))' })
            fallback.append(compatible)
          })
          if (fallback.nodes && fallback.nodes.length) root.append(fallback)
          const colorCache = new Map()
          root.walkDecls(declaration => {
            if (declaration.prop === 'overflow' && declaration.value === 'clip') declaration.value = 'hidden'
            declaration.value = declaration.value.replace(/ in (?:oklab|oklch|srgb|display-p3)/g, '')
            declaration.value = declaration.value.replace(/\b(?:oklch|oklab|lab|lch)\([^()]*\)/g, color => {
              if (!colorCache.has(color)) {
                const lowered = transform({ code: Buffer.from(`a{color:${color}}`), targets: { safari: 13 << 16 }, minify: true }).code.toString()
                let first
                postcss.parse(lowered).walkDecls('color', d => { if (!first) first = d.value })
                colorCache.set(color, first || color)
              }
              return colorCache.get(color)
            })
          })
          entry.source = transform({
            filename: entry.fileName,
            code: Buffer.from(root.toString()),
            targets: { safari: (13 << 16) | (1 << 8) },
            minify: true,
          }).code.toString()
          const compatible = postcss.parse(entry.source)
          compatible.walkDecls('background-clip', d => {
            if (d.value === 'text') d.cloneBefore({ prop: '-webkit-background-clip' })
          })
          entry.source = compatible.toString()
          const oldName = entry.fileName
          const newName = `assets/index-safari-${createHash('sha256').update(entry.source).digest('hex').slice(0,12)}.css`
          this.emitFile({ type: 'asset', fileName: newName, source: entry.source })
          delete bundle[oldName]
          renamed.push([oldName, newName])
        }
        for (const entry of Object.values(bundle)) {
          if (entry.type === 'asset' && entry.fileName.endsWith('.html')) {
            for (const [before, after] of renamed) entry.source = String(entry.source).split(before).join(after)
          }
        }
      },
    },
  }
}
