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
  const docs = [];
  snapshot.forEach(doc => {
    docs.push(getDataFromDoc(doc));
  });
  return docs;
}

const promiseDebugHelpers = promiseFn => (...args) =>
  promiseFn(...args)
    .then(res => {
      console.log(
        `%c\`${promiseFn.name}\` was successful${ args.length ? `with ${JSON.stringify(
          args,
          null,
          4
        )}`: '!' }`
        ,
        "background: forestgreen; color: white; padding: 6px; border-radius: 6px;"
      );
      return res;
    })
    .catch(e => {
      e.message = JSON.stringify({
        name: promiseFn.name,
        args,
        ErrorMessage: e.message
      });
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
