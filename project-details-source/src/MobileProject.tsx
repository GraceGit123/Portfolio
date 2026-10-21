import { Children, cloneElement, isValidElement, useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, ReactElement, ReactNode } from 'react'
import ProjectPage, { InsightMarquee } from './ProjectPage'
import CaseImage from './CaseImage'

type CaseNode = ReactElement<{ children?: ReactNode; className?: string; style?: CSSProperties; 'data-node-id'?: string }>
function indexCase(node: ReactNode, result = new Map<string, CaseNode>()) {
  Children.forEach(node, child => {
    if (!isValidElement(child)) return
    const element = child as CaseNode
    if (element.props['data-node-id']) result.set(element.props['data-node-id'], element)
    indexCase(element.props.children, result)
  })
  return result
}
function plainText(node: ReactNode): string {
  return Children.toArray(node).map(child => isValidElement(child) ? plainText((child as CaseNode).props.children) : typeof child === 'string' || typeof child === 'number' ? String(child) : '').join(' ').replace(/\s+/g, ' ').trim()
}
function paragraphs(node: ReactNode): string[] {
  const result: string[] = []
  Children.forEach(node, child => {
    if (!isValidElement(child)) return
    const element = child as CaseNode
    if (element.type === 'p' || element.type === 'li') {
      const text = plainText(element.props.children)
      if (text) result.push(text)
    } else result.push(...paragraphs(element.props.children))
  })
  return result
}

function MobileFigure({ node, width = 1520, title }: { node: CaseNode; width?: number; title: string }) {
  const frame = useRef<HTMLDivElement>(null), native = useRef<HTMLDivElement>(null), dialog = useRef<HTMLDialogElement>(null)
  const [size, setSize] = useState({ scale: 0.2, height: 200 })
  const [expanded, setExpanded] = useState(false)
  const illustration = () => cloneElement(node, { style: { ...node.props.style, position: 'relative', left: 0, right: 'auto', top: 0, bottom: 'auto', margin: 0, transform: 'none' } })
  useEffect(() => {
    const measure = () => {
      if (!frame.current || !native.current) return
      const scale = frame.current.clientWidth / width
      setSize({ scale, height: Math.max(native.current.offsetHeight * scale, 40) })
    }
    const observer = new ResizeObserver(measure)
    if (frame.current) observer.observe(frame.current)
    if (native.current) observer.observe(native.current)
    document.fonts.ready.then(measure); measure()
    return () => observer.disconnect()
  }, [width])
  useEffect(() => {
    const element = dialog.current
    if (!element) return
    ;(window as Window & { installPortfolioDialog?: (element: HTMLDialogElement) => void }).installPortfolioDialog?.(element)
    if (expanded) element.showModal()
    else if (element.open) element.close()
  }, [expanded])
  return <figure className="mobile-case-figure"><button className="mobile-figure-trigger" onClick={() => setExpanded(true)} aria-label={`放大查看：${title}`}><div ref={frame} className="mobile-figure-frame" style={{ height: size.height }}><div className="mobile-figure-scale" style={{ width, transform: `scale(${size.scale})` }}><div ref={native} className="case-canvas mobile-native-art" style={{ width }}>{illustration()}</div></div></div><span>点击查看设计细节 ↗</span></button><dialog ref={dialog} className="image-dialog mobile-art-dialog" aria-label={title} onClose={() => setExpanded(false)} onCancel={() => setExpanded(false)} onClick={event => { if (event.target === event.currentTarget) setExpanded(false) }}><div className="dialog-toolbar"><span>{title}</span><button onClick={() => setExpanded(false)} aria-label="关闭设计细节">关闭 ×</button></div>{expanded && <div className="mobile-art-viewer"><div className="case-canvas mobile-native-art" style={{ width }}>{illustration()}</div></div>}</dialog></figure>
}

