import CaseImage from '../CaseImage'
const assetPathPrefix = `${import.meta.env.BASE_URL}assets/promotion-overseas`;
const img5 = `${assetPathPrefix}/23aeb.png`;

export default function Component5() {
  return (
    <div className="border-4 border-[#dee6ff] border-solid overflow-clip relative rounded-[8px] size-full" data-node-id="19:9042" data-name="促销设置 5">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[8px]">
        <CaseImage alt="" className="absolute h-[100.05%] left-0 max-w-none top-0 w-full" src={img5} />
      </div>
    </div>
  );
}
