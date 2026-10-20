import CaseImage from './CaseImage'
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const assetPathPrefix = `${import.meta.env.BASE_URL}assets/hotel-solution`;
const DESIGN_WIDTH = 1680;
const DESIGN_HEIGHT = 17303;
const imgImage3371 = `${assetPathPrefix}/hero-user-v2.png`;
const imgImage349 = `${assetPathPrefix}/bdbe8.png`;
const imgImage367 = `${assetPathPrefix}/0fe6c.png`;
const imgImage368 = `${assetPathPrefix}/056da.png`;
const img1 = `${assetPathPrefix}/8b630.png`;
const img2 = `${assetPathPrefix}/f7610.png`;
const img14 = `${assetPathPrefix}/add9e.png`;
const imgGroup3151 = `${assetPathPrefix}/a922f.png`;
const imgImage382 = `${assetPathPrefix}/74357.png`;
const imgImage386 = `${assetPathPrefix}/f5677.png`;
const imgImage387 = `${assetPathPrefix}/fa693.png`;
const imgImage384 = `${assetPathPrefix}/b6131.png`;
const imgGroup3331 = `${assetPathPrefix}/14a44.png`;
const imgImage388 = `${assetPathPrefix}/7d7b5.png`;
const img2221 = `${assetPathPrefix}/3dd79.png`;
const img21 = `${assetPathPrefix}/b7394.png`;
const img = `${assetPathPrefix}/22ddb.png`;
const img3 = `${assetPathPrefix}/28f28.png`;
const imgGroup3351 = `${assetPathPrefix}/03060.png`;
const imgBrandBlue = `${assetPathPrefix}/brand-blue-source.png`;
const imgBrandYellow = `${assetPathPrefix}/brand-yellow-source.png`;
const imgFrame2147236763 = `${assetPathPrefix}/ec588.svg`;
const imgRectangle388 = `${assetPathPrefix}/85eb5.svg`;
const imgRectangle389 = `${assetPathPrefix}/e6bf2.svg`;
const imgEllipse72 = `${assetPathPrefix}/48103.svg`;
const imgVector19 = `${assetPathPrefix}/2f10f.svg`;
const imgFrame2147236739 = `${assetPathPrefix}/524ce.svg`;
const imgImage344 = `${assetPathPrefix}/7818f.svg`;
const imgRectangle420 = `${assetPathPrefix}/4e90b.svg`;
const imgEllipse131 = `${assetPathPrefix}/a3698.svg`;
const imgEllipse132 = `${assetPathPrefix}/9e09f.svg`;
const imgRectangle428 = `${assetPathPrefix}/353f3.svg`;
const imgEllipse201 = `${assetPathPrefix}/5c099.svg`;
const imgEllipse202 = `${assetPathPrefix}/6d81d.svg`;
const imgEllipse121 = `${assetPathPrefix}/2a05f.svg`;
const imgRectangle442 = `${assetPathPrefix}/29d71.svg`;
const imgRectangle443 = `${assetPathPrefix}/e339c.svg`;
const img58 = `${assetPathPrefix}/df7d8.svg`;
const imgRectangle455 = `${assetPathPrefix}/987dc.svg`;
const imgRectangle457 = `${assetPathPrefix}/9e957.svg`;
const imgEllipse205 = `${assetPathPrefix}/1382c.svg`;
const imgEllipse206 = `${assetPathPrefix}/b10b3.svg`;
const imgPolygon7 = `${assetPathPrefix}/3b112.svg`;
const imgRectangle387 = `${assetPathPrefix}/c3093.svg`;
const imgVector174 = `${assetPathPrefix}/f4ed1.svg`;
const imgVector175 = `${assetPathPrefix}/4f729.svg`;
const imgVector176 = `${assetPathPrefix}/7af82.svg`;
const imgVector177 = `${assetPathPrefix}/e4308.svg`;
const imgEllipse208 = `${assetPathPrefix}/brand-circle-source.svg`;
const imgImage381 = `${assetPathPrefix}/76ada.svg`;
const imgImage385 = `${assetPathPrefix}/bab97.svg`;
const imgEllipse219 = `${assetPathPrefix}/7a254.svg`;
const imgGroup326 = `${assetPathPrefix}/f1249.svg`;
const imgGroup327 = `${assetPathPrefix}/a704b.svg`;
const imgGroup328 = `${assetPathPrefix}/01e61.svg`;
const imgGroup329 = `${assetPathPrefix}/753b9.svg`;
const imgRectangle524 = `${assetPathPrefix}/38758.svg`;
const imgFrame2147224634 = `${assetPathPrefix}/8ce7c.svg`;
const flowVideoSrc = `${assetPathPrefix}/flow-original-stream.mp4`;

