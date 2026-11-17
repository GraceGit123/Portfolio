import CaseImage from '../CaseImage'
const assetPathPrefix = `${import.meta.env.BASE_URL}assets/promotion-overseas`;
const imgApp1 = `${assetPathPrefix}/1a772.png`;

export default function app1() {
  return (
    <div className="overflow-clip relative rounded-[16px] size-full" data-node-id="19:9051" data-name="促销详情app 1">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[16px]">
        <CaseImage alt="海外 App 促销详情" className="absolute h-[100.05%] left-0 max-w-none top-0 w-full" src={imgApp1} />
      </div>
    </div>
  );
}
