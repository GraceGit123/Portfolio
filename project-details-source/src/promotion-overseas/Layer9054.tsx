import CaseImage from '../CaseImage'
const assetPathPrefix = `${import.meta.env.BASE_URL}assets/promotion-overseas`;
const img2 = `${assetPathPrefix}/55025.png`;

export default function Component2() {
  return (
    <div className="overflow-clip relative rounded-[16px] size-full" data-node-id="43:369" data-name="已选时间-可以保存 2">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[16px]">
        <CaseImage alt="海外 App 已选时间" className="absolute h-[100.02%] left-[0.1%] max-w-none top-[-0.01%] w-full" src={img2} />
      </div>
    </div>
  );
}
