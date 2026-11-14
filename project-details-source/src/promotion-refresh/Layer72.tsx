import CaseImage from '../CaseImage'
const assetPathPrefix = `${import.meta.env.BASE_URL}assets`;
const imgEllipse5 = `${assetPathPrefix}/0f906.svg`;

export default function Ellipse5() {
  return (
    <div className="relative size-full" data-node-id="1:72">
      <div className="absolute inset-[-36.06%]">
        <CaseImage alt="" className="block max-w-none size-full" src={imgEllipse5} />
      </div>
    </div>
  );
}
