import { useEffect, useRef, useState } from 'react'
import type { ImgHTMLAttributes } from 'react'
import media from './responsive-media.json'

type ResponsiveImage = { width: number; height: number; variants: { src: string; width: number }[] }
const manifest = media as Record<string, ResponsiveImage>
const waiting = new Map<Element, () => void>()
let imageObserver: IntersectionObserver | undefined
function watchImage(element: Element, load: () => void) {
  if (!window.IntersectionObserver) { load(); return () => {} }
  if (!imageObserver) imageObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return
    const ready = waiting.get(entry.target)
    waiting.delete(entry.target); imageObserver!.unobserve(entry.target); ready?.()
  }), { rootMargin: '1200px 0px' })
  waiting.set(element, load); imageObserver.observe(element)
  return () => { waiting.delete(element); imageObserver?.unobserve(element) }
}

// A single loader avoids native lazy-loading delays inside scaled case canvases.
// Keep data-src as the original so the detail viewer retains full source quality.
export default function CaseImage({ src, loading = 'lazy', sizes, width, height, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const key = src?.split('/assets/')[1]
  const responsive = key ? manifest[key] : undefined
  const eager = loading === 'eager' || !!src?.endsWith('.svg')
  const [ready, setReady] = useState(eager)
  const ref = useRef<HTMLImageElement>(null)
  useEffect(() => {
    if (ready || !ref.current) return
    return watchImage(ref.current, () => setReady(true))
  }, [ready, src])
  const base = `${import.meta.env.BASE_URL}assets/`
  return <img {...props} ref={ref}
    width={width ?? responsive?.width} height={height ?? responsive?.height}
    src={ready ? responsive ? base + responsive.variants[responsive.variants.length - 1].src : src : undefined}
    srcSet={ready && responsive ? responsive.variants.map(v => `${base}${v.src} ${v.width}w`).join(', ') : undefined}
    sizes={responsive ? sizes ?? '(max-width: 699px) 100vw, 80vw' : undefined}
    data-src={src} loading="eager" decoding="async" />
}
