import deepDiff from "deep-diff";

const kindMapping = {
  N: () => "create",
  D: () => "delete",
  E: () => "update",
  A: () => "array"
};

const createCommand = (prevState, newState) => {
  const diffList = deepDiff.diff(prevState, newState);
  diffList.map(d => kindMapping[d.kind](d));
  console.log(diffList);
};

export default createCommand;
