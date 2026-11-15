import CaseImage from '../CaseImage'
const assetPathPrefix = `${import.meta.env.BASE_URL}assets/promotion-overseas`;
const img1 = `${assetPathPrefix}/68d03.png`;

export default function Component1() {
  return (
    <div className="relative size-full" data-node-id="19:9054" data-name="已选时间-可以保存 1">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <CaseImage alt="" className="absolute h-[100.02%] left-0 max-w-none top-0 w-full" src={img1} />
      </div>
    </div>
  );
}
