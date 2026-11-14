import CaseImage from '../CaseImage'
const assetPathPrefix = `${import.meta.env.BASE_URL}assets`;
const imgVector = `${assetPathPrefix}/61f23.svg`;

export default function Group1() {
  return (
    <div className="contents relative size-full" data-node-id="1:2896">
      <div className="absolute content-stretch flex gap-[240px] items-center left-[80px] pr-[80px] top-[4536px] w-[1520px]" data-node-id="1:2897">
        <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-normal gap-[4px] items-start leading-[normal] min-w-px relative" data-node-id="1:2898">
          <p className="font-['Inter:Regular'] not-italic relative shrink-0 text-[#8fa7ff] text-[11px] w-full" data-node-id="1:2899">
            EXPERIENCE GOALS
          </p>
          <p className="font-['Noto_Sans_SC:Regular'] relative shrink-0 text-[24px] text-white w-full" data-node-id="1:2900">
            体验目标
          </p>
        </div>
        <div className="content-stretch flex flex-[1_0_0] gap-[25px] items-center min-w-px relative" data-node-id="1:2901">
          <div className="h-[36px] relative shrink-0 w-[1.159px]" data-node-id="1:2902" data-name="Vector">
            <CaseImage alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector} />
          </div>
          <div className="[word-break:break-word] content-stretch flex font-normal gap-[16px] items-center leading-[normal] relative shrink-0" data-node-id="1:2903">
            <p className="font-['Inter:Regular'] not-italic relative shrink-0 text-[#8fa7ff] text-[14px] w-[18.537px]" data-node-id="1:2904">
              01
            </p>
            <p className="font-['Noto_Sans_SC:Regular'] relative shrink-0 text-[24px] text-white whitespace-nowrap" data-node-id="1:2905">
              更易理解
            </p>
          </div>
        </div>
        <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] font-normal gap-[14px] items-center leading-[normal] min-w-px relative" data-node-id="1:2906">
          <p className="font-['Inter:Regular'] not-italic relative shrink-0 text-[#8fa7ff] text-[14px] w-[20.854px]" data-node-id="1:2907">
            02
          </p>
          <p className="font-['Noto_Sans_SC:Regular'] relative shrink-0 text-[24px] text-white whitespace-nowrap" data-node-id="1:2908">
            更可控的操作
          </p>
        </div>
        <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] font-normal gap-[14px] items-center leading-[normal] min-w-px relative" data-node-id="1:2909">
          <p className="font-['Inter:Regular'] not-italic relative shrink-0 text-[#8fa7ff] text-[14px] w-[20.854px]" data-node-id="1:2910">
            03
          </p>
          <p className="font-['Noto_Sans_SC:Regular'] relative shrink-0 text-[24px] text-white whitespace-nowrap" data-node-id="1:2911">
            更优的体验
          </p>
        </div>
      </div>
    </div>
  );
}
