import CaseImage from '../CaseImage'
const assetPathPrefix = `${import.meta.env.BASE_URL}assets`;
const imgEllipse20 = `${assetPathPrefix}/e635b.svg`;

export default function Ellipse20() {
  return (
    <div className="relative size-full" data-node-id="1:140">
      <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse20} />
    </div>
  );
}
