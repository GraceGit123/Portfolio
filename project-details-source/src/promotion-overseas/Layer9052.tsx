import CaseImage from '../CaseImage'
const assetPathPrefix = `${import.meta.env.BASE_URL}assets/promotion-overseas`;
const img3 = `${assetPathPrefix}/4b4ab.png`;

export default function Component3() {
  return (
    <div className="overflow-clip relative rounded-[16px] size-full" data-node-id="43:368" data-name="输入折扣 3">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[16px]">
        <CaseImage alt="海外 App 输入促销折扣" className="absolute h-[100.02%] left-[0.1%] max-w-none top-[-0.01%] w-full" src={img3} />
      </div>
    </div>
  );
}