export default function HotelSolutionProject() {
  const [scale, setScale] = useState(() => Math.min(window.innerWidth / DESIGN_WIDTH, 1));
  const canvasRef = useRef<HTMLDivElement>(null);
  const [flowShift, setFlowShift] = useState(0);
  // Images end at design y=14828; the motion section originally starts at 15060.
  const motionShift = 120 / scale - (15060 - 14828);
  const videoRef = useRef<HTMLVideoElement>(null);


  useEffect(() => {
    const updateScale = () => setScale(Math.min(window.innerWidth / DESIGN_WIDTH, 1));
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let inView = false;
    const syncPlayback = () => {
      if (inView && document.visibilityState === 'visible') void video.play().catch(() => undefined);
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= 0.35;
      syncPlayback();
    }, { threshold: [0, 0.35] });
    observer.observe(video);
    video.addEventListener('canplay', syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);
    video.load();
    return () => {
      observer.disconnect(); video.pause();
      video.removeEventListener('canplay', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const targets = Array.from(canvas.querySelectorAll<HTMLElement>('[data-motion="reveal"]'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const table = canvasRef.current?.querySelector<HTMLElement>('.solution-competitor-wrap');
    if (!table) return;
    // Measure in unscaled design pixels, including the table border.
    const alignFollowingContent = () => {
      setFlowShift(table.offsetTop + table.offsetHeight + 160 - 4490);
    };
    alignFollowingContent();
    const observer = new ResizeObserver(alignFollowingContent);
    observer.observe(table);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden bg-[#202020]"
      style={{ height: (DESIGN_HEIGHT + flowShift + motionShift) * scale }}
    >
      <div
        className="absolute left-1/2 top-0 h-[17303px] w-[1680px] origin-top bg-[#202020]"
        ref={canvasRef}
        style={{ transform: `translateX(-50%) scale(${scale})` }} data-node-id="1:21" data-name="Hotel Solution">
<div className="absolute h-[1186px] left-0 top-0 w-[1680px]" data-node-id="1:22" data-name="image 337 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <CaseImage alt="" className="absolute inset-0 size-full object-cover" loading="eager" fetchPriority="high" src={imgImage3371} />
        </div>
      </div>
<div className="absolute bg-[rgba(255,255,255,0.1)] h-[388px] left-[80px] rounded-[60px] top-[2566px] w-[1520px]" data-node-id="1:27" />
<div data-motion="reveal" className="solution-motion-reveal absolute content-stretch flex flex-col gap-[20px] items-start left-[80px] top-[3114px] w-[1520px]" data-node-id="1:100">
        <div className="[word-break:break-word] flex flex-col font-['MiSans'] font-light justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white tracking-[4.8px] w-full" data-node-id="1:101">
          <p className="leading-[normal]">/ COMPETITIVE ANALYSIS MATRIX</p>
        </div>
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="1:102">
          <div className="content-stretch flex gap-[20px] items-end relative shrink-0 w-full" data-node-id="1:103">
            <p className="[word-break:break-word] font-['MiSans'] font-black leading-[normal] not-italic relative shrink-0 text-[80px] text-white whitespace-nowrap" data-node-id="1:104">
              竞品对比矩阵图
            </p>
            <div className="h-[36px] relative shrink-0 w-[20px]" data-node-id="1:105">
              <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame2147236763} />
            </div>
          </div>
          <p className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[24px] text-white w-[1480px]" data-node-id="1:108">
            以“统一评估维度 × 多个竞品”的矩阵形式，横向对比直接、间接竞品，寻找差异化机会
          </p>
        </div>
      </div>
<div data-motion="reveal" className="solution-motion-reveal absolute content-stretch flex flex-col gap-[20px] items-start left-[80px] top-[1786px] w-[1520px]" data-node-id="1:109">
        <div className="[word-break:break-word] flex flex-col font-['MiSans'] font-light justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white tracking-[4.8px] w-full" data-node-id="1:110">
          <p className="leading-[normal]">{`/ PROJECT BACKGROUND & GOALS`}</p>
        </div>
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="1:111">
          <div className="content-stretch flex gap-[20px] items-end relative shrink-0 w-full" data-node-id="1:112">
            <p className="[word-break:break-word] font-['MiSans'] font-black leading-[normal] not-italic relative shrink-0 text-[80px] text-white whitespace-nowrap" data-node-id="1:113">
              项目背景及目标
            </p>
            <div className="h-[36px] relative shrink-0 w-[20px]" data-node-id="1:114">
              <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame2147236763} />
            </div>
          </div>
          <p className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[24px] text-white w-[1480px]" data-node-id="1:117">
            从0到1构建全球酒店营销枢纽，将“全场景营销”翻译为海外酒店业主可感知的增量价值
          </p>
        </div>
      </div>
<div className="absolute h-[412px] left-[640px] top-[2064px] w-[400px]" data-node-id="1:118">
        <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgRectangle388} />
      </div>
<div className="absolute h-[412px] left-[1160px] top-[2064px] w-[400px]" data-node-id="1:119">
        <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgRectangle389} />
      </div>
<div className="absolute bg-gradient-to-b from-[rgba(32,32,32,0)] h-[160px] left-0 to-[#202020] top-[1026px] w-[1680px]" data-node-id="1:120" />
<div className="absolute left-[1123px] size-[800px] top-[970px]" data-node-id="1:121">
        <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse72} />
      </div>
<div className="-translate-x-1/2 [word-break:break-word] absolute font-['MiSans'] font-black leading-[0] left-[calc(50%+0.5px)] not-italic text-[120px] text-center text-white top-[1146px] tracking-[12px] whitespace-nowrap" data-node-id="1:126">
        <p className="leading-[160px] mb-0 whitespace-pre">{`Hotel Solution `}</p>
        <p className="whitespace-pre">
          <span className="leading-[160px]">酒店营销平台</span>
          <span className="leading-[160px] text-[#ffb400]">0-1</span>
          <span className="leading-[160px]">搭建</span>
        </p>
      </div>
<div className="-translate-x-1/2 absolute content-stretch flex items-center justify-between left-1/2 top-[54px] w-[1572px]" data-node-id="1:127">
        <p className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[20px] text-white whitespace-nowrap" data-node-id="1:128">
          / GESHANSHAN
        </p>
        <p className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[20px] text-white whitespace-nowrap" data-node-id="1:129">{`/ To B `}</p>
        <div className="border border-solid border-white content-stretch flex h-[40px] items-center justify-center px-[16px] py-[7px] relative rounded-[20px] shrink-0" data-node-id="1:130">
          <p className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[20px] text-right text-white whitespace-nowrap" data-node-id="1:131">
            UX/UI Design
          </p>
        </div>
      </div>
<p className="-translate-x-1/2 [word-break:break-word] absolute font-['MiSans'] font-light leading-[40px] left-[840px] not-italic text-[24px] text-center text-white top-[1526px] w-[1480px]" data-node-id="1:132">
        当前，携程酒店部门面向海外酒店业主的营销资源散落在不同平台，主要靠业务人员以离线PPT形式进行讲解。这导致酒店方对我们整体的营销能力感知弱，单次合作沟通成本高，难以形成规模化、一致化、可持续的“平台型”商业叙事。因此，我们急需一个统一的、将携程酒店从“分销渠道”的单一角色，升级为整合全场景营销平台的宣传网站。
      </p>
<div className="solution-competitor-wrap -translate-x-1/2 absolute left-1/2 top-[3392px] w-[1520px]" data-node-id="1:133" data-name="gpt+gemini">
        <table className="solution-competitor-table" aria-label="竞品对比矩阵图">
          <colgroup><col style={{ width: 120 }} />{Array.from({ length: 7 }, (_, index) => <col key={index} style={{ width: 200 }} />)}</colgroup>
          <thead><tr><th scope="col">
            <p className="[word-break:break-word] font-['MiSans'] font-bold leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:136">
              维度
            </p>
          </th><th scope="col">
            <p className="[word-break:break-word] font-['MiSans'] font-bold leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:147">
              Booking.com
            </p>
          </th><th scope="col">
            <p className="[word-break:break-word] font-['MiSans'] font-bold leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:158">
              Expedia
            </p>
          </th><th scope="col">
            <p className="[word-break:break-word] font-['MiSans'] font-bold leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:169">
              Agoda
            </p>
          </th><th scope="col">
            <p className="[word-break:break-word] font-['MiSans'] font-bold leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:180">
              携程纵横
            </p>
          </th><th scope="col">
            <p className="[word-break:break-word] font-['MiSans'] font-bold leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:191">
              Koddi
            </p>
          </th><th scope="col">
            <p className="[word-break:break-word] font-['MiSans'] font-bold leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:202">
              Adsterra
            </p>
          </th><th scope="col">
            <p className="[word-break:break-word] font-['MiSans'] font-bold leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:213">
              机会点
            </p>
          </th></tr></thead><tbody><tr><th scope="row">
            <p className="[word-break:break-word] font-['MiSans'] font-bold leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:138">
              品牌定位与核心卖点
            </p>
          </th><td>
            <div className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:149">
              <p className="leading-[24px] mb-0">全球酒店营销头部平台，强调“效果+信任”；</p>
              <p className="leading-[24px]">直效转化+优先曝光（效果思维）</p>
            </div>
          </td><td>
            <div className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:160">
              <p className="leading-[24px] mb-0">全球旅游生态与多品牌分发，强调“技术+合作+潜力”；</p>
              <p className="leading-[24px]">生态信任+全球化资源（巨头思维）</p>
            </div>
          </td><td>
            <div className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:171">
              <p className="leading-[24px] mb-0">亚太区域旅游平台，聚焦“跨境营销+多渠道触达”；</p>
              <p className="leading-[24px]">成长协助+新闻资讯（伙伴思维）</p>
            </div>
          </td><td>
            <div className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:182">
              <p className="leading-[24px] mb-0">技术驱动型 B2B 平台，强调“全球触达+大数据”；</p>
              <p className="leading-[24px]">大数据+AI（技术思维）</p>
            </div>
          </td><td>
            <div className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:193">
              <p className="leading-[24px] mb-0">企业级 Ad-Tech 与商务媒体平台，技术驱动的服务体验与合作共赢；</p>
              <p className="leading-[24px]">AI+平台能力（技术共赢思维）</p>
            </div>
          </td><td>
            <div className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:204">
              <p className="leading-[24px] mb-0">全球广告网络，主打“高覆盖+高转化”广告解决方案；</p>
              <p className="leading-[24px]">低成本+高覆盖（利益思维）</p>
            </div>
          </td><td>
            <div className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:215">
              <p className="leading-[24px] mb-0">主打全链路一站式广告解决方案；</p>
              <p className="leading-[24px]">突出高覆盖+能力服务+合作案例（优势→能力）</p>
            </div>
          </td></tr><tr><th scope="row">
            <p className="[word-break:break-word] font-['MiSans'] font-bold leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:140">
              叙事逻辑
            </p>
          </th><td>
            <div className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:151">
              <p className="leading-[24px] mb-0">【广告功能结果视角】</p>
              <p className="leading-[24px]">功能直入 ➔ 真实展示位说明 ➔ 矩阵协同 ➔ 核心转化数据 ➔ 权威背书 ➔ FAQ</p>
            </div>
          </td><td>
            <div className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:162">
              <p className="leading-[24px] mb-0">【旅游平台生态视角】</p>
              <p className="leading-[24px]">全球生态规模 ➔ 旗下品牌协同 ➔ 灵活技术方案 ➔ 合作案例与视频 ➔ 深度观点</p>
            </div>
          </td><td>
            <div className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:173">
              <p className="leading-[24px] mb-0">【投放合作视角】</p>
              <p className="leading-[24px]">IP形象引入 ➔ 核心价值点 ➔ 触达方案展示 ➔ 密集案例与博客文章矩阵</p>
            </div>
          </td><td>
            <div className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:184">
              <p className="leading-[24px] mb-0">【广告工具产品视角】</p>
              <p className="leading-[24px]">流量规模概览 ➔ 三大服务版块 ➔ 核心技术优势（大数据/AI） ➔ 标杆案例</p>
            </div>
          </td><td>
            <div className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:195">
              <p className="leading-[24px] mb-0">【广告技术中台视角】</p>
              <p className="leading-[24px]">赋能技术架构 ➔ 行业研究 ➔ 平台能力 ➔ 服务支撑 ➔ 客户声誉 ➔ 表单留资</p>
            </div>
          </td><td>
            <div className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:206">
              <p className="leading-[24px] mb-0">【流量变现视角】</p>
              <p className="leading-[24px]">强转化痛点 ➔ 核心优势 ➔ 广告样式大图呈现 ➔ 专家支持（微信二维码） ➔ FAQ</p>
            </div>
          </td><td>
            <p className="[word-break:break-word] font-['MiSans'] font-light leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:217">
              “亚太/全球高价值客源红利 + 智能精准的产品能力”双核叙事
            </p>
          </td></tr><tr><th scope="row">
            <p className="[word-break:break-word] font-['MiSans'] font-bold leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:142">
              信任体系
            </p>
          </th><td>
            <p className="[word-break:break-word] font-['MiSans'] font-light leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:153">
              万豪（Marriott）、美利亚（Meliá）等顶级酒店集团 Logo
            </p>
          </td><td>
            <p className="[word-break:break-word] font-['MiSans'] font-light leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:164">
              1.25B+曝光等巨量数据、多品牌矩阵、高管推荐案例
            </p>
          </td><td>
            <p className="[word-break:break-word] font-['MiSans'] font-light leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:175">
              英国旅游局、雷迪森等案例卡片、LinkedIn 官方链接
            </p>
          </td><td>
            <p className="[word-break:break-word] font-['MiSans'] font-light leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:186">
              30亿全球游客数据、迪拜旅游局（Dubai Tourism）标杆案例
            </p>
          </td><td>
            <p className="[word-break:break-word] font-['MiSans'] font-light leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:197">
              行业巨头 Logo（GoPuff, Booking等）、NPS 77分认证
            </p>
          </td><td>
            <p className="[word-break:break-word] font-['MiSans'] font-light leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:208">
              240+覆盖国家、300亿日曝光数据、客户成功故事（含收益数额）
            </p>
          </td><td>
            <p className="[word-break:break-word] font-['MiSans'] font-light leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:219">
              平台数据矩阵+ 销售渠道 + 国际酒店成功案例
            </p>
          </td></tr><tr><th scope="row">
            <p className="[word-break:break-word] font-['MiSans'] font-bold leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:144">
              视觉语言
            </p>
          </th><td>
            <div className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:155">
              <p className="leading-[24px] mb-0">传统 OTA 极简商务风，稳重保守，使用与B端一致的插图风格</p>
              <p className="leading-[24px] mb-0">主色调：蓝、白</p>
              <p className="leading-[24px]">风格：简洁有力，清晰分块，数据突出</p>
            </div>
          </td><td>
            <div className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:166">
              <p className="leading-[24px] mb-0">度假旅行风，实景摄影，亲和力强，适配旅游行业</p>
              <p className="leading-[24px] mb-0">主色调：蓝、白、紫</p>
              <p className="leading-[24px]">风格：专业大气，区块分明，高清旅行场景图片</p>
            </div>
          </td><td>
            <div className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:177">
              <p className="leading-[24px] mb-0">年轻化亲和风格，卡通 IP 弱化面向大型集团的专业感</p>
              <p className="leading-[24px] mb-0">主色调：蓝、白</p>
              <p className="leading-[24px]">风格：活泼清晰，图标色彩丰富</p>
            </div>
          </td><td>
            <div className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:188">
              <p className="leading-[24px] mb-0">国内互联网轻量化科技风格，海外高端商务质感不足</p>
              <p className="leading-[24px] mb-0">主色调：蓝、白</p>
              <p className="leading-[24px]">风格：国际化商务风，图片生动（旅行者）</p>
            </div>
          </td><td>
            <div className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:199">
              <p className="leading-[24px] mb-0">成熟轻奢国际化 SaaS 风格，暗黑高端科技质感</p>
              <p className="leading-[24px] mb-0">主色调：黑、白、浅绿、浅紫</p>
              <p className="leading-[24px]">风格：简约科技风，抽象科技感图形</p>
            </div>
          </td><td>
            <div className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:210">
              <p className="leading-[24px] mb-0">强营销流量平台风格，高饱和色块，商务属性</p>
              <p className="leading-[24px] mb-0">主色调：红、白</p>
              <p className="leading-[24px]">风格：活力醒目，数据图表化</p>
            </div>
          </td><td>
            <p className="[word-break:break-word] font-['MiSans'] font-light leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:221">
              国际化轻量科技感：符合携程品牌色系，平衡集团品牌识别与国际化高端旅游氛围，突出智性、清透与温暖感
            </p>
          </td></tr></tbody></table></div>
<div className="absolute content-stretch flex flex-col gap-[60px] items-start left-[680px] top-[2124px] w-[320px]" data-node-id="1:222">
        <p className="[word-break:break-word] font-['MiSans'] font-bold leading-[normal] not-italic relative shrink-0 text-[40px] text-white w-full" data-node-id="1:223">
          设计侧
        </p>
        <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-node-id="1:224">
          <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-node-id="1:225">
            <div className="h-[32px] relative shrink-0 w-[8px]" data-node-id="1:226">
              <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame2147236739} />
            </div>
            <p className="[word-break:break-word] font-['MiSans'] font-light leading-[32px] not-italic relative shrink-0 text-[24px] text-white w-[304px]" data-node-id="1:228">
              全链路体验缺失，用户认知不足
            </p>
          </div>
          <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-node-id="1:229">
            <div className="h-[32px] relative shrink-0 w-[8px]" data-node-id="1:230">
              <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame2147236739} />
            </div>
            <p className="[word-break:break-word] font-['MiSans'] font-light leading-[32px] not-italic relative shrink-0 text-[24px] text-white w-[304px]" data-node-id="1:232">
              从0-1的信息框架构建，无系统的营销体系
            </p>
          </div>
        </div>
      </div>