// Copy and diagrams are selected directly from desktop's canonical React tree.
export default function MobileProject({ onOpenImage }: { onOpenImage: (image: string) => void }) {
  const nodes = useMemo(() => indexCase(ProjectPage()), [])
  const copy = (id: string) => paragraphs(nodes.get(id))
  const text = (id: string) => copy(id).join(' ')
  const Copy = ({ id, title = false }: { id: string; title?: boolean }) => <>{copy(id).map((line, index) => title && index === 0 ? <h3 key={index}>{line}</h3> : <p key={index} data-source-node={id}>{line}</p>)}</>
  const Copies = ({ ids }: { ids: string[] }) => <>{ids.map(id => <Copy key={id} id={id} />)}</>
  const Art = ({ id, width, title }: { id: string; width?: number; title: string }) => { const node = nodes.get(id); return node ? <MobileFigure node={node} width={width} title={title} /> : null }
  const Shot = ({ asset, title }: { asset: string; title: string }) => <button className="mobile-image" onClick={() => onOpenImage(`${import.meta.env.BASE_URL}assets/${asset}`)} aria-label={`放大查看：${title}`}><CaseImage src={`${import.meta.env.BASE_URL}assets/${asset}`} alt={title} /><span>点击查看设计细节 ↗</span></button>
  const insights = copy('6:83')
  return <article className="mobile-project mobile-complete-case">
    <header className="mobile-hero"><div className="mobile-masthead"><span>/ GESHANSHAN</span><span>UX/UI Design</span></div><p className="eyebrow">/ To B</p><h1>携程酒店商户系统<br />E-Booking<br />促销界面升级</h1><Shot asset="e86cf.png" title="携程酒店商户系统桌面端展示" /></header>
    <section id="background" className="mobile-section"><p className="eyebrow">/ PROJECT BACKGROUND</p><h2>项目背景</h2><Copy id="6:80" /><div className="mobile-insight-card"><Copy id="6:3815" /></div></section>
    <section id="insights" className="mobile-section"><p className="eyebrow">/ ISSUE INSIGHTS</p><h2>问题洞察</h2><div className="mobile-insight-cards">{[0, 7, 14].map(start => <div className="mobile-insight-card" key={start}><h3>{insights[start]}</h3>{[1, 3, 5].map(offset => <div key={offset}><h4>{insights[start + offset]}</h4><p>{insights[start + offset + 1]}</p></div>)}</div>)}</div></section>
    <div className="mobile-marquee"><InsightMarquee /></div>
    <section id="strategy" className="mobile-section"><p className="eyebrow">/ DESIGN GOAL</p><h2>设计策略与目标推导</h2><Copy id="6:288" /><div className="mobile-goals">{[['重置页面架构，分层分类', '降低认知负荷'], ['系统透明化设计，直白清晰', '降低配置风险'], ['场景化赋能，提供决策支持', '降低认知负荷'], ['视觉体验升级，品牌塑造', '全系统体验一致'], ['视觉减负，强化引导与层级', '主次分明'], ['全流程统一，一以贯之', '打造统一认知']].map(([title, goal]) => <div key={title}><h3>{title}</h3><span>↗ {goal}</span></div>)}</div><h3>体验目标</h3><p>更易理解 · 更可控的操作 · 更一致的体验</p></section>
    <section id="design" className="mobile-section mobile-dark"><p className="eyebrow">/ DESIGN SOLUTION</p>
      <section className="mobile-solution" data-design-step="1"><h2>01<br />{text('6:417')}</h2><h3>{text('6:422')}</h3><h4>{text('6:425')}</h4><Copy id="6:426" /><h4>{text('6:428')}</h4><Copy id="6:429" /><h3>Before</h3><Copy id="6:436" /><Shot asset="promotion-rules-before.png" title="原促销中心列表与筛选" /><h3>After</h3><Copy id="6:459" /><h3>{text('6:488')}</h3><Copies ids={['6:493', '6:494', '6:501', '6:523']} /><Art id="6:495" title="促销规则信息重构前后对比" /></section>
      <section className="mobile-solution" data-design-step="2"><h2>02<br />{text('6:2593')}</h2><Copies ids={['6:2599', '6:2602', '6:2604', '6:2608', '6:2611', '6:2615', '6:2618']} /><h3>Before</h3><Copy id="6:2625" /><Shot asset="promotion-transparency-before.png" title="系统透明化 Before" /><h3>After</h3><Copy id="6:2654" /><Shot asset="system-transparency-after.png" title="系统透明化 After" /></section>
      <section className="mobile-solution" data-design-step="3"><h2>03<br />{text('6:361')}</h2><Copy id="6:363" /><Copy id="6:370" /><p>房型 · 日期 · 促销折扣 · 用户身份 · 生效规则（互斥 / 叠加）</p><Copy id="6:3501" /><Shot asset="85be4.png" title="促销日历：房型、日期、折扣与生效规则" /><Copy id="6:129" title /><Shot asset="81567.png" title="促销场景与决策链路" /><div className="mobile-goals"><div><Copy id="6:3506" /></div><div><Copy id="6:3531" /></div></div></section>
      <section className="mobile-solution" data-design-step="4"><h2>04<br />视觉体验升级，品牌塑造</h2><Copy id="6:220" title /><h3>字体 / 颜色</h3><Art id="6:236" title="品牌字体与颜色规范" /><h3>统一的组件库</h3><Shot asset="91284.png" title="统一组件库" /><h3>页面布局</h3><Shot asset="8b9d5.png" title="页面栅格与布局规范" /><Copies ids={['6:3801', '6:3806', '6:3809']} /></section>
      <section className="mobile-solution" data-design-step="5"><h2>05<br />视觉减负，强化视觉引导与层级</h2><Copy id="6:203" title /><Shot asset="d4069.png" title="促销列表模块与信息层级" /><Copy id="6:211" title /><Shot asset="f05be.png" title="促销文字层级优化" /><Art id="6:3582" width={880} title="字体层级优化对比" /><Copy id="6:3625" title /><Art id="6:3634" title="视觉降噪与促销图标优化" /></section>
      <section className="mobile-solution" data-design-step="6"><h2>06<br />全流程统一，一以贯之</h2><Copy id="6:227" title /><Shot asset="fc2c4.png" title="促销设置页：规则、模拟效果与C端展示" /></section>
    </section>
    <section id="results" className="mobile-section"><p className="eyebrow">/ DATA FEEDBACK</p><h2>数据及反馈</h2><Copy id="6:3951" /><div className="mobile-metrics"><div><strong>8.42 → 8.78</strong><span>商户满意度提升</span></div><div><strong>−47.6%</strong><span>I Quality促销反馈量下降</span></div></div><blockquote>{text('6:3973')}</blockquote><blockquote>{text('6:3978')}</blockquote></section>
    <section id="workflow" className="mobile-section"><p className="eyebrow">/ EXPERIENCES AND METHODOLOGIES</p><h2>经验及方法论</h2><Copy id="6:3845" /><div className="mobile-insight-cards">{[['6:3851', '6:3854', '24660.png'], ['6:3860', '6:3863', '2b5ea.png'], ['6:3869', '6:3872', '9ba65.png']].map(([title, body, image]) => <div className="mobile-insight-card" key={title}><h3>{text(title)}</h3><Copy id={body} /><Shot asset={image} title={text(title)} /></div>)}</div><h2>AI工作流总结</h2><Copy id="6:3879" /><div className="mobile-insight-cards">{[['6:3887', '6:3892', '6:3896', '6:3900', '6:3941'], ['6:3906', '6:3911', '6:3915', '6:3919', '6:3943'], ['6:3925', '6:3930', '6:3934', '6:3938', '6:3945']].map(([title, ...ids]) => <div className="mobile-insight-card" key={title}><h3>{text(title)}</h3><Copies ids={ids} /></div>)}</div></section>
    <section id="future" className="mobile-section"><p className="eyebrow">/ FUTURE ENHANCEMENTS</p><h2>后续拓展</h2><Copy id="6:3984" /><div className="mobile-insight-cards">{[['6:3991', '6:3996', '6:4000'], ['6:4006', '6:4011', '6:4015', '6:4019'], ['6:4025', '6:4030', '6:4034']].map(([title, ...ids]) => <div className="mobile-insight-card" key={title}><h3>{text(title)}</h3><Copies ids={ids} /></div>)}</div></section>
  </article>
}
