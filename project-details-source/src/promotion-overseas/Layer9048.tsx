import CaseImage from '../CaseImage'
const assetPathPrefix = `${import.meta.env.BASE_URL}assets/promotion-overseas`;
const imgApp2 = `${assetPathPrefix}/3a357.png`;

export default function app2() {
  return (
    <div className="overflow-clip relative rounded-[16px] size-full" data-node-id="43:365" data-name="促销APP 2">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[16px]">
        <CaseImage alt="海外 App 促销首页" className="absolute h-[100.01%] left-0 max-w-none top-0 w-full" src={imgApp2} />
      </div>
    </div>
  );
}