<div className="absolute content-stretch flex flex-col gap-[60px] items-start left-[1200px] top-[2124px] w-[320px]" data-node-id="1:233">
        <p className="[word-break:break-word] font-['MiSans'] font-bold leading-[normal] not-italic relative shrink-0 text-[40px] text-white w-full" data-node-id="1:234">
          商家侧
        </p>
        <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-node-id="1:235">
          <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-node-id="1:236">
            <div className="h-[32px] relative shrink-0 w-[8px]" data-node-id="1:237">
              <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame2147236739} />
            </div>
            <p className="[word-break:break-word] font-['MiSans'] font-light leading-[32px] not-italic relative shrink-0 text-[24px] text-white w-[304px]" data-node-id="1:239">
              决策信息成本高，全域价值感知模糊
            </p>
          </div>
          <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-node-id="1:240">
            <div className="h-[32px] relative shrink-0 w-[8px]" data-node-id="1:241">
              <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame2147236739} />
            </div>
            <p className="[word-break:break-word] font-['MiSans'] font-light leading-[32px] not-italic relative shrink-0 text-[24px] text-white w-[304px]" data-node-id="1:243">
              PPT形式信任背书薄弱，专业感知不足
            </p>
          </div>
        </div>
      </div>
<div className="absolute content-stretch flex flex-col items-start left-[120px] p-[40px] rounded-[40px] top-[2626px] w-[400px]" data-node-id="1:402" style={{ backgroundImage: "linear-gradient(106.11692312290992deg, rgb(73, 117, 253) 0%, rgb(161, 184, 255) 100%)" }}>
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[320px]" data-node-id="1:403">
          <div className="bg-[#202020] content-stretch flex h-[68px] items-center justify-center px-[112px] py-[18px] relative rounded-[50px] shrink-0 w-full" data-node-id="1:404">
            <p className="[word-break:break-word] font-['MiSans'] font-medium leading-[32px] not-italic relative shrink-0 text-[24px] text-white whitespace-nowrap" data-node-id="1:405">
              整合资源
            </p>
          </div>
          <p className="[word-break:break-word] font-['MiSans'] font-light leading-[32px] not-italic relative shrink-0 text-[24px] text-black w-full" data-node-id="1:406">
            整合资源，重塑平台叙事内容，强化集团价值，便于点对点讲解
          </p>
        </div>
      </div>
<div className="absolute content-stretch flex flex-col items-start left-[640px] p-[40px] rounded-[40px] top-[2626px] w-[400px]" data-node-id="1:407" style={{ backgroundImage: "linear-gradient(106.11692312290994deg, rgb(255, 188, 26) 0%, rgb(255, 228, 163) 100%)" }}>
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[320px]" data-node-id="1:408">
          <div className="bg-[#202020] content-stretch flex h-[68px] items-center justify-center px-[112px] py-[18px] relative rounded-[50px] shrink-0 w-full" data-node-id="1:409">
            <p className="[word-break:break-word] font-['MiSans'] font-medium leading-[32px] not-italic relative shrink-0 text-[24px] text-white whitespace-nowrap" data-node-id="1:410">
              重塑叙事
            </p>
          </div>
          <p className="[word-break:break-word] font-['MiSans'] font-light leading-[32px] not-italic relative shrink-0 text-[24px] text-black w-full" data-node-id="1:411">
            打造可信赖的专业体验，构建「全球营销枢纽解决方案」的叙事逻辑
          </p>
        </div>
      </div>
<div className="absolute content-stretch flex flex-col items-start left-[1160px] p-[40px] rounded-[60px] top-[2626px] w-[400px]" data-node-id="1:412" style={{ backgroundImage: "linear-gradient(124.51402970892221deg, rgb(215, 255, 66) 0%, rgb(255, 246, 225) 100%)" }}>
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[320px]" data-node-id="1:413">
          <div className="bg-[#202020] content-stretch flex h-[68px] items-center justify-center px-[112px] py-[18px] relative rounded-[50px] shrink-0 w-full" data-node-id="1:414">
            <p className="[word-break:break-word] font-['MiSans'] font-medium leading-[32px] not-italic relative shrink-0 text-[24px] text-white whitespace-nowrap" data-node-id="1:415">
              建立信任
            </p>
          </div>
          <p className="[word-break:break-word] font-['MiSans'] font-light leading-[32px] not-italic relative shrink-0 text-[24px] text-black w-full" data-node-id="1:416">
            消除认知差，降低焦虑感，建立增量信任，完成“好奇”到“信任”的心理转变
          </p>
        </div>
      </div>
<div className="absolute h-[412px] left-[120px] top-[2064px] w-[400px]" data-node-id="1:417">
        <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgRectangle387} />
      </div>
<div className="absolute content-stretch flex flex-col gap-[60px] items-start left-[160px] top-[2124px] w-[320px]" data-node-id="1:418">
        <p className="[word-break:break-word] font-['MiSans'] font-bold leading-[normal] not-italic relative shrink-0 text-[40px] text-white w-full" data-node-id="1:419">
          业务侧
        </p>
        <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-node-id="1:420">
          <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-node-id="1:421">
            <div className="h-[32px] relative shrink-0 w-[8px]" data-node-id="1:422">
              <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame2147236739} />
            </div>
            <p className="[word-break:break-word] font-['MiSans'] font-light leading-[32px] not-italic relative shrink-0 text-[24px] text-white w-[304px]" data-node-id="1:424">
              全球拓展缺少标准化载体，复用性差
            </p>
          </div>
          <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-node-id="1:425">
            <div className="h-[32px] relative shrink-0 w-[8px]" data-node-id="1:426">
              <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame2147236739} />
            </div>
            <p className="[word-break:break-word] font-['MiSans'] font-light leading-[32px] not-italic relative shrink-0 text-[24px] text-white w-[304px]" data-node-id="1:428">
              对外宣传口径不统一，品牌形象零散
            </p>
          </div>
        </div>
      </div>
<div className="solution-following-content absolute left-0 top-0 w-[1680px] h-[17303px]" style={{ transform: `translateY(${flowShift}px)` }}>
<div className="absolute bg-[rgba(255,255,255,0.1)] h-[796px] left-[80px] rounded-[60px] top-[14032px] w-[1520px]" data-node-id="1:23" />
<div className="absolute bg-[rgba(255,255,255,0.1)] h-[800px] left-[80px] rounded-[60px] top-[11737px] w-[1520px]" data-node-id="1:24" />
<div className="absolute bg-[rgba(255,255,255,0.1)] h-[862px] left-[80px] rounded-[60px] top-[12833px] w-[720px]" data-node-id="1:25" />
<div className="absolute bg-[rgba(255,255,255,0.1)] h-[862px] left-[880px] rounded-[60px] top-[12833px] w-[720px]" data-node-id="1:26" />
<div className="-translate-x-1/2 absolute bg-white h-[420px] left-1/2 rounded-[40px] top-[10659px] w-[1520px]" data-node-id="1:28" />
<div data-motion="reveal" className="solution-motion-reveal absolute content-stretch flex flex-col gap-[20px] items-start left-[80px] top-[4490px] w-[1520px]" data-node-id="1:29">
        <div className="[word-break:break-word] flex flex-col font-['MiSans'] font-light justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white tracking-[4.8px] w-full" data-node-id="1:30">
          <p className="leading-[normal]">/ DESIGN OPPORTUNITIES</p>
        </div>
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="1:31">
          <div className="content-stretch flex gap-[20px] items-end relative shrink-0 w-full" data-node-id="1:32">
            <p className="[word-break:break-word] font-['MiSans'] font-black leading-[normal] not-italic relative shrink-0 text-[80px] text-white whitespace-nowrap" data-node-id="1:33">
              设计机会点
            </p>
            <div className="h-[36px] relative shrink-0 w-[20px]" data-node-id="1:34">
              <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame2147236763} />
            </div>
          </div>
          <p className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[24px] text-white w-[1480px]" data-node-id="1:37">
            依托Trip.com品牌原生基因，打造兼具人文温度与专业感的 B 端视觉体验
          </p>
        </div>
      </div>
<div data-motion="reveal" className="solution-motion-reveal absolute content-stretch flex flex-col gap-[20px] items-start left-[80px] top-[5960px] w-[1520px]" data-node-id="1:38">
        <div className="[word-break:break-word] flex flex-col font-['MiSans'] font-light justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white tracking-[4.8px] w-full" data-node-id="1:39">
          <p className="leading-[normal]">/ NARRATIVE FLOW</p>
        </div>
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="1:40">
          <div className="content-stretch flex gap-[20px] items-end relative shrink-0 w-full" data-node-id="1:41">
            <p className="[word-break:break-word] font-['MiSans'] font-black leading-[normal] not-italic relative shrink-0 text-[80px] text-white whitespace-nowrap" data-node-id="1:42">
              叙事逻辑
            </p>
            <div className="h-[36px] relative shrink-0 w-[20px]" data-node-id="1:43">
              <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame2147236763} />
            </div>
          </div>
          <p className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[24px] text-white w-[1480px]" data-node-id="1:46">
            以酒店集团业务增长为核心叙事主线，层层递进，将全域营销能力转化为可感知的经营价值，形成完整的 B 端商业说服闭环
          </p>
        </div>
      </div>
<div data-motion="reveal" className="solution-motion-reveal absolute content-stretch flex flex-col gap-[20px] items-start left-[80px] top-[7361px] w-[1520px]" data-node-id="1:47">
        <div className="[word-break:break-word] flex flex-col font-['MiSans'] font-light justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white tracking-[4.8px] w-full" data-node-id="1:48">
          <p className="leading-[normal]">/ MOOD BOARD</p>
        </div>
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="1:49">
          <div className="content-stretch flex gap-[20px] items-end relative shrink-0 w-full" data-node-id="1:50">
            <p className="[word-break:break-word] font-['MiSans'] font-black leading-[normal] not-italic relative shrink-0 text-[80px] text-white whitespace-nowrap" data-node-id="1:51">
              情绪板
            </p>
            <div className="h-[36px] relative shrink-0 w-[20px]" data-node-id="1:52">
              <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame2147236763} />
            </div>
          </div>
          <p className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[24px] text-white w-[1480px]" data-node-id="1:55">
            确立整体视觉调性，为全页面视觉设计提供统一的风格指引与审美基准
          </p>
        </div>
      </div>
<div data-motion="reveal" className="solution-motion-reveal absolute content-stretch flex flex-col gap-[20px] items-start left-[80px] top-[8599px] w-[1520px]" data-node-id="1:56">
        <div className="[word-break:break-word] flex flex-col font-['MiSans'] font-light justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white tracking-[4.8px] w-full" data-node-id="1:57">
          <p className="leading-[normal]">/ COLOR SYSTEM</p>
        </div>
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="1:58">
          <div className="content-stretch flex gap-[20px] items-end relative shrink-0 w-full" data-node-id="1:59">
            <p className="[word-break:break-word] font-['MiSans'] font-black leading-[normal] not-italic relative shrink-0 text-[80px] text-white whitespace-nowrap" data-node-id="1:60">
              颜色规范
            </p>
            <div className="h-[36px] relative shrink-0 w-[20px]" data-node-id="1:61">
              <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame2147236763} />
            </div>
          </div>
          <p className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[24px] text-white w-[1480px]" data-node-id="1:64">
            以携程品牌蓝为核心主色，与E Booking色系保持一致，给商户统一的感知效果
          </p>
        </div>
      </div>
