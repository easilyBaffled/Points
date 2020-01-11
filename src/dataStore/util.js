import _ from "lodash";

export const applyDB = (actors, targets) =>
  _.reduce(
    actors,
    (acc, func, name) => ({
      ...acc,
      [name]: (...args) => {
        const res = func(...args);
        targets[name](res);
        return res;
      }
    }),
    {}
  );

export const dbActions = targetDb =>
  _.mapValues(
    {
      create: doc =>
        targetDb
          .add({ createdAt: Date.now(), ...doc })
          .then(ref => ref.get())
          .then(doc => doc.data()),
      get: () => targetDb.get().then(getDocsFromSnapshot),
      remove: path => targetDb.doc(path).delete(),
      update: (path, body) =>
        targetDb
          .doc(path)
          .set(body)
          .then(ref => ref.get())
          .then(doc => doc.data())
    },
    fn => limitCalls(promiseDebugHelpers(fn))
  );

function getDataFromDoc(doc) {
  return { ...doc.data(), id: doc.id };
}

export function getDocsFromSnapshot(snapshot) {
  const docs = {};
  console.log(snapshot);
  snapshot.forEach(doc => {
    docs[doc.id] = getDataFromDoc(doc);
  });
  return docs;
}

export const promiseDebugHelpers = promiseFn => (...args) =>
  promiseFn(...args)
    .then(res => {
      console.log(
        `%c\`${promiseFn.name}\` was successful.`,
        "background: forestgreen; color: white; padding: 6px; border-radius: 6px;"
      );
      return res;
    })
    .catch(e => {
      let cache = [];
      e.message = JSON.stringify(
        {
          name: promiseFn.name,
          // args,
          ErrorMessage: e.message
        },
        function(key, value) {
          if (typeof value === "object" && value !== null) {
            if (cache.indexOf(value) !== -1) {
              // Duplicate reference found, discard key
              return;
            }
            // Store value in our collection
            cache.push(value);
          }
          return value;
        },
        4
      );
      cache = null;
      throw e;
    });

export function limitCalls(fn, limit = 20) {
  let calls = 0;
  return (...args) => {
    calls++;
    if (calls > limit) {
      throw new Error(
        `EASY THERE: You've called "${fn.name}" too many times too quickly, did you forget the second argument to useEffect? Also, this is a message from React Training, not React.`
      );
    } else {
      setTimeout(() => (calls = 0), 3000);
    }
    return fn(...args);
  };
}
