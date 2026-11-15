import CaseImage from '../CaseImage'
const assetPathPrefix = `${import.meta.env.BASE_URL}assets/promotion-overseas`;
const imgApp1 = `${assetPathPrefix}/2c008.png`;

export default function app1() {
  return (
    <div className="relative size-full" data-node-id="19:9049" data-name="促销参与app 1">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <CaseImage alt="" className="absolute h-[99.96%] left-0 max-w-none top-0 w-full" src={imgApp1} />
      </div>
    </div>
  );
}
