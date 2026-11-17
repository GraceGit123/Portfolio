import CaseImage from '../CaseImage'
const assetPathPrefix = `${import.meta.env.BASE_URL}assets/promotion-overseas`;
const img2 = `${assetPathPrefix}/e2db3.png`;

export default function Component2() {
  return (
    <div className="overflow-clip relative rounded-[16px] size-full" data-node-id="43:367" data-name="时间选择 2">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[16px]">
        <CaseImage alt="海外 App 选择时间" className="absolute h-[100.02%] left-[-0.1%] max-w-none top-[-0.01%] w-full" src={img2} />
      </div>
    </div>
  );
}
