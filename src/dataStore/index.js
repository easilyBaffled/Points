import { dbActions, getDocsFromSnapshot } from "./util";
import { db } from "./config";

export const tasks = db.collection("tasks");

export const tasksDb = dbActions(tasks);

export { applyDB } from "./util";
export { clearCache } from "./config";

export default {};

const actionMapper = {
  create: (db, payload) =>
    db
      .add({ createdAt: Date.now(), ...payload })
      .then(ref => ref.get())
      .then(doc => doc.data()),
  remove: db => db.delete(),
  update: (db, payload) =>
    db
      .set(payload)
      .then(ref => ref.get())
      .then(doc => doc.data())
};

const fromCommand = ({ action, path, payload }) =>
  actionMapper[action](db.doc(path), payload);
