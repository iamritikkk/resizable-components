import { Button } from "@/components/ui/button";
import { Resizable } from "re-resizable";
import React, { useEffect } from "react";
import axios from "axios";
import toast, { toastConfig } from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";

toastConfig({ theme: "dark" });
const screenWidth = window.innerWidth - 10;
const screenHeight = window.innerHeight - 10;

const resizableStyle: any = {
  borderWidth: "1px",
  borderColor: "black",
  borderStyle: "solid",
  margin: "2px",
  display: "flex",
  justifyContent: "end",
  alignItems: "end",
  position: "relative",
};

const inputStyle: any = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
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

  const [input1, setInput1] = React.useState("");

  const [input2, setInput2] = React.useState("");

  const [input3, setInput3] = React.useState("");

  const [data, setData] = React.useState([]);

  const [disableAddBtn, setDisableAddBtn] = React.useState(false);

  const [disableUpdateBtn, setDisableUpdateBtn] = React.useState(false);

  const [postcount, setPostCount] = React.useState(0);

  const [putcount, setPutCount] = React.useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = (
          await axios.get(
            "https://api.demo.ritikchauhan.meanii.dev/api/v1/resizable"
          )
        )?.data;

        console.log({ response });

        response.data.map((item) => {
          if (item.componentId === 1) {
            setInput1(item.content);
          } else if (item.componentId === 2) {
            setInput2(item.content);
          } else if (item.componentId === 3) {
            setInput3(item.content);
          }
        });

        setData(response.data);

        const count = (
          await axios.get(
            "https://api.demo.ritikchauhan.meanii.dev/api/v1/resizable/count"
          )
        ).data;
        console.log(count.data);
        count.data.map((item) => {
          console.log(item.count);
          if (item._id === "POST") {
            setPostCount(item.count);
          } else if (item._id === "PUT") {
            setPutCount(item.count);
          }
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const addContent = async (inputData: string, id) => {
    try {
      // Disable the add button while processing
      setDisableAddBtn(true);
      const setInput = id === 1 ? setInput1 : id === 2 ? setInput2 : setInput3;

      // Clear input based on id

      setInput("");

      // Check if inputData is empty
      if (inputData === "") {
        // Re-enable the add button after 2 seconds
        setTimeout(() => {
          setDisableAddBtn(false);
        }, 2000);
        // Show toast message
        return toast("Please enter some text to add");
      }

      // Map id to setInput function

      // Make API call to add content
      // also send id to the API
      const response = (
        await axios.post(
          "https://api.demo.ritikchauhan.meanii.dev/api/v1/resizable",
          {
            content: inputData,
            componentId: id,
          }
        )
      )?.data;
      console.log(response);

      if (response.status === "created") {
        console.log("Content added successfully");
        if (id === 1) {
          setInput1(inputData);
        } else if (id === 2) {
          setInput2(inputData);
        } else if (id === 3) {
          setInput3(inputData);
        }
      }
      // Re-enable the add button after API call
      setDisableAddBtn(false);
    } catch (error) {
      // Re-enable the add button in case of error
      setDisableAddBtn(false);
      console.error(error);
    }
  };

  const updateContent = async (inputData: string, id: number) => {
    try {
      // Disable the update button while processing
      setDisableUpdateBtn(true);

      // Check if inputData is empty
      if (inputData === "") {
        // Re-enable the update button after 2 seconds
        setTimeout(() => {
          setDisableUpdateBtn(false);
        }, 2000);
        // Show toast message
        return toast("Please enter some text to update");
      }

      // Make sure id is valid
      if (id < 1 || id > 3) {
        return toast("Invalid id");
      }

      // Make the PUT request to update content
      const response = await axios.put(
        `https://api.demo.ritikchauhan.meanii.dev/api/v1/resizable/${id}`,
        { content: inputData }
      );

      // Re-enable the update button after the request
      setDisableUpdateBtn(false);
    } catch (error) {
      // Re-enable the update button in case of error
      setDisableUpdateBtn(false);
      console.error(error);
    }
  };

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
        >
          <input
            style={inputStyle}
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            placeholder="Type here..."
          />
          <Button
            style={{
              marginBottom: 5,
              marginRight: 5,
              position: "relative",
              bottom: 0,
              right: 0,
            }}
            disabled={disableAddBtn}
            onClick={() => addContent(input1, 1)}
          >
            Add
          </Button>

          <Button
            style={{
              marginBottom: 5,
              marginRight: 5,
              position: "relative",
              bottom: 0,
              right: 0,
            }}
            disabled={disableUpdateBtn}
            onClick={() => updateContent(input1, 1)}
          >
            Update
          </Button>
        </Resizable>
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
        >
          <input
            style={inputStyle}
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            placeholder="Type here..."
          />
          <Button
            style={{
              marginBottom: 5,
              marginRight: 5,
              position: "relative",
              bottom: 0,
              right: 0,
            }}
            onClick={() => addContent(input2, 2)}
          >
            Add
          </Button>
          <Button
            onClick={() => updateContent(input2, 2)}
            style={{
              marginBottom: 5,
              marginRight: 5,
              position: "relative",
              bottom: 0,
              right: 0,
            }}
          >
            Update
          </Button>
        </Resizable>
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
      >
        <input
          style={inputStyle}
          value={input3}
          onChange={(e) => setInput3(e.target.value)}
          placeholder="Type here..."
        />
        <Button
          style={{
            marginBottom: 5,
            marginRight: 5,
            position: "relative",
            bottom: 0,
            right: 0,
          }}
          onClick={() => addContent(input3, 3)}
        >
          Add
        </Button>
        <Button
          style={{
            marginBottom: 5,
            marginRight: 5,
            position: "relative",
            bottom: 0,
            right: 0,
          }}
          onClick={() => updateContent(input3, 3)}
        >
          Update
        </Button>
      </Resizable>

      <div>
        <h3>Total POST calls made by user: {postcount}</h3>
        <h3>Total PUT calls made by user: {putcount}</h3>
      </div>
    </>
  );
};

export default App;
