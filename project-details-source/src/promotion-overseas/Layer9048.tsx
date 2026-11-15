import CaseImage from '../CaseImage'
const assetPathPrefix = `${import.meta.env.BASE_URL}assets/promotion-overseas`;
const imgApp1 = `${assetPathPrefix}/938a6.png`;

export default function app1() {
  return (
    <div className="relative size-full" data-node-id="19:9048" data-name="促销APP 1">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <CaseImage alt="" className="absolute h-[100.05%] left-0 max-w-none top-[-0.03%] w-full" src={imgApp1} />
      </div>
    </div>
  );
}
