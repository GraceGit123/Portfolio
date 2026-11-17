import CaseImage from '../CaseImage'
const assetPathPrefix = `${import.meta.env.BASE_URL}assets/promotion-overseas`;
const imgApp1 = `${assetPathPrefix}/b89b0.png`;

export default function app1() {
  return (
    <div className="relative size-full" data-node-id="19:9050" data-name="促销设置APP 1">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <CaseImage alt="海外 App 促销设置" className="absolute h-[100.02%] left-0 max-w-none top-0 w-full" src={imgApp1} />
      </div>
    </div>
  );
}
