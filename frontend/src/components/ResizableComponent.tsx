import React from "react";
import { Resizable } from "re-resizable";

interface ResizableComponentProps {
  size: { width: number; height: number };
  onResize: (
    event: any,
    direction: string,
    elementRef: HTMLElement,
    delta: { width: number; height: number }
  ) => void;
}

const ResizableComponent: React.FC<ResizableComponentProps> = ({
  size,
  onResize,
}) => {
  const resizableStyle = {
    borderWidth: "1px",
    borderColor: "black",
    borderStyle: "solid",
    margin: "2px",
  };

  return (
    <Resizable
      size={size}
      style={resizableStyle}
      onResize={onResize}
    ></Resizable>
  );
};

export default ResizableComponent;
