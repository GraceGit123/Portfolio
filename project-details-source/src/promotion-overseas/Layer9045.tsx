import CaseImage from '../CaseImage'
const assetPathPrefix = `${import.meta.env.BASE_URL}assets/promotion-overseas`;
const imgMyPromotion11 = `${assetPathPrefix}/18c22.png`;

export default function MyPromotion11() {
  return (
    <div className="border-4 border-[#dee6ff] border-solid overflow-clip relative rounded-[8px] size-full" data-node-id="19:9045" data-name="My promotion-抽屉1 1">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[8px]">
        <CaseImage alt="海外 PC 已参与促销列表和详情抽屉" className="absolute h-[100.11%] left-0 max-w-none top-0 w-full" src={imgMyPromotion11} />
      </div>
    </div>
  );
}
