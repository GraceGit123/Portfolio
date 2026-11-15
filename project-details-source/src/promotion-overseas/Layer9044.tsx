import CaseImage from '../CaseImage'
const assetPathPrefix = `${import.meta.env.BASE_URL}assets/promotion-overseas`;
const imgLog1 = `${assetPathPrefix}/804d0.png`;

export default function Log1() {
  return (
    <div className="border-4 border-[#dee6ff] border-solid overflow-clip relative rounded-[8px] size-full" data-node-id="19:9044" data-name="Log-收起展开备份 1">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[8px]">
        <CaseImage alt="" className="absolute left-0 max-w-none size-full top-0" src={imgLog1} />
      </div>
    </div>
  );
}
