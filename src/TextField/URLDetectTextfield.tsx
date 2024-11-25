import React, { useRef, useEffect, useState } from 'react';

interface StyledTextFieldProps {
  type?: string;
  multiline?: boolean;
  maxRows?: number;
  rows?: number;
  disabled?: boolean;
  error?: boolean;
  errorBorder?: string;
  border?: string;
  borderRadius?: string;
  borderBottom?: string;
  backgroundColor?: string;
  hovered_backgroundColor?: string;
  vertical?: boolean;
  startAdormentComponent?: React.ReactNode;
  endAdormentComponent?: React.ReactNode;
  unit?: string;
  readOnly?: boolean;
  bold?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  color?: string;
  fontSize?: number | string;
  italic?: boolean;
  letterSpacing?: number;
  padding?: string;
  lineHeight?: string | number;
  value?: string;
  placeholder?: string;
  max?: number;
  setValue?: (value: string) => void;
  setValueNum?: (value: number) => void;
  onKeyEnterAndMeta?: () => void;
}

const URLDetectTextfield: React.FC<StyledTextFieldProps> = ({
  multiline = false,
  disabled = false,
  error = false,
  errorBorder = "1px solid red",
  border,
  borderRadius = '10px',
  borderBottom,
  backgroundColor = "#F6F6F6",
  hovered_backgroundColor = "#F6F6F6",
  maxRows = 1,
  vertical = false,
  startAdormentComponent,
  endAdormentComponent,
  unit,
  readOnly = false,
  bold = false,
  textAlign = "left",
  color,
  fontSize = 16,
  italic = false,
  letterSpacing = 1,
  padding = "8px 14px",
  lineHeight,
  value = '',
  placeholder = '',
  max,
  setValue,
  setValueNum,
  onKeyEnterAndMeta,
}) => {
  const editableRef = useRef<HTMLDivElement>(null);

  const [cursorPosition, setCursorPosition] = useState<number>(0);

  useEffect(() => {
    if (editableRef.current) {
      editableRef.current.innerText = value;
    }
  }, [value]);

  const handleInput = () => {
    if (!editableRef.current) return;
  
    const text = editableRef.current.innerText;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const html = text.replace(urlRegex, url => 
      `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">${url}</a>`
    );
  
    // Get the current selection and cursor position
    const selection = window.getSelection();
    const range = selection ? selection.getRangeAt(0) : null;
    const _cursorPosition = range ? range.startOffset : 0;
  
    // Replace the content only if it's different
    if (editableRef.current.innerHTML !== html) {
      editableRef.current.innerHTML = html;
    }
  
    // After replacing the content, ensure the cursor is within bounds
    if (range && editableRef.current.firstChild) {
      const newRange = document.createRange();
      const textNode = editableRef.current.firstChild as Text; // Assuming the first child is a text node
      const newTextLength = textNode.length; // Get the new length of the text node
  
      // Adjust the cursor position if it's out of bounds
      const adjustedPosition = Math.min(_cursorPosition, newTextLength);
      if(adjustedPosition){
        setCursorPosition(adjustedPosition);
        newRange.setStart(textNode, adjustedPosition);
        newRange.setEnd(textNode, adjustedPosition);
      }else{
        console.log(cursorPosition)
        newRange.setStart(textNode, 1);
        newRange.setEnd(textNode, 1);
      }
  
      // Only modify the selection if it's available
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    }
  
    // Pass the text value back to the parent component if necessary
    if (max && text.length > max) {
      if (setValue) setValue(text.substring(0, max));
      if (setValueNum) setValueNum(Number(text.substring(0, max)));
    } else {
      if (setValue) setValue(text);
      if (setValueNum) setValueNum(Number(text));
    }
  };
  
  


  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.metaKey && onKeyEnterAndMeta) {
      onKeyEnterAndMeta();
    }
  };

  return (
    <div 
      style={{
        backgroundColor: backgroundColor,
        borderRadius,
      }}
    >
      {startAdormentComponent && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {startAdormentComponent}
        </div>
      )}
      
      <div
        ref={editableRef}
        contentEditable={!disabled && !readOnly}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        className="focus:outline-none w-full h-full"
        style={{
          border: error ? errorBorder : border,
          borderBottom: border ? undefined : borderBottom,
          borderRadius,
          backgroundColor: backgroundColor,
          writingMode: vertical ? 'vertical-rl' : 'horizontal-tb',
          textOrientation: vertical ? 'upright' : 'mixed',
          fontWeight: bold ? "bold" : "normal",
          textAlign,
          color,
          fontSize,
          fontStyle: italic ? "italic" : "normal",
          letterSpacing,
          padding,
          lineHeight: lineHeight ?? `${(typeof fontSize === 'number' ? fontSize : parseInt(fontSize as string, 10)) + 10}px`,
          minHeight: multiline ? 'auto' : '56px',
          maxHeight: maxRows ? `${maxRows * (typeof fontSize === 'number' ? fontSize : parseInt(fontSize as string, 10)) * 1.5}px` : 'none',
          overflow: 'auto',
        }}
        role="textbox"
        aria-multiline={multiline}
      />
      
      {(endAdormentComponent || unit) && (
        <div 
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
          style={{ fontSize }}
        >
          {endAdormentComponent ?? unit}
        </div>
      )}
    </div>
  );
};

export default URLDetectTextfield;