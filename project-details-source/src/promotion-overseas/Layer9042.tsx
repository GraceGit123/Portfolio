import CaseImage from '../CaseImage'
const assetPathPrefix = `${import.meta.env.BASE_URL}assets/promotion-overseas`;
const img1 = `${assetPathPrefix}/d094f.png`;

export default function Component1() {
  return (
    <div className="border-4 border-[#dee6ff] border-solid overflow-clip relative rounded-[8px] size-full" data-node-id="43:364" data-name="促销设置-用 1">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[8px]">
        <CaseImage alt="海外 PC 促销配置页面" className="absolute left-0 max-w-none size-full top-[0.06%]" src={img1} />
      </div>
    </div>
  );
}
