import CaseImage from '../CaseImage'
const assetPathPrefix = `${import.meta.env.BASE_URL}assets`;
const imgImage238 = `${assetPathPrefix}/b2506.png`;
const imgImage237 = `${assetPathPrefix}/4c066.svg`;

export default function Frame41() {
  return (
    <div className="bg-white content-stretch flex gap-[10px] items-center justify-center px-[24px] py-[7px] relative rounded-[50px] size-full" data-node-id="1:175">
      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="1:176" data-name="Mask group">
        <div className="col-1 h-[74px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[12px_15px] mask-size-[44px_44px] ml-[-12px] mt-[-15px] relative row-1 w-[83px]" data-node-id="1:178" style={{ maskImage: `url("${imgImage237}")` }} data-name="image 237">
          <CaseImage alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage238} />
        </div>
      </div>
      <p className="[word-break:break-word] font-sans [font-weight:500] leading-[24px] not-italic relative shrink-0 text-[16px] text-black text-right whitespace-nowrap" data-node-id="1:179">
        到底是怎么算的价格？再这么低我要拒单了
      </p>
    </div>
  );
}
