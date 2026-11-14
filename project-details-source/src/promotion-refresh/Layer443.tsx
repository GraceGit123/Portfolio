import CaseImage from '../CaseImage'
const assetPathPrefix = `${import.meta.env.BASE_URL}assets`;
const imgFrame1571 = `${assetPathPrefix}/96411.png`;

export default function Frame156() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative size-full" data-node-id="1:443">
      <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start leading-[normal] not-italic relative shrink-0 text-white w-full" data-node-id="1:444">
        <div className="content-stretch flex font-sans [font-weight:700] gap-[12px] items-center relative shrink-0 w-full" data-node-id="1:445">
          <p className="relative shrink-0 text-[28px] whitespace-nowrap" data-node-id="1:446">{`🧐 `}</p>
          <p className="flex-[1_0_0] h-[26px] min-w-px relative text-[20px]" data-node-id="1:447">
            Before
          </p>
        </div>
        <p className="font-sans [font-weight:300] relative shrink-0 text-[16px] w-full" data-node-id="1:448">
          空间浪费/筛选冗余/规则不明/C端展示不明/场景混杂
        </p>
      </div>
      <div className="h-[358px] relative shrink-0 w-[640px]" data-node-id="1:449" data-name="Frame 157 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <CaseImage alt="" className="absolute h-[99.86%] left-0 max-w-none top-0 w-[102.19%]" src={imgFrame1571} />
        </div>
      </div>
    </div>
  );
}
