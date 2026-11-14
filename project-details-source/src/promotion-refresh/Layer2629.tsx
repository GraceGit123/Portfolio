import CaseImage from '../CaseImage'
const assetPathPrefix = `${import.meta.env.BASE_URL}assets`;
const imgVector180 = `${assetPathPrefix}/96997.svg`;

export default function Vector180() {
  return (
    <div className="relative size-full" data-node-id="1:2629">
      <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector180} />
    </div>
  );
}
