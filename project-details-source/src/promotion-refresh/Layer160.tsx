import CaseImage from '../CaseImage'
const assetPathPrefix = `${import.meta.env.BASE_URL}assets`;
const imgImage238 = `${assetPathPrefix}/57b10.png`;
const imgImage237 = `${assetPathPrefix}/4c066.svg`;

export default function Frame39() {
  return (
    <div className="bg-white content-stretch flex gap-[10px] items-center justify-center px-[24px] py-[7px] relative rounded-[50px] size-full" data-node-id="1:160">
      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="1:161" data-name="Mask group">
        <div className="col-1 h-[128px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[50px_38px] mask-size-[44px_44px] ml-[-50px] mt-[-38px] relative row-1 w-[143px]" data-node-id="1:163" style={{ maskImage: `url("${imgImage237}")` }} data-name="image 237">
          <CaseImage alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage238} />
        </div>
      </div>
      <p className="[word-break:break-word] font-sans [font-weight:500] leading-[24px] not-italic relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" data-node-id="1:164">
        我报了【连住优惠】，但不知道要不要再报【多间立减】？这俩能一起用吗？
      </p>
    </div>
  );
}
