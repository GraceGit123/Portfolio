import CaseImage from '../CaseImage'
const assetPathPrefix = `${import.meta.env.BASE_URL}assets/promotion-overseas`;
const imgReview3 = `${assetPathPrefix}/d1807.png`;

export default function Review3() {
  return (
    <div className="overflow-clip relative rounded-[16px] size-full" data-node-id="43:370" data-name="review弹窗备份 3">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[16px]">
        <CaseImage alt="海外 App 确认促销设置" className="absolute h-[100.02%] left-[0.1%] max-w-none top-[-0.01%] w-full" src={imgReview3} />
      </div>
    </div>
  );
}
