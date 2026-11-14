const rules = [
  ['基础促销', '面向全用户客群及全场景，灵活选择房型及日期，快速管理促销价格'],
  ['客群促销', '客群促销择最优折扣生效；与基础促销进行折扣叠加'],
  ['红包促销', '红包促销同时触发时，择优生效；与其他种类促销可叠加使用'],
]

export default function PromotionRuleCards() {
  return <div className="flex gap-[20px] items-center w-full" data-node-id="1:456">
    {rules.map(([title, copy]) => <div key={title} className="bg-[#f5f5f5] flex-1 h-[44px] min-w-0 rounded-[8px] shadow-[0px_0px_20px_0px_rgba(48,74,141,0.2)] flex flex-col justify-center px-[9px] text-[#222]">
      <p className="text-[11px] [font-weight:700] leading-[15px]">{title}</p>
      <p className="text-[7px] leading-[12px] text-[#666]">{copy}</p>
    </div>)}
  </div>
}
