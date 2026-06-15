"use client";

import {
  Lightbulb,
  Code2,
  PenLine,
  Brain,
  FileText,
} from "lucide-react";

const prompts = [
  { icon: Lightbulb, text: "Generate ideas" },
  { icon: Code2, text: "Fix my code" },
  { icon: PenLine, text: "Write something" },
  { icon: Brain, text: "Explain this" },
  { icon: FileText, text: "Summarize this" },
];

export default function PromptSuggestions({
  onSelect,
}: {
  onSelect: (text: string) => void;
}) {
  return (
    <>
      {prompts.map((item, i) => {
        const Icon = item.icon;

        return (
          <button
            key={i}
            onClick={() => onSelect(item.text)}
            className="
              w-10 h-10
              flex items-center justify-center
              rounded-full
              bg-white/[0.05]
              text-white/70
              transition-all duration-200
              hover:bg-white/[0.1]
              hover:text-white
              active:scale-95
            "
          >
            <Icon size={17} />
          </button>
        );
      })}
    </>
  );
}