<div data-motion="reveal" className="solution-motion-reveal absolute content-stretch flex flex-col gap-[20px] items-start left-[80px] top-[9597px] w-[1520px]" data-node-id="1:65">
        <div className="[word-break:break-word] flex flex-col font-['MiSans'] font-light justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white tracking-[4.8px] w-full" data-node-id="1:66">
          <p className="leading-[normal]">/ GRAPHICS DESIGN</p>
        </div>
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="1:67">
          <div className="content-stretch flex gap-[20px] items-end relative shrink-0 w-full" data-node-id="1:68">
            <p className="[word-break:break-word] font-['MiSans'] font-black leading-[normal] not-italic relative shrink-0 text-[80px] text-white whitespace-nowrap" data-node-id="1:69">
              图形
            </p>
            <div className="h-[36px] relative shrink-0 w-[20px]" data-node-id="1:70">
              <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame2147236763} />
            </div>
          </div>
          <p className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[24px] text-white w-[1480px]" data-node-id="1:73">
            依托Trip.com品牌原生基因，延续品牌价值感知
          </p>
        </div>
      </div>
<div className="absolute bg-[#3264ff] left-[110px] rounded-[60px] size-[420px] top-[8917px]" data-node-id="1:74" />
<div className="absolute solution-brand-outline h-[120px] left-[80px] rounded-[40px] top-[11159px] w-[460px]" data-node-id="1:75" />
<div className="-translate-x-1/2 absolute solution-brand-outline h-[120px] left-1/2 rounded-[40px] top-[11159px] w-[460px]" data-node-id="1:76" />
<div className="absolute solution-brand-outline h-[120px] left-[1140px] rounded-[40px] top-[11159px] w-[460px]" data-node-id="1:77" />
<div className="absolute bg-[#ffb400] left-[630px] rounded-[60px] size-[420px] top-[8917px]" data-node-id="1:78" />
<div className="absolute bg-[#0ea161] h-[120px] left-[1150px] rounded-[40px] top-[8917px] w-[420px]" data-node-id="1:79" />
<div className="absolute bg-[#eb6a01] h-[120px] left-[1150px] rounded-[40px] top-[9062px] w-[420px]" data-node-id="1:80" />
<div className="absolute bg-[#e31002] h-[120px] left-[1150px] rounded-[40px] top-[9217px] w-[420px]" data-node-id="1:81" />
<div data-motion="reveal" className="solution-motion-reveal absolute content-stretch flex flex-col gap-[20px] items-start left-[80px] top-[11459px] w-[1520px]" data-node-id="1:82">
        <div className="[word-break:break-word] flex flex-col font-['MiSans'] font-light justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white tracking-[4.8px] w-full" data-node-id="1:83">
          <p className="leading-[normal]">{`/ LAYOUT & DESIGN`}</p>
        </div>
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="1:84">
          <div className="content-stretch flex gap-[20px] items-end relative shrink-0 w-full" data-node-id="1:85">
            <p className="[word-break:break-word] font-['MiSans'] font-black leading-[normal] not-italic relative shrink-0 text-[80px] text-white whitespace-nowrap" data-node-id="1:86">
              布局与设计
            </p>
            <div className="h-[36px] relative shrink-0 w-[20px]" data-node-id="1:87">
              <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame2147236763} />
            </div>
          </div>
          <p className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[24px] text-white w-[1480px]" data-node-id="1:90">
            匹配 B 端决策心智的线性叙事，形成完整的信任闭环
          </p>
        </div>
      </div>
<div data-motion="reveal" className="solution-motion-reveal absolute content-stretch flex flex-col gap-[20px] items-start left-[80px] top-[16195px] w-[1520px]" style={{ marginTop: motionShift }} data-node-id="1:91">
        <div className="[word-break:break-word] flex flex-col font-['MiSans'] font-light justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white tracking-[4.8px] w-full" data-node-id="1:92">
          <p className="leading-[normal]">/ AI WORKFLOW</p>
        </div>
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="1:93">
          <div className="content-stretch flex gap-[20px] items-end relative shrink-0 w-full" data-node-id="1:94">
            <p className="[word-break:break-word] font-['MiSans'] font-black leading-[normal] not-italic relative shrink-0 text-[80px] text-white whitespace-nowrap" data-node-id="1:95">
              AI工作流
            </p>
            <div className="h-[36px] relative shrink-0 w-[20px]" data-node-id="1:96">
              <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame2147236763} />
            </div>
          </div>
          <p className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[24px] text-white w-[1480px]" data-node-id="1:99">
            匹配 B 端决策心智的线性叙事，形成完整的信任闭环
          </p>
        </div>
      </div>
<div className="absolute h-[89px] left-[341px] top-[4567px] w-0" data-node-id="1:123">
        <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector19} />
      </div>
<div className="absolute h-[89px] left-[914px] top-[4567px] w-0" data-node-id="1:124">
        <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector19} />
      </div>
<div className="absolute h-[89px] left-[1503px] top-[4567px] w-0" data-node-id="1:125">
        <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector19} />
      </div>
<div className="absolute content-stretch flex flex-col h-[500px] items-start left-[80px] pb-[104px] pt-[80px] px-[60px] rounded-[60px] top-[4768px] w-[744px]" data-node-id="1:244" style={{ backgroundImage: "linear-gradient(124.43262991287617deg, rgb(50, 100, 255) 0%, rgb(86, 222, 255) 100%)" }}>
        <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0 w-[624px]" data-node-id="1:245">
          <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[200px]" data-node-id="1:246">
            <div className="bg-white content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[16px] shrink-0" data-node-id="1:247">
              <p className="[word-break:break-word] font-['MiSans'] font-[650] leading-[32px] not-italic relative shrink-0 text-[#3264ff] text-[20px] whitespace-nowrap" data-node-id="1:248">
                定位方向
              </p>
            </div>
            <p className="[word-break:break-word] font-['MiSans'] font-black leading-[normal] min-w-full not-italic relative shrink-0 text-[40px] text-white w-[min-content]" data-node-id="1:249">
              差异化赛道
            </p>
          </div>
          <p className="[word-break:break-word] font-['MiSans'] font-light leading-[40px] min-w-full not-italic relative shrink-0 text-[24px] text-white w-[min-content]" data-node-id="1:250">
            避开竞品单纯讲广告投放、流量曝光的同质化，定位为面向海外酒店集团的全链路一站式广告解决方案，突出独有优势：中国境内+海外流量、线上+线下、站内+站外全域营销能力
          </p>
        </div>
      </div>
<div className="absolute content-stretch flex flex-col h-[500px] items-start left-[856px] pb-[104px] pt-[80px] px-[60px] rounded-[60px] top-[4768px] w-[744px]" data-node-id="1:251" style={{ backgroundImage: "linear-gradient(124.43262991287617deg, rgb(215, 255, 66) 0%, rgb(255, 246, 225) 100%)" }}>
        <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0 w-[624px]" data-node-id="1:252">
          <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[160px]" data-node-id="1:253">
            <div className="bg-[#202020] content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[16px] shrink-0" data-node-id="1:254">
              <p className="[word-break:break-word] font-['MiSans'] font-[650] leading-[32px] not-italic relative shrink-0 text-[20px] text-white whitespace-nowrap" data-node-id="1:255">
                叙事逻辑
              </p>
            </div>
            <p className="[word-break:break-word] font-['MiSans'] font-black leading-[normal] min-w-full not-italic relative shrink-0 text-[#202020] text-[40px] w-[min-content]" data-node-id="1:256">
              构建信任
            </p>
          </div>
          <p className="[word-break:break-word] font-['MiSans'] font-light leading-[40px] min-w-full not-italic relative shrink-0 text-[#202020] text-[24px] w-[min-content]" data-node-id="1:257">
            运用“亚太/全球高价值客源红利 + 智能精准的产品能力”双核叙事，构建“数据信任 → 生态壁垒 → 落地赋能”的递进式心智模型，搭建多层信任背书体系，用数据、渠道矩阵、真实商业案例建立说服力
          </p>
        </div>
      </div>
<div className="absolute content-stretch flex flex-col h-[500px] items-start left-[80px] pb-[136px] pt-[80px] px-[60px] rounded-[60px] top-[5300px] w-[744px]" data-node-id="1:258" style={{ backgroundImage: "linear-gradient(124.43262991287617deg, rgb(255, 233, 145) 0%, rgb(255, 251, 242) 100%)" }}>
        <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0 w-[624px]" data-node-id="1:259">
          <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[160px]" data-node-id="1:260">
            <div className="bg-[#202020] content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[16px] shrink-0" data-node-id="1:261">
              <p className="[word-break:break-word] font-['MiSans'] font-[650] leading-[32px] not-italic relative shrink-0 text-[20px] text-white whitespace-nowrap" data-node-id="1:262">
                信任体系
              </p>
            </div>
            <p className="[word-break:break-word] font-['MiSans'] font-black leading-[normal] min-w-full not-italic relative shrink-0 text-[#202020] text-[40px] w-[min-content]" data-node-id="1:263">
              数据证实
            </p>
          </div>
          <p className="[word-break:break-word] font-['MiSans'] font-light leading-[40px] min-w-full not-italic relative shrink-0 text-[#202020] text-[24px] w-[min-content]" data-node-id="1:264">
            通过“数据矩阵+ 销售渠道 + 国际酒店成功案例”逐步递进，强化结果导向的闭环转化能力，让商户通过真实案例快速理解合作收益，逐步降低疑虑增强信任
          </p>
        </div>
      </div>
<div className="absolute content-stretch flex flex-col h-[500px] items-start left-[856px] pb-[168px] pt-[80px] px-[60px] rounded-[60px] top-[5300px] w-[744px]" data-node-id="1:265" style={{ backgroundImage: "linear-gradient(124.43262991287617deg, rgb(50, 100, 255) 0%, rgb(148, 123, 247) 100%)" }}>
        <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0 w-[624px]" data-node-id="1:266">
          <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[160px]" data-node-id="1:267">
            <div className="bg-white content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[16px] shrink-0" data-node-id="1:268">
              <p className="[word-break:break-word] font-['MiSans'] font-[650] leading-[32px] not-italic relative shrink-0 text-[#3264ff] text-[20px] whitespace-nowrap" data-node-id="1:269">
                视觉方向
              </p>
            </div>
            <p className="[word-break:break-word] font-['MiSans'] font-black leading-[normal] min-w-full not-italic relative shrink-0 text-[40px] text-white w-[min-content]" data-node-id="1:270">
              人文温度
            </p>
          </div>
          <p className="[word-break:break-word] font-['MiSans'] font-light leading-[40px] min-w-full not-italic relative shrink-0 text-[24px] text-white w-[min-content]" data-node-id="1:271">
            融合携程品牌基因，综合国际化风格，结合酒店旅行实景，配合人文温度情感化，打造携程专属 B 端视觉语言
          </p>
        </div>
      </div>
