import { useEffect, useLayoutEffect, memo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import ProjectPage from './ProjectPage'
import MobileProject from './MobileProject'
import HotelTaskProject from './HotelTaskProject'
import HotelSolutionProject from './HotelSolutionProject'
import CaseImage from './CaseImage'

// Scroll progress updates must never rebuild the long case body or phone figures.
const PromotionBody = memo(ProjectPage)
const MobilePromotionBody = memo(MobileProject)
const HotelTaskBody = memo(HotelTaskProject)
const HotelSolutionBody = memo(HotelSolutionProject)

const promotionChapters = [
  { name: '项目背景', node: '6:79', mobile: 'background' },
  { name: '问题洞察', node: '6:292', mobile: 'insights' },
  { name: '设计策略', node: '6:287', mobile: 'strategy' },
  { name: '设计方案', node: '6:362', mobile: 'design' },
  { name: '经验总结', node: '6:3844', mobile: 'workflow' },
  { name: '数据反馈', node: '6:3950', mobile: 'results' },
]
const hotelChapters = [
  { name: '项目背景', node: '23:81', mobile: '' },
  { name: '问题梳理', node: '23:14', mobile: '' },
  { name: '用户调研', node: '23:216', mobile: '' },
  { name: '设计方向', node: '23:19', mobile: '' },
  { name: '可读', node: '23:24', mobile: '' },
  { name: '决策', node: '23:32', mobile: '' },
  { name: '操作', node: '23:40', mobile: '' },
  { name: '数据反馈', node: '23:48', mobile: '' },
]

const solutionChapters = [
  { name: '项目背景', node: '1:109', mobile: '' },
  { name: '竞品分析', node: '1:100', mobile: '' },
  { name: '设计机会', node: '1:29', mobile: '' },
  { name: '设计叙事', node: '1:38', mobile: '' },
  { name: '情绪板', node: '1:47', mobile: '' },
  { name: '品牌色彩', node: '1:56', mobile: '' },
  { name: '图形语言', node: '1:65', mobile: '' },
  { name: '页面设计', node: '1:82', mobile: '' },
  { name: 'AI 探索', node: '1:91', mobile: '' },
]
const homeUrl = '/Portfolio/'
const projectCards = [
  { id: 'promotion', title: '携程酒店商户系统 E-Booking', subtitle: '促销界面升级', year: '2025', image: `${import.meta.env.BASE_URL}assets/cover-ebooking.png` },
  { id: 'hotel-task', title: '携程业务系统HT', subtitle: '任务界面升级', year: '2024', image: `${import.meta.env.BASE_URL}assets/cover-hotel-task.png` },
  { id: 'hotel-solution', title: 'Hotel Solution', subtitle: '酒店宣传网站0-1搭建', year: '2026', image: `${import.meta.env.BASE_URL}assets/cover-hotel-solution.png` },
]
const projects = ['promotion', 'hotel-task', 'hotel-solution'] as const
type Project = typeof projects[number]
function currentProject(): Project {
  const hash = window.location.hash.slice(1)
  return projects.find(project => project === hash) ?? 'promotion'
}

export default function App() {
  const [project, setProject] = useState<Project>(currentProject)
  const [compact, setCompact] = useState(() => window.innerWidth < 700)
  const isHotel = project === 'hotel-task'
  const isPromotion = project === 'promotion'
  const isSolution = project === 'hotel-solution'
  const chapters = isSolution ? solutionChapters : isHotel ? hotelChapters : promotionChapters
  const [scale, setScale] = useState(() => Math.min(window.innerWidth / 1680, 1))
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState('')
  const [zoom, setZoom] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const canvas = useRef<HTMLDivElement>(null)

  // Reset before painting the destination, including browser back/forward navigation.
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [project, compact])

  useEffect(() => {
    document.documentElement.dataset.project = project
    document.title = '戈珊珊 · UX/UI Designer'
    document.documentElement.lang = 'zh-CN'
    const resize = () => { setScale(Math.min(window.innerWidth / 1680, 1)); setCompact(window.innerWidth < 700) }
    const scroll = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight
      setProgress(available > 0 ? window.scrollY / available : 0)
      let current = 0
      chapters.forEach((chapter, index) => {
        const element = isPromotion && window.innerWidth < 700
          ? document.getElementById(chapter.mobile)
          : canvas.current?.querySelector(`[data-node-id="${chapter.node}"]`)
        if (element && element.getBoundingClientRect().top < window.innerHeight * 0.4) current = index
      })
      setActive(current)
    }
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', scroll, { passive: true })
    scroll()
    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', scroll)
    }
  }, [project, compact])

  useEffect(() => {
    const area = canvas.current
    if (!area) return
    const lastContent = area.querySelector<HTMLElement>(isSolution ? '[data-node-id="1:589"]' : isHotel ? '[data-node-id="23:542"]' : '[data-node-id="6:3979"]')
    if (!lastContent) return
    let disposed = false
    const fitContent = () => {
      if (disposed) return
      if (isPromotion && window.innerWidth < 700) { area.style.height = ''; return }
      area.style.height = `${Math.ceil(lastContent.getBoundingClientRect().bottom - area.getBoundingClientRect().top)}px`
    }
    const observer = new ResizeObserver(fitContent)
    observer.observe(lastContent)
    if (isSolution && area.firstElementChild) observer.observe(area.firstElementChild)
    fitContent()
    document.fonts.ready.then(fitContent)
    return () => { disposed = true; observer.disconnect(); area.style.height = '' }
  }, [project, scale, compact])

  useEffect(() => {
    const change = () => {
      setProject(currentProject())
      setImage('')
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
    window.addEventListener('hashchange', change)
    return () => window.removeEventListener('hashchange', change)
  }, [])

  useEffect(() => {
    const area = canvas.current
    if (!area || isSolution) return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { rootMargin: '0px 0px 80px 0px', threshold: 0.01 })
    area.querySelectorAll('.case-canvas > div').forEach(element => {
      if (element.querySelector('p') && element.getBoundingClientRect().height < 1600) {
        element.classList.add('reveal')
        observer.observe(element)
      }
    })
    const cleanups: (() => void)[] = []
    const hotspots = new Set(area.querySelectorAll<HTMLElement>(isHotel ? '.hotel-task-canvas [data-name]' : '.case-canvas > [data-name], .case-canvas [data-name="系统透明化 After"]'))
    area.querySelectorAll<HTMLElement>('[data-zoom-image]').forEach(element => hotspots.add(element))
    if (!isHotel) {
      const root = area.querySelector<HTMLElement>('.case-canvas')
      const origin = root?.getBoundingClientRect()
      if (origin) {
        const ratio = origin.width / 1680
        area.querySelectorAll<HTMLImageElement>('img[src$=".png"],img[src$=".webp"],img[data-src]').forEach(picture => {
          if (picture.closest('[data-node-id="6:3462"]')) return
          let wrapper = picture.closest<HTMLElement>('[data-node-id]')
          while (wrapper && wrapper !== root) {
            const bounds = wrapper.getBoundingClientRect()
            const top = (bounds.top - origin.top) / ratio
            if (top < 4462 || top >= 16527) break
            if (bounds.width / ratio >= 180 && bounds.height / ratio >= 100 && getComputedStyle(wrapper).pointerEvents !== 'none') {
              hotspots.add(wrapper)
              break
            }
            wrapper = wrapper.parentElement
          }
        })
      }
      hotspots.forEach(element => {
        if (element.dataset.nodeId === '6:3462') hotspots.delete(element)
      })
    }
    hotspots.forEach(element => {
      if (isHotel && ['23:3', '23:11'].includes(element.dataset.nodeId ?? '')) return
      if ([...hotspots].some(other => other !== element && element.contains(other))) return
      const picture = element.querySelector<HTMLImageElement>('img[src$=".png"],img[src$=".webp"],img[data-src]')
      const canvasWidth = area.querySelector('.case-canvas')?.getBoundingClientRect().width ?? 1680
      if (!picture || element.getBoundingClientRect().width / (canvasWidth / 1680) < 180) return
      element.classList.add('image-hotspot')
      element.tabIndex = 0
      element.setAttribute('role', 'button')
      element.setAttribute('aria-label', '放大查看设计图')
      const open = () => setImage(picture.dataset.src || picture.src)
      const keydown = (event: KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open() }
      }
      element.addEventListener('click', open)
      element.addEventListener('keydown', keydown)
      cleanups.push(() => {
        element.removeEventListener('click', open)
        element.removeEventListener('keydown', keydown)
        element.classList.remove('image-hotspot')
        element.removeAttribute('tabindex')
        element.removeAttribute('role')
        element.removeAttribute('aria-label')
      })
    })
    return () => { observer.disconnect(); cleanups.forEach(cleanup => cleanup()) }
  }, [project, compact])

  useEffect(() => {
    const install = (window as Window & { installPortfolioDialog?: (element: HTMLDialogElement) => void }).installPortfolioDialog
    if (dialog.current && install) install(dialog.current)
    if (image) {
      setZoom(false)
      dialog.current?.showModal()
      document.body.classList.add('modal-open')
    } else {
      dialog.current?.close()
      document.body.classList.remove('modal-open')
    }
    return () => document.body.classList.remove('modal-open')
  }, [image])

  function navigate(index: number) {
    const chapter = chapters[index]
    const element = isPromotion && window.innerWidth < 700
      ? document.getElementById(chapter.mobile)
      : canvas.current?.querySelector(`[data-node-id="${chapter.node}"]`)
    if (element) window.scrollTo({ top: Math.max(0, window.scrollY + element.getBoundingClientRect().top - 86), behavior: 'smooth' })
  }

  return (
    <>
      <div className="reading-progress" style={{ transform: `scaleX(${progress})` }} />
      <nav className="project-switch" aria-label="作品切换">
        <a href={homeUrl}>首页</a>
        <a href="#promotion" onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })} aria-current={isPromotion ? 'page' : undefined}>01 / E-booking Promotion</a>
        <a href="#hotel-task" onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })} aria-current={isHotel ? 'page' : undefined}>02 / Hotel Task</a>
        <a href="#hotel-solution" onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })} aria-current={isSolution ? 'page' : undefined}>03 / Hotel Solution</a>
      </nav>
      <main aria-label={isSolution ? '葛珊珊的作品集：Hotel Solution 酒店解决方案' : isHotel ? '葛珊珊的作品集：携程 HT 任务界面升级' : '葛珊珊的作品集：携程促销中心体验升级'}>
        {!(isPromotion && compact) && <div className={isSolution ? 'solution-project' : `desktop-project ${isHotel ? 'hotel-task-project' : ''}`} ref={canvas} style={{ '--canvas-scale': scale } as CSSProperties}>
          {isSolution ? <HotelSolutionBody /> : isHotel ? <HotelTaskBody /> : <PromotionBody />}
        </div>}
        {isPromotion && compact && <MobilePromotionBody onOpenImage={setImage} />}
        <nav className="related-projects" aria-label="浏览其他作品">
          <a className="related-card related-home" href={homeUrl}>
            <span className="related-arrow" aria-hidden="true">↗</span>
            <span className="related-home-title">回到首页</span>
            <span className="related-contacts"><span className="related-contact-line" aria-label="电话：17851310051"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg><span>17851310051</span></span><span className="related-contact-line" aria-label="微信：17851310051"><svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/></svg><span>17851310051</span></span><span className="related-contact-line" aria-label="邮箱：geshande123@gmail.com"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg><span>geshande123@gmail.com</span></span></span>
          </a>
          {projectCards.filter(card => card.id !== project).map(card => (
            <a className="related-card" key={card.id} href={`#${card.id}`}>
              <div className="related-art"><CaseImage src={card.image} alt={`${card.title} ${card.subtitle}`} loading="lazy" /></div>
              <span className="related-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
      </main>
      <nav className="chapter-nav" aria-label="作品章节导航">
        <button className="nav-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="返回顶部">↑</button>
        <div className="chapter-links">
          {chapters.map((chapter, index) => (
            <button key={chapter.name} className={active === index ? 'active' : ''} onClick={() => navigate(index)} aria-current={active === index ? 'location' : undefined}>{chapter.name}</button>
          ))}
        </div>
        <span className="nav-progress">{String(Math.round(progress * 100)).padStart(2, '0')}%</span>
      </nav>
      <dialog ref={dialog} className="image-dialog" onCancel={() => setImage('')} onClick={event => { if (event.target === event.currentTarget) setImage('') }} onClose={() => setImage('')}>
        <div className="dialog-toolbar">
          <span>DESIGN DETAIL / 设计细节</span>
          <button onClick={() => setZoom(!zoom)}>{zoom ? '适应屏幕' : '原尺寸查看'}</button>
          <button onClick={() => setImage('')} aria-label="关闭图片">关闭 ×</button>
        </div>
        <div className={`image-viewer ${zoom ? 'zoomed' : ''}`}>
          {image && <img src={image} alt="携程作品设计细节放大图" />}
        </div>
      </dialog>
    </>
  )
}
