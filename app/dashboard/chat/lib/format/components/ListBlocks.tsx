import React, { useState } from "react";
import { renderInline } from "../utils/inlineRenderer";

// ==========================================
// 🚀 INTERACTIVE CHECKLIST ITEM COMPONENT
// ==========================================
export const InteractiveChecklistItem = React.memo(function InteractiveChecklistItem({ item, idx }: { item: { text: string; checked: boolean }; idx: number }) {
  const [isChecked, setIsChecked] = useState(item.checked);

  React.useEffect(() => {
    setIsChecked(item.checked);
  }, [item.checked]);

  return (
    <div className="flex items-start gap-4 text-[var(--nira-text)] group py-2 px-3 rounded-xl hover:bg-[var(--nira-text)]/[0.02] transition-colors duration-200">
      <button
        onClick={() => setIsChecked(!isChecked)}
        className="
          relative flex items-center justify-center w-[20px] h-[20px] rounded-[6px] 
          border border-[var(--nira-border)] bg-[var(--nira-surface)] 
          hover:border-[var(--nira-accent)]/60 hover:bg-[var(--nira-accent)]/10
          transition-all duration-200 mt-[5px] shrink-0 select-none
          group-hover:scale-105 active:scale-95 cursor-pointer shadow-sm
        "
      >
        {isChecked && (
          <div className="absolute inset-0 rounded-[5px] bg-[var(--nira-accent)] flex items-center justify-center shadow-sm animate-premium-scale">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-[12px] h-[12px] text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
        )}
      </button>
      
      <span 
        className={`
          leading-[1.6] text-[17px] transition-all duration-300 select-text tracking-[-0.018em] antialiased [text-rendering:optimizeLegibility] [text-shadow:none_!important]
          ${isChecked ? "line-through text-[var(--nira-subtext)] opacity-70 font-[400]" : "text-[var(--nira-text)] font-[400]"}
        `}
      >
        {renderInline(item.text || "")}
      </span>
    </div>
  );
});

export interface ExtendedListItem {
  text: string;
  index?: number;
  children?: ExtendedListItem[];
}

// ==========================================
// 🚀 DYNAMIC NESTED LIST COMPONENT (PREMIUM)
// ==========================================
export const renderList = (items: ExtendedListItem[], ordered = false, level = 0, startOffset = 0) => {
  if (!items || !items.length) return null;
  const start = ordered ? (startOffset + 1) : 1;
  const ListTag = ordered ? "ol" : "ul";

  return (
    <ListTag
      start={ordered ? start : undefined}
      className={`
        list-none
        ${level === 0 ? "my-6" : "mt-3"}
        space-y-4
        text-[var(--nira-text)]
        w-full
      `}
    >
      {items.map((item, idx) => {
        const text = typeof item === "string" ? item : item.text;
        const isChildOrdered = item.children?.some((c: any) => c.index !== undefined);
        
        const itemKey = `list-item-${level}-${idx}-${item.index ?? "u"}`;

        return (
          <li key={itemKey} className="group flex flex-col w-full">
            <div className="flex gap-4 items-start w-full">
              <span
                className="
                  shrink-0 flex items-center justify-center
                  w-6 h-7 text-[var(--nira-subtext)] font-semibold text-[15px] mt-[1.5px] select-none
                "
              >
                {ordered ? (
                  <span className="text-[var(--nira-subtext)] font-semibold font-mono">{(start + idx)}.</span>
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--nira-text)] opacity-60" />
                )}
              </span>

              <div className="flex-1 min-w-0 pt-[1.5px]">
                <span className="block leading-[1.6] text-[var(--nira-text)] font-[400] text-[17px] tracking-[-0.018em] antialiased [text-rendering:optimizeLegibility] [text-shadow:none_!important]">
                  {renderInline(text || "")}
                </span>

                {item.children && item.children.length > 0 && (
                  <div className="mt-3 border-l border-[var(--nira-border)] pl-6 ml-[-15px] transition-colors duration-300 hover:border-[var(--nira-accent)]/40 w-full">
                    {renderList(item.children, isChildOrdered, level + 1)}
                  </div>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ListTag>
  );
};
