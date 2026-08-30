import { useMemo } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

function renderMath(source: string, displayMode: boolean): string {
  try {
    return katex.renderToString(source, { throwOnError: false, displayMode, output: "html" });
  } catch {
    return source;
  }
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Hiện văn bản có thể chứa công thức LaTeX: $$...$$ (khối) hoặc $...$ (nội dòng).
 * Phần còn lại hiện nguyên văn (đã escape HTML) và giữ xuống dòng.
 * Dùng cho mọi nơi hiện đề bài / đáp án do AI hoặc người dùng nhập —
 * để "$x^2 + 1$" ra thành công thức thay vì chữ thô.
 */
export default function MathText({ text, className }: { text: string; className?: string }) {
  const html = useMemo(() => {
    if (!text) return "";
    const blockSplit = text.split(/(\$\$[^$]+\$\$)/g);
    const pieces: string[] = [];

    for (const seg of blockSplit) {
      if (seg.startsWith("$$") && seg.endsWith("$$") && seg.length > 4) {
        pieces.push(renderMath(seg.slice(2, -2), true));
        continue;
      }
      const inlineSplit = seg.split(/(\$[^$\n]+\$)/g);
      for (const inlineSeg of inlineSplit) {
        if (inlineSeg.startsWith("$") && inlineSeg.endsWith("$") && inlineSeg.length > 2) {
          pieces.push(renderMath(inlineSeg.slice(1, -1), false));
        } else if (inlineSeg) {
          pieces.push(escapeHtml(inlineSeg).replace(/\n/g, "<br/>"));
        }
      }
    }
    return pieces.join("");
  }, [text]);

  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
