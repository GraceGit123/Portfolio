import CaseImage from '../CaseImage'
const assetPathPrefix = `${import.meta.env.BASE_URL}assets`;
const imgPolygon1 = `${assetPathPrefix}/76195.svg`;

export default function Polygon1() {
  return (
    <div className="relative size-full" data-node-id="1:92">
      <div className="absolute inset-[5.53%_0_0_0]">
        <CaseImage alt="" className="block max-w-none size-full" src={imgPolygon1} />
      </div>
    </div>
  );
}