<div className="absolute bg-[rgba(255,255,255,0.1)] h-[963px] left-[80px] rounded-[60px] top-[6238px] w-[1520px]" data-node-id="1:272" />
<div className="absolute content-stretch flex flex-col gap-[60px] items-start left-[160px] top-[6338px] w-[1360px]" data-node-id="1:273">
        <div className="content-stretch flex gap-[80px] items-center relative shrink-0 w-full" data-node-id="1:274">
          <div className="content-stretch flex flex-col gap-[28px] items-start relative shrink-0 w-[320px]" data-node-id="1:275">
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-node-id="1:276">
              <div className="border border-solid border-white content-stretch flex flex-col items-center justify-center px-[14px] py-[9px] relative rounded-[30px] shrink-0 size-[40px]" data-node-id="1:277">
                <p className="[word-break:break-word] font-['MiSans'] font-bold leading-[normal] not-italic relative shrink-0 text-[20px] text-center text-white whitespace-nowrap" data-node-id="1:278">
                  01
                </p>
              </div>
              <p className="[word-break:break-word] bg-clip-text bg-gradient-to-r font-['MiSans'] font-bold from-white leading-[40px] not-italic relative shrink-0 text-[32px] text-[transparent] to-[#8eaaff] whitespace-nowrap" data-node-id="1:279">{`定位愿景 `}</p>
            </div>
            <p className="[word-break:break-word] font-['MiSans'] font-light leading-[28px] not-italic relative shrink-0 text-[20px] text-white w-full" data-node-id="1:280">
              建立第一印象与体量信任
            </p>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-start not-italic relative shrink-0 text-white w-[960px]" data-node-id="1:281">
            <p className="font-['MiSans'] font-bold leading-[32px] relative shrink-0 text-[24px] w-full" data-node-id="1:282">
              “你是谁？值得我投入注意力吗？”
            </p>
            <p className="font-['MiSans'] font-light leading-[24px] relative shrink-0 text-[16px] w-full" data-node-id="1:283">
              用“一站式酒店广告解决平台”抛出高远定位，建立第一认知与情绪共鸣；通过绝对量级的全球平台数据展示平台体量背书，进行信任铺垫
            </p>
          </div>
        </div>
        <div className="bg-[rgba(255,255,255,0.5)] h-px relative shrink-0 w-full" data-node-id="1:284" />
        <div className="content-stretch flex gap-[80px] items-center relative shrink-0 w-full" data-node-id="1:285">
          <div className="content-stretch flex flex-col gap-[28px] items-start relative shrink-0 w-[320px]" data-node-id="1:286">
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-node-id="1:287">
              <div className="border border-solid border-white content-stretch flex flex-col items-center justify-center px-[14px] py-[9px] relative rounded-[30px] shrink-0 size-[40px]" data-node-id="1:288">
                <p className="[word-break:break-word] font-['MiSans'] font-bold leading-[normal] not-italic relative shrink-0 text-[20px] text-center text-white whitespace-nowrap" data-node-id="1:289">
                  02
                </p>
              </div>
              <p className="[word-break:break-word] bg-clip-text bg-gradient-to-r font-['MiSans'] font-bold from-white leading-[40px] not-italic relative shrink-0 text-[32px] text-[transparent] to-[#8eaaff] whitespace-nowrap" data-node-id="1:290">
                优势与规模
              </p>
            </div>
            <p className="[word-break:break-word] font-['MiSans'] font-light leading-[28px] not-italic relative shrink-0 text-[20px] text-white whitespace-nowrap" data-node-id="1:291">
              化抽象为直观，展示“一站式”分发
            </p>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-start not-italic relative shrink-0 text-white w-[960px]" data-node-id="1:292">
            <p className="font-['MiSans'] font-bold leading-[32px] relative shrink-0 text-[24px] w-full" data-node-id="1:293">
              “你的规模够不够大？有什么特别之处？能覆盖我的目标客群吗？”
            </p>
            <p className="font-['MiSans'] font-light leading-[24px] relative shrink-0 text-[16px] w-full" data-node-id="1:294">
              突出平台“一站式”能力表达，消除渠道与区域盲区疑虑：将能力拆解为“内容-营销-交易”三大闭环内容；展现“全渠道分发”能力：即国内、海外、线上、线下、站内、站外
            </p>
          </div>
        </div>
        <div className="bg-[rgba(255,255,255,0.5)] h-px relative shrink-0 w-full" data-node-id="1:295" />
        <div className="content-stretch flex gap-[80px] items-center relative shrink-0 w-full" data-node-id="1:296">
          <div className="content-stretch flex flex-col gap-[28px] items-start relative shrink-0 w-[320px]" data-node-id="1:297">
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-node-id="1:298">
              <div className="border border-solid border-white content-stretch flex flex-col items-center justify-center px-[14px] py-[9px] relative rounded-[30px] shrink-0 size-[40px]" data-node-id="1:299">
                <p className="[word-break:break-word] font-['MiSans'] font-bold leading-[normal] not-italic relative shrink-0 text-[20px] text-center text-white whitespace-nowrap" data-node-id="1:300">
                  03
                </p>
              </div>
              <p className="[word-break:break-word] bg-clip-text bg-gradient-to-r font-['MiSans'] font-bold from-white leading-[40px] not-italic relative shrink-0 text-[32px] text-[transparent] to-[#8eaaff] whitespace-nowrap" data-node-id="1:301">
                优势解构
              </p>
            </div>
            <p className="[word-break:break-word] font-['MiSans'] font-light leading-[28px] not-italic relative shrink-0 text-[20px] text-white whitespace-nowrap" data-node-id="1:302">
              从抽象优势落地为具体产品能力
            </p>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-start not-italic relative shrink-0 text-white w-[960px]" data-node-id="1:303">
            <p className="font-['MiSans'] font-bold leading-[32px] relative shrink-0 text-[24px] w-full" data-node-id="1:304">
              “你们具体怎么帮我推广？有哪些标准化产品？是否够全面？”
            </p>
            <p className="font-['MiSans'] font-light leading-[24px] relative shrink-0 text-[16px] w-full" data-node-id="1:305">
              从“生态优势+商业化产品→营销能力完整性”方面帮助商户理解整体能力：通过生态矩阵与产品展示将抽象能力具象化，达到落地效果，最终突显品牌营销资源能力优势及产品转化增长能力优势
            </p>
          </div>
        </div>
        <div className="bg-[rgba(255,255,255,0.5)] h-px relative shrink-0 w-full" data-node-id="1:306" />
        <div className="content-stretch flex gap-[80px] items-center relative shrink-0 w-full" data-node-id="1:307">
          <div className="content-stretch flex flex-col gap-[28px] items-start relative shrink-0 w-[320px]" data-node-id="1:308">
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-node-id="1:309">
              <div className="border border-solid border-white content-stretch flex flex-col items-center justify-center px-[14px] py-[9px] relative rounded-[30px] shrink-0 size-[40px]" data-node-id="1:310">
                <p className="[word-break:break-word] font-['MiSans'] font-bold leading-[normal] not-italic relative shrink-0 text-[20px] text-center text-white whitespace-nowrap" data-node-id="1:311">
                  04
                </p>
              </div>
              <p className="[word-break:break-word] bg-clip-text bg-gradient-to-r font-['MiSans'] font-bold from-white leading-[40px] not-italic relative shrink-0 text-[32px] text-[transparent] to-[#8eaaff] whitespace-nowrap" data-node-id="1:312">
                商业成果
              </p>
            </div>
            <p className="[word-break:break-word] font-['MiSans'] font-light leading-[28px] not-italic relative shrink-0 text-[20px] text-white w-full" data-node-id="1:313">
              将产品能力具体为商业说服力
            </p>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-start not-italic relative shrink-0 text-white w-[960px]" data-node-id="1:314">
            <p className="font-['MiSans'] font-bold leading-[32px] relative shrink-0 text-[24px] w-full" data-node-id="1:315">
              “我觉得还可以，但到底有没有效果？转化如何？”
            </p>
            <p className="font-['MiSans'] font-light leading-[24px] relative shrink-0 text-[16px] w-full" data-node-id="1:316">
              通过国际客户的成功故事与真实数据证明营销价值，帮助商户打消疑虑，信任平台具备品牌传播与营销转化的闭环能力，促进合作达成
            </p>
          </div>
        </div>
      </div>
<div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[1244px] top-[11970px] w-[296px]" data-node-id="1:317">
        <div className="content-stretch flex items-start relative shrink-0 w-full" data-node-id="1:318">
          <p className="[word-break:break-word] bg-clip-text bg-gradient-to-r font-['MiSans'] font-bold from-white leading-[32px] not-italic relative shrink-0 text-[24px] text-[transparent] to-[#8eaaff] whitespace-nowrap" data-node-id="1:319">
            优势与规模-总
          </p>
        </div>
        <p className="[word-break:break-word] font-['MiSans'] font-light leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:320">
          全域方案总览：化抽象为直观，展示“一站式”分发
        </p>
      </div>
<div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[1244px] top-[12147px] w-[296px]" data-node-id="1:321">
        <div className="content-stretch flex items-start relative shrink-0 w-full" data-node-id="1:322">
          <p className="[word-break:break-word] bg-clip-text bg-gradient-to-r font-['MiSans'] font-bold from-white leading-[32px] not-italic relative shrink-0 text-[24px] text-[transparent] to-[#8eaaff] whitespace-nowrap" data-node-id="1:323">
            优势解构-分
          </p>
        </div>
        <p className="[word-break:break-word] font-['MiSans'] font-light leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:324">
          核心优势拆解 → 产品深度了解：从抽象优势落地为具体产品能力
        </p>
      </div>
<div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[1244px] top-[12297px] w-[296px]" data-node-id="1:325">
        <div className="content-stretch flex items-start relative shrink-0 w-full" data-node-id="1:326">
          <p className="[word-break:break-word] bg-clip-text bg-gradient-to-r font-['MiSans'] font-bold from-white leading-[32px] not-italic relative shrink-0 text-[24px] text-[transparent] to-[#8eaaff] whitespace-nowrap" data-node-id="1:327">
            商业成果
          </p>
        </div>
        <p className="[word-break:break-word] font-['MiSans'] font-light leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:328">
          标杆案例实证 → 最终行动转化：将产品能力具体为商业说服力
        </p>
      </div>
<div className="absolute contents left-[630px] top-[7759px]" data-node-id="1:329" data-name="生态链接图片">
        <div className="-translate-y-1/2 absolute border-2 border-solid border-white h-[755px] left-[588px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[40px_1px] mask-size-[424px_684px] top-[calc(50%-518px)] w-[504px]" style={{ WebkitMaskImage: `url("${imgImage344}")`, maskImage: `url("${imgImage344}")` }}>
          <CaseImage alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage349} />
        </div>
      </div>
<div className="absolute contents left-[1150px] top-[7639px]" data-node-id="1:333" data-name="智感共赢图片">
        <div className="absolute h-[758px] left-[1146px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[2px_74px] mask-size-[424px_684px] top-[7563px] w-[427px]" style={{ WebkitMaskImage: `url("${imgImage344}")`, maskImage: `url("${imgImage344}")` }}>
          <CaseImage alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage367} />
        </div>
      </div>
