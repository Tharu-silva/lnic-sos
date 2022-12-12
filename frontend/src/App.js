import { Graph } from "react-d3-graph";
import { getGraph } from "./sdk/read";
import { createPlatformNode, createSystemNode } from "./sdk/create";
import { deleteSystemNode } from "./sdk/delete";

import React from "react";
import { useState, useEffect } from "react";
import classNames from "classnames";

export default function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState({});
  const [text, setText] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    getGraph().then((res) => {
      setData(res);
    });
  }, []);

  const getLabel = function (node) {
    return node["labels"][1];
  };

  const myConfig = {
    nodeHighlightBehavior: true,
    directed: true,
    height: 800,
    width: 800,
    d3: {
      disableLinkForce: false,
      gravity: -300,
      alphaTarget: 1,
    },
    node: {
      labelProperty: getLabel,
      color: "green",
      size: 600,
      highlightStrokeColor: "blue",
    },
    link: {
      highlightColor: "black",
    },
  };

  const onClickNode = function (nodeId, node) {
    // window.alert(`Clicked node ${node["labels"][1]}, ${getLabel(node)}`);
    const labels = node["labels"];

    if (labels.includes("PLATFORM")) {
      setIsHidden(false);
      setText(
        `Clicked node (ID: ${nodeId}) is a Platform - creating a system node that references that platform node`
      );
      createSystemNode(nodeId);
    } else if (labels.includes("SYSTEM")) {
      setIsHidden(false);
      setText(
        `Clicked node (ID: ${nodeId}) is a System - deleting that system node`
      );
      deleteSystemNode(nodeId);
    } else {
      setIsHidden(false);
      setText(
        `Clicked node (ID: ${nodeId}) is a ${getLabel(node)} - no action taken`
      );
    }
  };

  const onClickLink = function (source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
  };

  return (
    <div className="App">
      <div
        className={classNames(
          "absolute top-8 left-8 w-1/4 rounded-xl bg-slate-100 p-4 flex flex-col gap-4",
          isHidden ? "hidden" : ""
        )}
      >
        <p>{text}</p>

        <button
          className="m-auto border px-4 py-2 rounded-md bg-white"
          onClick={() => {
            getGraph().then((res) => {
              setData(res);
            });
            setIsHidden(true);
          }}
        >
          Confirm
        </button>
      </div>

      <div className="m-auto flex flex-col w-[800px]">
        <h1 className="text-6xl m-8">SoS M&A Feature Demo</h1>
        <p className="mx-8">
          Work in progress. Features will be merged into the main interface once
          approved.
        </p>
        <Graph
          id="graph-id"
          data={data}
          config={myConfig}
          onClickNode={onClickNode}
          onClickLink={onClickLink}
        />

        <div className="flex">
          <button
            className="m-auto border px-4 py-2 border-r"
            onClick={() => {
              setCount(count + 1);
              createPlatformNode();
            }}
          >
            Create Platform Node
          </button>
          <button
            className="m-auto border px-4 py-2 border-r"
            onClick={() => {
              getGraph().then((res) => {
                setData(res);
              });
            }}
          >
            Render
          </button>
        </div>
      </div>
    </div>
  );
}

// ok so in summary. There is 1 button at the bottom that says "Create Platform" This call the createPlatformNode method

// When a platform node is clicked on an option comes up to create a system node that references that platform node. This calls the createSystemNode method with the parameter of the ID of the platform the click happened

// When a system node is clicked an option comes up to delete it. This calls the deleteSystemNode method with a parameter of the node where the click happened
