import { useEffect, useRef, useState } from 'react'
import type { ImgHTMLAttributes } from 'react'

const waiting = new Map<Element, () => void>()
let imageObserver: IntersectionObserver | undefined
function watchImage(element: Element, load: () => void) {
  if (!window.IntersectionObserver) { load(); return () => {} }
  if (!imageObserver) imageObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return
    const ready = waiting.get(entry.target)
    waiting.delete(entry.target); imageObserver!.unobserve(entry.target); ready?.()
  }), { rootMargin: '900px 0px' })
  waiting.set(element, load); imageObserver.observe(element)
  return () => { waiting.delete(element); imageObserver?.unobserve(element) }
}

// iPadOS 14 ignores native loading="lazy". Defer image decoding there too.
export default function CaseImage({ src, loading = 'lazy', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const nativeLazy = typeof HTMLImageElement !== 'undefined' && 'loading' in HTMLImageElement.prototype
  const [ready, setReady] = useState(nativeLazy || loading === 'eager')
  const ref = useRef<HTMLImageElement>(null)
  useEffect(() => {
    if (ready || !ref.current) return
    return watchImage(ref.current, () => setReady(true))
  }, [ready, src])
  return <img {...props} ref={ref} src={ready ? src : undefined} data-src={src} loading={loading} />
}