<div className="absolute contents left-[110px] top-[7639px]" data-node-id="1:338" data-name="人文温度图片">
        <div className="absolute h-[810.849px] left-[14px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[94px_100px] mask-size-[424px_684px] top-[7537px] w-[608px]" style={{ WebkitMaskImage: `url("${imgImage344}")`, maskImage: `url("${imgImage344}")` }}>
          <CaseImage alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage368} />
        </div>
      </div>
<div className="absolute flex h-[20px] items-center justify-center left-[110px] top-[9417px] w-[1460px]" data-node-id="1:344">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="h-[20px] relative w-[1460px]">
            <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgRectangle420} />
          </div>
        </div>
      </div>
<div className="absolute h-[360px] left-[110px] top-[7639px] w-[420px]" data-node-id="1:350">
        <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgRectangle428} />
      </div>
<div className="absolute h-[360px] left-[630px] top-[7759px] w-[420px]" data-node-id="1:351">
        <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgRectangle428} />
      </div>
<div className="absolute h-[360px] left-[1150px] top-[7639px] w-[420px]" data-node-id="1:352">
        <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgRectangle428} />
      </div>
<div className="[word-break:break-word] absolute flex flex-col gap-[20px] left-[140px] text-white top-[7683px] w-[360px]" data-node-id="1:353">
        <div className="flex flex-col gap-[8px] font-['MiSans'] font-black leading-normal">
          <p className="text-[40px]">人文温度</p>
          <p className="text-[28px]">Human-Centered</p>
        </div>
        <div className="font-['MiSans'] font-medium text-[24px] leading-normal">
          <p>旅游品牌温度</p>
          <p>强调以旅行为中心、有人情味和体验感</p>
        </div>
      </div>
<div className="[word-break:break-word] absolute flex flex-col gap-[20px] left-[660px] text-white top-[7803px] w-[360px]" data-node-id="1:354">
        <div className="flex flex-col gap-[8px] font-['MiSans'] font-black leading-normal">
          <p className="text-[40px]">生态链接</p>
          <p className="text-[28px]">Connected Ecosystem</p>
        </div>
        <div className="font-['MiSans'] font-medium text-[24px] leading-normal">
          <p>全域联动能力</p>
          <p>表达平台、渠道、酒店、用户之间的生态链接</p>
        </div>
      </div>
<div className="[word-break:break-word] absolute flex flex-col gap-[20px] left-[1180px] text-white top-[7683px] w-[360px]" data-node-id="1:355">
        <div className="flex flex-col gap-[8px] font-['MiSans'] font-black leading-normal">
          <p className="text-[40px]">智感共赢</p>
          <p className="text-[28px]">Intelligent Synergy</p>
        </div>
        <div className="font-['MiSans'] font-medium text-[24px] leading-normal">
          <p>高端科技底色</p>
          <p>强调智能能力驱动合作共赢</p>
        </div>
      </div>
<div className="solution-glass-circle absolute left-[973px] size-[200px] top-[8837px]" style={{ WebkitBackdropFilter: "blur(50px)", backdropFilter: "blur(50px)" }} data-node-id="1:359">
        <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse201} />
      </div>
<div className="solution-glass-circle absolute left-[450px] size-[140px] top-[9187px]" style={{ WebkitBackdropFilter: "blur(50px)", backdropFilter: "blur(50px)" }} data-node-id="1:360">
        <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse202} />
      </div>
<p className="-translate-x-1/2 [word-break:break-word] absolute font-['MiSans'] font-bold leading-[normal] left-[1073px] not-italic text-[80px] text-center text-white top-[8885px] whitespace-nowrap" data-node-id="1:361">
        Aa
      </p>
<p className="-translate-x-1/2 [word-break:break-word] absolute font-['MiSans'] font-medium leading-[normal] left-[520.5px] not-italic text-[60px] text-center text-white top-[9218px] whitespace-nowrap" data-node-id="1:362">
        Aa
      </p>
<p className="[word-break:break-word] absolute font-['MiSans'] font-bold leading-[40px] left-[170px] not-italic text-[32px] text-white top-[9196px] whitespace-nowrap" data-node-id="1:363">
        信赖蓝
      </p>
<p className="[word-break:break-word] absolute font-['MiSans'] font-bold leading-[40px] left-[690px] not-italic text-[32px] text-white top-[9196px] whitespace-nowrap" data-node-id="1:364">
        温暖黄
      </p>
<p className="[word-break:break-word] absolute font-['MiSans'] font-light leading-[normal] left-[170px] not-italic text-[24px] text-white top-[9246px] whitespace-pre" data-node-id="1:365">{`#3264FF  `}</p>
<p className="[word-break:break-word] absolute font-['MiSans'] font-light leading-[normal] left-[690px] not-italic text-[24px] text-white top-[9246px] whitespace-nowrap" data-node-id="1:366">
        #FFB400
      </p>
<p className="[word-break:break-word] absolute font-['MiSans'] font-light leading-[normal] left-[1200px] not-italic text-[24px] text-white top-[8986px] whitespace-nowrap" data-node-id="1:367">
        #0EA161
      </p>
<p className="[word-break:break-word] absolute font-['MiSans'] font-light leading-[normal] left-[1200px] not-italic text-[24px] text-white top-[9131px] whitespace-nowrap" data-node-id="1:368">
        #EB6A01
      </p>
<p className="[word-break:break-word] absolute font-['MiSans'] font-light leading-[normal] left-[1200px] not-italic text-[24px] text-white top-[9286px] whitespace-nowrap" data-node-id="1:369">
        #853DA3
      </p>
<div className="absolute contents left-[100px] top-[12940px]" data-node-id="1:375">
        <div className="-translate-x-1/2 absolute h-[263px] left-[calc(50%-400px)] top-[13223px] w-[500px]" data-node-id="1:376">
          <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgRectangle442} />
        </div>
        <div className="-translate-x-1/2 absolute h-[280px] left-[calc(50%-400px)] top-[13206px] w-[680px]" data-node-id="1:377">
          <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgRectangle443} />
        </div>
        <p className="[word-break:break-word] absolute font-['MiSans'] font-medium leading-[32px] left-[calc(50%-436px)] not-italic text-[24px] text-white top-[13355px] whitespace-nowrap" data-node-id="1:378">
          内容区
        </p>
        <div className="absolute left-[416px] size-[48px] top-[13287px]" data-node-id="1:379" data-name="编组 58">
          <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={img58} />
        </div>
        <div className="absolute h-[268px] left-[100px] rounded-tl-[20px] rounded-tr-[20px] top-[12940px] w-[680px]" data-node-id="1:385" data-name="1 首页 4">
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-tl-[20px] rounded-tr-[20px]">
            <CaseImage alt="" className="absolute h-[895.93%] left-0 max-w-none top-0 w-full" src={img14} />
          </div>
        </div>
      </div>
<div className="absolute contents left-[940px] top-[12873px]" data-node-id="1:386">
        <div className="absolute left-[940px] rounded-[20px] size-[600px] top-[12913px]" data-node-id="1:387" data-name="1 首页 2">
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[20px]">
            <CaseImage alt="" className="absolute h-[353.1%] left-0 max-w-none top-0 w-full" src={img14} />
          </div>
        </div>
        <div className="absolute h-[600px] left-[940px] top-[12913px] w-[75px]" data-node-id="1:388">
          <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgRectangle455} />
        </div>
        <div className="absolute flex h-[600px] items-center justify-center left-[1465px] top-[12913px] w-[75px]" data-node-id="1:389">
          <div className="-scale-y-100 flex-none rotate-180">
            <div className="h-[600px] relative w-[75px]">
              <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgRectangle457} />
            </div>
          </div>
        </div>
        <div className="absolute h-[680px] left-[1012px] rounded-[30px] shadow-[0px_0px_15px_0px_rgba(0,0,0,0.25)] top-[12873px] w-[3px]" data-node-id="1:390" style={{ backgroundImage: "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 20%, rgb(255, 255, 255) 80%, rgba(255, 255, 255, 0) 100%)" }} />
        <div className="absolute h-[680px] left-[1465px] rounded-[30px] shadow-[0px_0px_15px_0px_rgba(0,0,0,0.25)] top-[12873px] w-[3px]" data-node-id="1:391" style={{ backgroundImage: "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 20%, rgb(255, 255, 255) 80%, rgba(255, 255, 255, 0) 100%)" }} />
        <div className="absolute left-[1003px] size-[21px] top-[13227.5px]" data-node-id="1:392">
          <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse205} />
        </div>
        <div className="absolute left-[1009px] size-[9px] top-[13233.5px]" data-node-id="1:393">
          <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse206} />
        </div>
        <div className="absolute flex items-center justify-center left-[1006px] size-[29.698px] top-[13229px]" data-node-id="1:394">
          <div className="-rotate-45 flex-none">
            <div className="relative size-[21px]">
              <div className="absolute inset-[-16.26%_-16.72%_-17.15%_-16.72%]">
                <CaseImage alt="" className="block max-w-none size-full" src={imgPolygon7} />
              </div>
            </div>
          </div>
        </div>
      </div>
<p className="[word-break:break-word] absolute font-['MiSans'] font-light leading-[normal] left-[1009px] not-italic text-[24px] text-white top-[13604px] whitespace-nowrap" data-node-id="1:395">
        适配到1920px屏幕，超出中心区域宽度不变
      </p>
<p className="[word-break:break-word] absolute font-['MiSans'] font-medium leading-[normal] left-[344px] not-italic text-[24px] text-white top-[13561px] whitespace-nowrap" data-node-id="1:396">
        人文温度视角传达
      </p>
<p className="[word-break:break-word] absolute font-['MiSans'] font-medium leading-[normal] left-[1093px] not-italic text-[24px] text-white top-[13561px] whitespace-nowrap" data-node-id="1:397">
        信息更加聚焦 可视范围集中
      </p>
<p className="[word-break:break-word] absolute font-['MiSans'] font-light leading-[normal] left-[299px] not-italic text-[24px] text-white top-[13604px] whitespace-nowrap" data-node-id="1:398">
        让酒店业主看到“真实的人”
      </p>
<p className="absolute flex items-center justify-center font-['MiSans'] font-bold text-[32px] leading-[normal] text-white text-center left-[80px] top-[11159px] w-[460px] h-[120px]" data-node-id="1:399">
        合作的起点
      </p>
<p className="absolute flex items-center justify-center font-['MiSans'] font-bold text-[32px] leading-[normal] text-white text-center left-[610px] top-[11159px] w-[460px] h-[120px]" data-node-id="1:400">
        覆盖的节点
      </p>
<p className="absolute flex items-center justify-center font-['MiSans'] font-bold text-[32px] leading-[normal] text-white text-center left-[1140px] top-[11159px] w-[460px] h-[120px]" data-node-id="1:401">
        增长的触点
      </p>
<div className="absolute h-0 left-[1039px] top-[11838px] w-[175px]" data-node-id="1:429">
        <div className="absolute inset-[-2.67px_-1.52%]">
          <CaseImage alt="" className="block max-w-none size-full" src={imgVector174} />
        </div>
      </div>
<div className="absolute h-0 left-[1078px] top-[11986px] w-[136px]" data-node-id="1:430">
        <div className="absolute inset-[-2.67px_-1.96%]">
          <CaseImage alt="" className="block max-w-none size-full" src={imgVector175} />
        </div>
      </div>
