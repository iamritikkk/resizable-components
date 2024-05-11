import { Button } from "@/components/ui/button";
import { Resizable } from "re-resizable";
import React from "react";

const screenWidth = window.innerWidth - 10;
const screenHeight = window.innerHeight - 10;

const resizableStyle = {
  borderWidth: "1px",
  borderColor: "black",
  borderStyle: "solid",
  margin: "2px",
};

const App = () => {
  const [size1, setSize1] = React.useState({
    width: screenWidth / 2,
    height: screenHeight / 2,
  });

  const [size2, setSize2] = React.useState({
    width: screenWidth / 2,
    height: screenHeight / 2,
  });

  const [size3, setSize3] = React.useState({
    width: screenWidth,
    height: screenHeight / 2,
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
        }}
      >
        <Resizable
          size={size1}
          style={{
            ...resizableStyle,
          }}
          onResize={(event, direction, elementRef, delta) => {
            const height = parseInt(elementRef.style.height.replace("px", ""));
            const width = parseInt(elementRef.style.width.replace("px", ""));
            if (height + size1.height > screenHeight) {
              setSize3((prev) => {
                const newHeight = screenHeight - height;
                return {
                  width: prev.width,
                  height: newHeight,
                };
              });
            }
            if (width + size2.width > screenWidth) {
              setSize2((prev) => {
                const newWidth = screenWidth - width;
                return {
                  width: newWidth,
                  height: prev.height,
                };
              });
            } else if (size2.width + width < screenWidth) {
              setSize2((prev) => {
                const newWidth = screenWidth - width;
                return {
                  width: newWidth,
                  height: prev.height,
                };
              });
            }
            setSize1({
              width,
              height,
            });
          }}
        ></Resizable>
        <Resizable
          size={size2}
          style={{
            ...resizableStyle,
          }}
          onResize={(event, direction, elementRef, delta) => {
            const height = parseInt(elementRef.style.height.replace("px", ""));
            const width = parseInt(elementRef.style.width.replace("px", ""));
            if (height + size2.height > screenHeight) {
              setSize3((prev) => {
                const newHeight = screenHeight - height;
                return {
                  width: prev.width,
                  height: newHeight,
                };
              });
            }
            if (width + size1.width > screenWidth) {
              setSize1((prev) => {
                const newWidth = screenWidth - width;
                return {
                  width: newWidth,
                  height: prev.height,
                };
              });
            } else if (size1.width + width < screenWidth) {
              setSize1((prev) => {
                const newWidth = screenWidth - width;
                return {
                  width: newWidth,
                  height: prev.height,
                };
              });
            }
            setSize2({
              width,
              height,
            });
          }}
        ></Resizable>
      </div>
      <Resizable
        size={size3}
        style={{
          ...resizableStyle,
        }}
        onResize={(event, direction, elementRef, delta) => {
          const width = parseInt(elementRef.style.width.replace("px", ""));
          const height = parseInt(elementRef.style.height.replace("px", ""));
          if (direction === "top" || direction === "bottom") {
            if (
              height + size1.height > screenHeight ||
              height + size2.height > screenHeight
            ) {
              const newHeight = screenHeight - height;
              if (size1.height > size2.height) {
                setSize1((prev) => {
                  return {
                    width: prev.width,
                    height: newHeight,
                  };
                });
              } else if (size2.height > size1.height) {
                setSize2((prev) => {
                  return {
                    width: prev.width,
                    height: newHeight,
                  };
                });
              } else if (size1.height === size2.height) {
                setSize1((prev) => {
                  return {
                    width: prev.width,
                    height: newHeight,
                  };
                });
                setSize2((prev) => {
                  return {
                    width: prev.width,
                    height: newHeight,
                  };
                });
              }
            } else if (
              height + size1.height < screenHeight ||
              height + size2.height < screenHeight
            ) {
              const newHeight = screenHeight - height;
              if (size1.height > size2.height) {
                setSize1((prev) => {
                  return {
                    width: prev.width,
                    height: newHeight,
                  };
                });
              } else if (size2.height > size1.height) {
                setSize2((prev) => {
                  return {
                    width: prev.width,
                    height: newHeight,
                  };
                });
              } else if (size1.height === size2.height) {
                setSize1((prev) => {
                  return {
                    width: prev.width,
                    height: newHeight,
                  };
                });
                setSize2((prev) => {
                  return {
                    width: prev.width,
                    height: newHeight,
                  };
                });
              }
            }
          }
          setSize3({
            width,
            height,
          });
        }}
      ></Resizable>
    </>
  );
};

export default App;
