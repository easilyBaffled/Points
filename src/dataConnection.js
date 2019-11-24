import _ from "lodash";
const getLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("state") || {});
  } catch (e) {
    e.message = JSON.stringify(
      { loadedState: localStorage.getItem("state"), ErrorMessage: e.message },
      null,
      4
    );

    console.error(e);
    return undefined;
  }
};

export const get = _.debounce(() => Promise.resolve(getLocalStorage()), 500, {
  leading: true,
  trailing: false
});

export const save = _.debounce(
  state =>
    Promise.resolve(localStorage.setItem("state", JSON.stringify(state))),
  500
);
