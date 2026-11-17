import CaseImage from '../CaseImage'
const assetPathPrefix = `${import.meta.env.BASE_URL}assets/promotion-overseas`;
const img1 = `${assetPathPrefix}/9c3eb.png`;

export default function Component1() {
  return (
    <div className="border-4 border-[#dee6ff] border-solid overflow-clip relative rounded-[8px] size-full" data-node-id="43:362" data-name="计算器 1">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[8px]">
        <CaseImage alt="海外 PC 促销叠加计算器" className="absolute h-[100.17%] left-0 max-w-none top-0 w-full" src={img1} />
      </div>
    </div>
  );
}