<div className="absolute h-0 left-[1119px] top-[12163px] w-[95px]" data-node-id="1:431">
        <div className="absolute inset-[-2.67px_-2.81%]">
          <CaseImage alt="" className="block max-w-none size-full" src={imgVector176} />
        </div>
      </div>
<div className="absolute h-0 left-[1149px] top-[12313px] w-[65px]" data-node-id="1:432">
        <div className="absolute inset-[-2.67px_-4.1%]">
          <CaseImage alt="" className="block max-w-none size-full" src={imgVector177} />
        </div>
      </div>
<div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[1244px] top-[11822px] w-[296px]" data-node-id="1:433">
        <div className="content-stretch flex items-start relative shrink-0 w-full" data-node-id="1:434">
          <p className="[word-break:break-word] bg-clip-text bg-gradient-to-r font-['MiSans'] font-bold from-white leading-[32px] not-italic relative shrink-0 text-[24px] text-[transparent] to-[#8eaaff] whitespace-nowrap" data-node-id="1:435">{`定位愿景 `}</p>
        </div>
        <p className="[word-break:break-word] font-['MiSans'] font-light leading-[24px] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:436">
          首屏价值感知 → 规模数据信任：建立第一印象与体量信任
        </p>
      </div>
<div className="absolute h-[800px] left-[80px] rounded-bl-[60px] rounded-tl-[60px] top-[11737px] w-[1028px]" data-node-id="1:437" data-name="Group 315 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-bl-[60px] rounded-tl-[60px]">
          <CaseImage alt="" className="absolute h-[142.65%] left-[-3.34%] max-w-none top-[-26.74%] w-[106.09%]" src={imgGroup3151} />
        </div>
      </div>
<div className="absolute h-[420px] left-[80px] top-[10659px] w-[660px]" data-name="蓝点 1">
        <CaseImage alt="" className="absolute inset-0 size-full object-cover" src={imgBrandBlue} />
      </div>
<div className="absolute h-[420px] left-[940px] top-[10659px] w-[660px]" data-name="黄点 1">
        <CaseImage alt="" className="absolute inset-0 size-full object-cover" src={imgBrandYellow} />
      </div>
<div className="absolute left-[660px] size-[360px] top-[10689px]" data-node-id="1:438">
        <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse208} />
      </div>
<p className="[word-break:break-word] absolute bg-clip-text bg-gradient-to-r font-['MiSans'] font-black from-[#ffb400] leading-[68px] left-[696px] not-italic text-[32px] text-[transparent] to-[#3264ff] top-[10819px] via-1/2 via-[#58bcff] whitespace-nowrap" data-node-id="1:439">
        品牌原点→生态网络
      </p>
<CaseImage className="absolute left-[710px] top-[10899px] w-[260px] h-[56px] object-contain" src={imgGroup3331} alt="Trip.com Group 品牌原点" />
<div className="absolute bg-[rgba(255,255,255,0.1)] h-[508px] left-[80px] rounded-[40px] top-[10071px] w-[440px]" data-node-id="1:440" />
<div className="absolute bg-[rgba(255,255,255,0.1)] h-[508px] left-[620px] rounded-[40px] top-[10071px] w-[440px]" data-node-id="1:441" />
<div className="absolute bg-[rgba(255,255,255,0.1)] h-[508px] left-[1160px] rounded-[40px] top-[10071px] w-[440px]" data-node-id="1:442" />
<div className="absolute contents left-[80px] top-[10179px]" data-node-id="1:443" data-name="Mask group">
        <div className="absolute h-[820px] left-[-26px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[106px_321px] mask-size-[440px_280px] top-[9858px] w-[546px]" data-node-id="1:445" style={{ WebkitMaskImage: `url("${imgImage381}")`, maskImage: `url("${imgImage381}")` }} data-name="image 381">
          <CaseImage alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage382} />
        </div>
        <div className="absolute bg-[rgba(0,0,0,0.4)] h-[432px] left-[21px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[59px_40px] mask-size-[440px_280px] top-[10139px] w-[538px]" data-node-id="1:446" style={{ WebkitMaskImage: `url("${imgImage381}")`, maskImage: `url("${imgImage381}")` }} />
      </div>
<div className="absolute contents left-[620px] top-[10179px]" data-node-id="1:447" data-name="Mask group">
        <div className="absolute h-[471px] left-[584px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[36px_134px] mask-size-[420px_280px] top-[10045px] w-[466px]" data-node-id="1:449" style={{ WebkitMaskImage: `url("${imgImage385}")`, maskImage: `url("${imgImage385}")` }} data-name="image 385">
          <CaseImage alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage386} />
        </div>
        <div className="absolute h-[572px] left-[601px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[19px_151px] mask-size-[420px_280px] top-[10028px] w-[458px]" data-node-id="1:450" style={{ WebkitMaskImage: `url("${imgImage385}")`, maskImage: `url("${imgImage385}")` }} data-name="image 386">
          <CaseImage alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage387} />
        </div>
        <div className="absolute bg-[rgba(0,0,0,0.4)] h-[432px] left-[561px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[59px_40px] mask-size-[420px_280px] top-[10139px] w-[538px]" data-node-id="1:451" style={{ WebkitMaskImage: `url("${imgImage385}")`, maskImage: `url("${imgImage385}")` }} />
      </div>
<div className="absolute contents left-[1160px] top-[10179px]" data-node-id="1:452" data-name="Mask group">
        <div className="absolute h-[305px] left-[1156px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[4px_3px] mask-size-[420px_280px] top-[10176px] w-[457px]" data-node-id="1:454" style={{ WebkitMaskImage: `url("${imgImage385}")`, maskImage: `url("${imgImage385}")` }} data-name="image 384">
          <CaseImage alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage384} />
        </div>
        <div className="absolute bg-[rgba(0,0,0,0.4)] h-[432px] left-[1101px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[59px_40px] mask-size-[420px_280px] top-[10139px] w-[538px]" data-node-id="1:455" style={{ WebkitMaskImage: `url("${imgImage385}")`, maskImage: `url("${imgImage385}")` }} />
      </div>
<div className="absolute left-[410px] size-[60px] top-[10193px]" data-node-id="1:456">
        <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse219} />
      </div>
<div className="absolute h-[26px] left-[642px] top-[10393px] w-[376px]" data-node-id="1:457">
        <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup326} />
      </div>
<div className="absolute h-[26px] left-[1182px] top-[10393px] w-[376px]" data-node-id="1:469">
        <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup327} />
      </div>
<div className="absolute h-[26px] left-[1182px] top-[10358px] w-[376px]" data-node-id="1:481">
        <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup328} />
      </div>
<div className="absolute h-[26px] left-[1182px] top-[10323px] w-[376px]" data-node-id="1:493">
        <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup329} />
      </div>
<div className="absolute h-[26px] left-[1182px] top-[10288px] w-[376px]" data-node-id="1:505">
        <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup329} />
      </div>
<div className="absolute h-[26px] left-[1182px] top-[10253px] w-[376px]" data-node-id="1:517">
        <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup328} />
      </div>
<div className="absolute h-[26px] left-[1182px] top-[10218px] w-[376px]" data-node-id="1:529">
        <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup327} />
      </div>
<p className="[word-break:break-word] absolute font-['MiSans'] font-light leading-[28px] left-[120px] not-italic text-[20px] text-white top-[10483px] w-[340px]" data-node-id="1:541">
        新起点，延续品牌温度，代表每一位合作伙伴、每一个真实旅客
      </p>
<p className="[word-break:break-word] absolute font-['MiSans'] font-light leading-[28px] left-[660px] not-italic text-[20px] text-white top-[10483px] w-[340px]" data-node-id="1:542">
        圆点发散形成视觉引导，通过透明度与模糊感，营造有呼吸感的品牌场域
      </p>
<p className="[word-break:break-word] absolute font-['MiSans'] font-light leading-[28px] left-[1200px] not-italic text-[20px] text-white top-[10483px] w-[340px]" data-node-id="1:543">
        粒子交织成全球生态网络，对应“站内+站外、线上+线下、中国+海外”
      </p>
<p className="[word-break:break-word] absolute font-['MiSans'] font-bold leading-[48px] left-[130px] not-italic text-[40px] text-white top-[10111px] whitespace-nowrap" data-node-id="1:544">
        点
      </p>
<p className="[word-break:break-word] absolute font-['MiSans'] font-bold leading-[48px] left-[670px] not-italic text-[40px] text-white top-[10111px] whitespace-nowrap" data-node-id="1:545">
        线
      </p>
<p className="[word-break:break-word] absolute font-['MiSans'] font-bold leading-[48px] left-[1210px] not-italic text-[40px] text-white top-[10111px] whitespace-nowrap" data-node-id="1:546">
        面
      </p>
<div className="-translate-x-1/2 absolute h-[56px] left-1/2 top-[10899px] w-[260px]" data-node-id="1:547" data-name="Group 333 1">
        <CaseImage alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgGroup3331} />
      </div>
<div className="absolute content-stretch flex flex-col gap-[32px] items-start left-[80px] top-[9875px] w-[1520px]" data-node-id="1:548">
        <div className="content-stretch flex gap-[20px] items-center relative shrink-0 w-full" data-node-id="1:549">
          <div className="flex items-center justify-center relative shrink-0 size-[22.627px]" data-node-id="1:550">
            <div className="flex-none rotate-45">
              <div className="relative rounded-[2px] size-[16px]" style={{ backgroundImage: "linear-gradient(135deg, rgb(143, 170, 255) 0.82864%, rgb(50, 100, 255) 100.82%)" }} />
            </div>
          </div>
          <p className="[word-break:break-word] font-['MiSans'] font-black leading-[normal] not-italic relative shrink-0 text-[32px] text-white whitespace-nowrap" data-node-id="1:551">
            从“品牌基因”到“增长隐喻”的视觉叙事
          </p>
        </div>
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:552">
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:553">
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:554">
              <p className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:555">
                图形元素提取 Trip.com Group 官方 Logo 中连接“Trip”与“com”的黄色圆点基因，将其从单点演化为页面中散布的蓝黄径向发散点阵，利用相似性、连续性，让视线自然跟随点阵流动，形成“全球平台，亚洲温度”的独特品牌认知
              </p>
            </div>
          </div>
        </div>
      </div>
<div className="absolute content-stretch flex flex-col gap-[32px] items-start left-[80px] top-[12657px] w-[1520px]" data-node-id="1:556">
        <div className="content-stretch flex gap-[20px] items-center relative shrink-0 w-full" data-node-id="1:557">
          <div className="flex items-center justify-center relative shrink-0 size-[22.627px]" data-node-id="1:558">
            <div className="flex-none rotate-45">
              <div className="relative rounded-[2px] size-[16px]" style={{ backgroundImage: "linear-gradient(135deg, rgb(143, 170, 255) 0.82864%, rgb(50, 100, 255) 100.82%)" }} />
            </div>
          </div>
          <p className="[word-break:break-word] font-['MiSans'] font-black leading-[normal] not-italic relative shrink-0 text-[32px] text-white whitespace-nowrap" data-node-id="1:559">
            代入式场景布局
          </p>
        </div>
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:560">
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:561">
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:562">
              <p className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:563">
                首屏使用大尺寸旅行实景，消解 B 端商务的冰冷刻板，传递有温度的合作气质，强化「旅游垂直行业专属解决方案」的身份认知。替代纯抽象技术的疏离感，呼应「人文温度」方向，传递全球化、全域业务的开阔感
              </p>
            </div>
          </div>
        </div>
      </div>
