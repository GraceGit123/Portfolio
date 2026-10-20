import { InsightMarquee } from './ProjectPage'

const insightCards = [
  { title: '结构层', items: [
    ['信息架构无分层，分类逻辑不符合用户心智', '分类维度混乱，未与促销实际规则、商户应用场景相对应'],
    ['促销叠加规则及生效逻辑不明', '复杂的促销叠加规则、报名门槛未在页面内展示，商户需跳转详情页才能获取核心信息，理解成本高'],
    ['促销效果不明，缺少决策辅助', '未明确传递活动的核心价值、适配客群、收益点，商户无法快速判断促销是否适配自己的酒店'],
  ] },
  { title: '交互层', items: [
    ['筛选冗余，逻辑不明', '筛选只罗列内容、无明确分类，决策依据缺失，导致商户运营效率低下，参与意愿降低'],
    ['核心操作与促销状态不一，场景混淆', '“报名”与“查看已报名”功能并列展示，未区分参与和管理场景，逻辑混乱，极易造成用户误操作'],
    ['实际用户端场景联系不足', '商户无法理解不同促销在C端场景具体如何展示及对应，使用成本高'],
  ] },
  { title: '视觉层', items: [
    ['色彩体系混乱', '无统一的色彩规范，不同图标使用不同的颜色，导致页面内信息杂乱、主次不明'],
    ['视觉层级扁平，信息读取效率低', '核心信息不明，视觉权重不足，无法形成视觉焦点'],
    ['设计规范老旧', '视觉规范未更新，削弱品牌感与信任感'],
  ] },
]

const solutions = [
  ['系统透明化设计，规则前置', '删除无效筛选/已报名场景分离/展示C端促销信息', 'system-transparency-after.png'],
  ['多维数据的空间映射', '实际促销受多方面影响：房型、日期、用户身份及具体场景等都会影响促销的最终价格，因此无法直观展示一个确切的折扣或价格', '81567.png'],
  ['“阶梯式叠加”与“同层级互斥”的可视化感知', '为达到信息密度与可读性的平衡，于是采用日维度日历形式。日历作为最小信息容器，同时承载时间+房型+规则+数值的多维交叉', 'd4069.png'],
  ['视觉分层表达', '从结构、交互到视觉，让复杂系统更易理解，让关键决策更有把握。', '8b9d5.png'],
  ['有序整理，规范系统', '此项目时，新设计规范尚未形成，因此，项目中梳理了相关组件内容', '91284.png'],
]

export default function MobileProject({ onOpenImage }: { onOpenImage: (image: string) => void }) {
  return <article className="mobile-project">
    <header className="mobile-hero">
      <div className="mobile-masthead"><a href="#background">/ GESHANSHAN</a><span>UX/UI Design</span></div>
      <p className="eyebrow">/ To B</p>
      <h1>携程酒店商户系统<br />E-Booking<br />促销界面升级</h1>
      <button className="mobile-image hero-image" onClick={() => onOpenImage(`${import.meta.env.BASE_URL}assets/e86cf.png`)} aria-label="放大作品展示"><img src={`${import.meta.env.BASE_URL}assets/e86cf.png`} alt="携程酒店商户系统桌面端展示" /></button>
    </header>
    <section id="background" className="mobile-section">
      <p className="eyebrow">/ PROJECT BACKGROUND</p><h2>项目背景</h2>
      <p>携程商户系统Ebooking-促销中心 是携程为酒店商家提供配置促销活动、提升收益的核心场景，随着业务发展，原有页面逐渐暴露出系统性的体验问题。在商户满意度调研中发现，部分商户反馈促销规则不清晰，部分订单促后价格较低。由此，我们发起体验升级项目，旨在提升商户对促销的理解，提高促销产品的易用性及持续性。</p>
    </section>
    <section id="insights" className="mobile-section">
      <p className="eyebrow">/ ISSUE INSIGHTS</p><h2>问题洞察</h2>
      <div className="mobile-insight-cards">{insightCards.map(card => <div key={card.title} className="mobile-insight-card"><h3>{card.title}</h3>{card.items.map(([title, text]) => <div key={title}><h4>{title}</h4><p>{text}</p></div>)}</div>)}</div>
    </section>
    <div className="mobile-marquee"><InsightMarquee /></div>
    <section id="strategy" className="mobile-section">
      <p className="eyebrow">/ DESIGN GOAL</p><h2>设计策略与目标推导</h2>
      <p>让复杂系统更易理解，让关键决策更有把握：从结构、交互到视觉，将六项设计策略转化为清晰的体验目标</p>
      <div className="mobile-goals">{[['重置页面架构，分层分类', '降低认知负荷'], ['系统透明化，规则前置', '降低配置风险'], ['视觉分层表达', '提升信息可读性']].map(([title, goal]) => <div key={title}><h3>{title}</h3><span>↗ {goal}</span></div>)}</div>
    </section>
    <section id="design" className="mobile-section mobile-dark">
      <p className="eyebrow">/ DESIGN SOLUTION</p>
      {solutions.map(([title, text, asset]) => <div className="mobile-solution" key={title}><h2>{title}</h2><p>{text}</p>{title === '系统透明化设计，规则前置' && <><h3>Before</h3><button className="mobile-image mobile-before-image" onClick={() => onOpenImage(`${import.meta.env.BASE_URL}assets/promotion-transparency-before.png`)} aria-label="放大查看：系统透明化 Before"><img loading="lazy" src={`${import.meta.env.BASE_URL}assets/promotion-transparency-before.png`} alt="原促销中心筛选与报名操作" /><span>点击查看设计细节 ↗</span></button><h3>After</h3></>}<button className="mobile-image" onClick={() => onOpenImage(`${import.meta.env.BASE_URL}assets/${asset}`)} aria-label={`放大查看：${title}`}><img loading="lazy" src={`${import.meta.env.BASE_URL}assets/${asset}`} alt={title} /><span>点击查看设计细节 ↗</span></button></div>)}
    </section>
    <section id="workflow" className="mobile-section"><p className="eyebrow">/ AI WORKFLOW</p><h2>经验及方法论</h2><p>将复杂的计算逻辑，抽象为一个可复用、可嵌入、可联动的基础能力，为商户提供统一底座，打造能力复用、经营一体的体验。</p><h2>AI工作流总结</h2><div className="mobile-goals">{['基于调研，洞察驱动', '智能策略，规划探索', '有序整理，规范系统'].map(text => <div key={text}><h3>{text}</h3></div>)}</div></section>
    <section id="results" className="mobile-section"><p className="eyebrow">/ DATA FEEDBACK</p><h2>数据及反馈</h2><p>本项目通过结构性优化，透明化规则信息，简化操作场景，上线季度内显著提升了关于促销的商户满意度，I Quality的平台反馈数量明显下降，部分业务反馈便于查找确认，整体有助于促销模块长期可持续的生态发展</p><div className="mobile-metrics"><div><strong>8.42 → 8.78</strong><span>商户满意度提升</span></div><div><strong>−47.6%</strong><span>反馈数量下降</span></div></div></section>
    <section className="mobile-section"><p className="eyebrow">/ NEXT STEPS</p><h2>后续拓展</h2><p>设置页由于用户习惯，很多操作不敢调整，后续可以细化商户调研或用研，探索更丝滑的操作方式</p><p>当前不同促销的设置内容不同，可探索有无简化的可能</p></section>
  </article>
}
