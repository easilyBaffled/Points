import deepDiff from "deep-diff";

const kindMapping = {
  N: d => ({
    action: "add",
    path: d.path.join("/"),
    payload: d.rhs
  }),
  D: d => ({
    action: "delete",
    path: d.path.join("/")
  }),
  E: d => ({
    action: "set",
    path: d.path.split(0, -1).join("/"),
    payload: { [d.path.split(-1)]: d.rhs }
  }),
  A: () => "array"
};

const createCommand = (prevState, newState) => {
  const diffList = deepDiff.diff(prevState, newState);
  console.log(diffList);
  return diffList.map(d => kindMapping[d.kind](d));
};

export default createCommand;
