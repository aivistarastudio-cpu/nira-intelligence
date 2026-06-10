import React from "react";
import { blockSpacing } from "../utils/typography";
import { renderInline } from "../utils/inlineRenderer";

export const TableBlock = React.memo(function TableBlock({ block }: { block: any }) {
  return (
    <div className={`${blockSpacing} w-full rounded-[24px] border border-[var(--nira-border)] bg-[var(--nira-surface)] overflow-hidden animate-premium-fade group/table shadow-sm`}>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-body border-collapse text-left">
          <thead className="border-b border-[var(--nira-border)] select-none">
            <tr>
              {block.headers?.map((header: string, idx: number) => (
                <th
                  key={`th-${idx}`}
                  className="px-6 py-4 text-left font-sans text-[14px] font-[600] tracking-[0.08em] uppercase text-[var(--nira-subtext)]"
                >
                  {renderInline(header || "")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--nira-border)]/50">
            {block.rows?.map((row: string[], rIdx: number) => (
              <tr
                key={`tr-${rIdx}`}
                className="hover:bg-[var(--nira-text)]/[0.04] transition-colors duration-300"
              >
                {row.map((cell: string, cIdx: number) => (
                  <td
                    key={`td-${rIdx}-${cIdx}`}
                    className="px-6 py-4 font-sans text-[16px] font-[450] leading-[1.7] text-[var(--nira-text)]"
                  >
                    {renderInline(cell || "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
