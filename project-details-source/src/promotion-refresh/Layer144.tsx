import CaseImage from '../CaseImage'
const assetPathPrefix = `${import.meta.env.BASE_URL}assets`;
const imgEllipse22 = `${assetPathPrefix}/e4b2e.svg`;

export default function Ellipse22() {
  return (
    <div className="relative size-full" data-node-id="1:144">
      <div className="absolute inset-[-8.62%_-4.31%]">
        <CaseImage alt="" className="block max-w-none size-full" src={imgEllipse22} />
      </div>
    </div>
  );
}
