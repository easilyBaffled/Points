import deepDiff from "deep-diff";
import _ from "lodash";

const createPath = pathArray =>
  pathArray.length === 1 ? pathArray[0] + "/only" : pathArray.join("/");

const kindMapping = {
  N: d => ({
    action: "create",
    path: createPath(d.path),
    payload: d.rhs
  }),
  D: d => ({
    action: "remove",
    path: createPath(d.path)
  }),
  E: d => ({
    action: "update",
    path: createPath(d.path.length ? _.initial(d.path) : d.path),
    payload: { [d.path.length ? _.last(d.path) : "value"]: d.rhs }
  }),
  A: () => "array"
};

const createCommand = (prevState, newState) => {
  console.group();
  console.log({ prevState: prevState, newState: newState });
  const diffList = deepDiff.diff(prevState, newState);
  console.log(diffList);
  const commandList = diffList.map(d => kindMapping[d.kind](d));

  console.log(commandList);
  console.groupEnd();
  return commandList;
};

export default createCommand;
