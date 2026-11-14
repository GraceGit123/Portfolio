import CaseImage from '../CaseImage'
const assetPathPrefix = `${import.meta.env.BASE_URL}assets`;
const imgImage238 = `${assetPathPrefix}/7d04c.png`;
const imgImage237 = `${assetPathPrefix}/4c066.svg`;

export default function Frame38() {
  return (
    <div className="bg-white content-stretch flex gap-[10px] items-center justify-center px-[24px] py-[7px] relative rounded-[50px] size-full" data-node-id="1:150">
      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="1:151" data-name="Mask group">
        <div className="col-1 h-[76px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[20px_20px] mask-size-[44px_44px] ml-[-20px] mt-[-20px] relative row-1 w-[85px]" data-node-id="1:153" style={{ maskImage: `url("${imgImage237}")` }} data-name="image 237">
          <CaseImage alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage238} />
        </div>
      </div>
      <p className="[word-break:break-word] font-sans [font-weight:500] leading-[24px] not-italic relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" data-node-id="1:154">
        看不到 C 端展示效果，只能自己打开 APP 去查
      </p>
    </div>
  );
}