<div className="absolute content-stretch flex flex-col gap-[32px] items-start left-[80px] top-[13815px] w-[1520px]" data-node-id="1:564">
        <div className="content-stretch flex gap-[20px] items-center relative shrink-0 w-full" data-node-id="1:565">
          <div className="flex items-center justify-center relative shrink-0 size-[22.627px]" data-node-id="1:566">
            <div className="flex-none rotate-45">
              <div className="relative rounded-[2px] size-[16px]" style={{ backgroundImage: "linear-gradient(135deg, rgb(143, 170, 255) 0.82864%, rgb(50, 100, 255) 100.82%)" }} />
            </div>
          </div>
          <p className="[word-break:break-word] font-['MiSans'] font-black leading-[normal] not-italic relative shrink-0 text-[32px] text-white whitespace-nowrap" data-node-id="1:567">
            信任系统建立
          </p>
        </div>
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:568">
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:569">
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:570">
              <p className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:571">
                把抽象的「营销增长」，转译成可感知的「业务结果」：通过展示核心规模数据及前沿科技，降低价值理解成本，快速感知平台体量及能力，用最低的阅读成本建立初步信任；通过真实成功案例触发用户的业务共情，比纯理性的技术宣讲更易建立心理信任，提升后续转化的接受度；通过下钻页面详细阐述平台具体能力，形成完整统一的整体架构
              </p>
            </div>
          </div>
        </div>
      </div>
<p className="[word-break:break-word] absolute font-['MiSans'] font-bold leading-[normal] left-[calc(50%-85px)] not-italic text-[20px] text-white top-[14092px] whitespace-nowrap" data-node-id="1:572">
        Hotel Solution首页
      </p>
<p className="[word-break:break-word] absolute font-['MiSans'] font-medium leading-[normal] left-[351px] not-italic text-[20px] text-white top-[14092px] whitespace-nowrap" data-node-id="1:573">
        产品功能页 *8
      </p>
<p className="[word-break:break-word] absolute font-['MiSans'] font-medium leading-[normal] left-[1205px] not-italic text-[20px] text-white top-[14092px] whitespace-nowrap" data-node-id="1:574">
        成功案例页 *3
      </p>
<div className="absolute content-stretch flex flex-col gap-[32px] items-start left-[80px] top-[15060px] w-[1520px]" style={{ marginTop: motionShift }} data-node-id="1:575">
        <div className="content-stretch flex gap-[20px] items-center relative shrink-0 w-full" data-node-id="1:576">
          <div className="flex items-center justify-center relative shrink-0 size-[22.627px]" data-node-id="1:577">
            <div className="flex-none rotate-45">
              <div className="relative rounded-[2px] size-[16px]" style={{ backgroundImage: "linear-gradient(135deg, rgb(143, 170, 255) 0.82864%, rgb(50, 100, 255) 100.82%)" }} />
            </div>
          </div>
          <p className="[word-break:break-word] font-['MiSans'] font-black leading-[normal] not-italic relative shrink-0 text-[32px] text-white whitespace-nowrap" data-node-id="1:578">
            流线与动态：一致性与智感节奏
          </p>
        </div>
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:579">
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:580">
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:581">
              <p className="[word-break:break-word] font-['MiSans'] font-light leading-[normal] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="1:582">
                页面边缘毛玻璃与发散点阵构建 Z 轴纵深，贯穿页面，形成一致的视觉流线及统一的生态覆盖感；整体内容制定轻量克制的交互动效，确保视觉语言统一，引导用户的浏览路径
              </p>
            </div>
          </div>
        </div>
      </div>
<div className="-translate-x-1/2 absolute h-[800px] left-1/2 top-[15235px] w-[1260px]" style={{ marginTop: motionShift }} data-node-id="1:583" data-name="image 387">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <CaseImage alt="" className="absolute h-[198.36%] left-[-12.87%] max-w-none top-[-50.21%] w-[125.94%]" src={imgImage388} />
        </div>
      </div>
<div className="-translate-x-1/2 absolute contents left-1/2 top-[14138px]" data-node-id="1:584">
        <div className="absolute flex h-[560px] items-center justify-center left-[88px] top-[14268px] w-[525px]" data-node-id="1:585">
          <div className="-scale-y-100 flex-none rotate-180">
            <div className="h-[560px] relative w-[525px]" data-name="222 1">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <CaseImage alt="" className="absolute h-[169.43%] left-[-123.78%] max-w-none top-[-36.68%] w-[240.76%]" src={img2221} />
              </div>
            </div>
          </div>
        </div>
        <div className="-translate-x-1/2 absolute h-[690px] left-[calc(50%-60.5px)] top-[14138px] w-[579px]" data-node-id="1:586" data-name="2图 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <CaseImage alt="" className="absolute h-[142.42%] left-[-15.92%] max-w-none top-[-16.39%] w-[226.27%]" src={img21} />
          </div>
        </div>
        <div className="-translate-x-1/2 absolute h-[630px] left-[calc(50%+477.5px)] top-[14198px] w-[549px]" data-node-id="1:587" data-name="2图 2">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <CaseImage alt="" className="absolute h-[158.96%] left-[-123.97%] max-w-none top-[-34.31%] w-[243.06%]" src={img21} />
          </div>
        </div>
      </div>
<div className="absolute h-[645px] left-[343px] top-[15278px] w-[997px]" style={{ marginTop: motionShift }} data-node-id="1:588">
        <div
          className="absolute inset-0 bg-white"
          style={{
            maskImage: `url("${imgRectangle524}")`,
            maskPosition: "center",
            maskRepeat: "no-repeat",
            maskSize: "100% 100%",
            WebkitMaskImage: `url("${imgRectangle524}")`,
            WebkitMaskPosition: "center",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
          }}
        >
          <video
            aria-label="流线与动态设计演示"
            className="absolute inset-0 size-full object-cover"
            loop
            muted
            playsInline
            preload="auto"
            ref={videoRef}
            src={flowVideoSrc}
          />
        </div>
      </div>
<div className="-translate-x-1/2 absolute content-stretch flex gap-[32px] items-center left-1/2 top-[16473px] w-[1520px]" style={{ marginTop: motionShift }} data-node-id="1:589">
        <div className="flex flex-[1_0_0] flex-row items-center self-stretch" data-node-id="1:590">
          <div className="bg-white content-stretch flex flex-[1_0_0] flex-col h-full items-start min-w-px px-[40px] py-[60px] relative rounded-[40px]">
            <div className="content-stretch flex flex-col gap-[60px] items-start relative shrink-0 w-full" data-node-id="1:591">
              <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-node-id="1:592">
                <p className="[word-break:break-word] bg-center bg-clip-text bg-cover bg-no-repeat font-['MiSans'] font-black leading-[normal] not-italic relative shrink-0 text-[40px] text-[transparent] w-full" data-node-id="1:593" style={{ backgroundImage: `url("${img}")` }}>
                  前期调研与策略阶段
                </p>
              </div>
              <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-node-id="1:594">
                <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-node-id="1:595">
                  <div className="h-[24px] relative shrink-0 w-[6px]" data-node-id="1:596">
                    <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame2147224634} />
                  </div>
                  <p className="[word-break:break-word] flex-[1_0_0] font-['MiSans'] font-light leading-[24px] min-w-px not-italic relative text-[16px] text-black" data-node-id="1:598">
                    通过大模型抓取页面核心信息，生成初版竞品对比表格，完成基础信息的结构化整理。设计师在此基础上做专业判断、提炼差异化机会、输出设计策略，把人力从信息整理中释放出来
                  </p>
                </div>
                <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-node-id="1:599">
                  <div className="h-[24px] relative shrink-0 w-[6px]" data-node-id="1:600">
                    <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame2147224634} />
                  </div>
                  <p className="[word-break:break-word] flex-[1_0_0] font-['MiSans'] font-light leading-[24px] min-w-px not-italic relative text-[16px] text-black" data-node-id="1:602">
                    基于Trip.com品牌设计手册、此项目定位及B端业务诉求，使用AI辅助生成不同情绪板方案，经设计、产品与业务商讨确定最终方案
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-[1_0_0] flex-row items-center self-stretch" data-node-id="1:603">
          <div className="bg-white content-stretch flex flex-[1_0_0] flex-col h-full items-start min-w-px px-[40px] py-[60px] relative rounded-[40px]">
            <div className="content-stretch flex flex-col gap-[60px] items-start relative shrink-0 w-full" data-node-id="1:604">
              <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-node-id="1:605">
                <p className="[word-break:break-word] bg-center bg-clip-text bg-cover bg-no-repeat font-['MiSans'] font-black leading-[normal] not-italic relative shrink-0 text-[40px] text-[transparent] w-full" data-node-id="1:606" style={{ backgroundImage: `url("${img3}")` }}>
                  设计产出及沉淀阶段
                </p>
              </div>
              <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-node-id="1:607">
                <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-node-id="1:608">
                  <div className="h-[24px] relative shrink-0 w-[6px]" data-node-id="1:609">
                    <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame2147224634} />
                  </div>
                  <p className="[word-break:break-word] flex-[1_0_0] font-['MiSans'] font-light leading-[24px] min-w-px not-italic relative text-[16px] text-black" data-node-id="1:611">
                    根据情绪板，辅助探索视觉方向，输入页面模块排序、信息层级要求，AI 生成多版布局初稿，快速验证长页面的视觉节奏、模块轻重交替及视觉风格是否合理，设计师再做精细化调整，完成最终界面
                  </p>
                </div>
                <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-node-id="1:612">
                  <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-node-id="1:613">
                    <div className="h-[24px] relative shrink-0 w-[6px]" data-node-id="1:614">
                      <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame2147224634} />
                    </div>
                    <p className="[word-break:break-word] flex-[1_0_0] font-['MiSans'] font-light leading-[24px] min-w-px not-italic relative text-[16px] text-black" data-node-id="1:616">
                      将已确认页面由AI辅助生成Skill，沉淀入团队资产库。拓展页面及内容时，可直接调用品牌系统一键生成，便于延展复用及资产沉淀
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white content-stretch flex flex-[1_0_0] flex-col items-start min-w-px px-[40px] py-[60px] relative rounded-[40px]" data-node-id="1:617">
          <div className="content-stretch flex flex-col gap-[60px] items-start relative shrink-0 w-full" data-node-id="1:618">
            <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-node-id="1:619">
              <p className="[word-break:break-word] bg-center bg-clip-text bg-cover bg-no-repeat font-['MiSans'] font-black leading-[normal] not-italic relative shrink-0 text-[40px] text-[transparent] w-full" data-node-id="1:620" style={{ backgroundImage: `url("${img3}")` }}>
                →Skill复用
              </p>
            </div>
            <div className="h-[260px] relative shrink-0 w-[405px]" data-node-id="1:621" data-name="Group 335 1">
              <CaseImage alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgGroup3351} />
            </div>
          </div>
        </div>
      </div>
</div>
</div>
    </section>
  );
}
