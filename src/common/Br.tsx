import React from "react";

interface BrProps {
  count: Number;
}

/**
 * 指定した回数分、改行します。
 * @param BrProps.count 改行を挿入する回数
 */
export const Br: React.FC<BrProps> = (props: BrProps) => {
  const newLineText = [];
  for (let i = 0; i < props.count; i += 1) {
    newLineText.push("\n");
  }

  return (
    <div style={{ whiteSpace: 'pre-line' }}>
      {newLineText}
    </div>
  );
};
