import CaseImage from '../CaseImage'
const assetPathPrefix = `${import.meta.env.BASE_URL}assets/promotion-overseas`;
const imgMyPromotion111 = `${assetPathPrefix}/abe6d.png`;

export default function MyPromotion111() {
  return (
    <div className="border-4 border-[#dee6ff] border-solid overflow-clip relative rounded-[8px] size-full" data-node-id="19:9047" data-name="My promotion-抽屉1-1 1">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[8px]">
        <CaseImage alt="" className="absolute h-[100.17%] left-0 max-w-none top-0 w-full" src={imgMyPromotion111} />
      </div>
    </div>
  );
}
