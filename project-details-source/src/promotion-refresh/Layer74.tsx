import CaseImage from '../CaseImage'
const assetPathPrefix = `${import.meta.env.BASE_URL}assets`;
const img1 = `${assetPathPrefix}/cbdfc.png`;

export default function Component1() {
  return (
    <div className="relative size-full" data-node-id="1:74" data-name="封面无 1">
      <CaseImage alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img1} />
    </div>
  );
}
