import CaseImage from '../CaseImage'
const assetPathPrefix = `${import.meta.env.BASE_URL}assets`;
const imgEllipse60 = `${assetPathPrefix}/de9ad.svg`;

export default function Ellipse60() {
  return (
    <div className="relative size-full" data-node-id="1:77">
      <div className="absolute inset-[-81.74%]">
        <CaseImage alt="" className="block max-w-none size-full" src={imgEllipse60} />
      </div>
    </div>
  );
}
