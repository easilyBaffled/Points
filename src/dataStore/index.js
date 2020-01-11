import {
  dbActions,
  getDocsFromSnapshot,
  limitCalls,
  promiseDebugHelpers
} from "./util";
import { db } from "./config";
import _ from "lodash";

export const tasks = db.collection("tasks");
export const bank = db.collection("bank");
export const rewards = db.collection("rewards");

export const tasksDb = dbActions(tasks);
export const bankDb = dbActions(bank);
export const rewardsDb = dbActions(rewards);

export { applyDB } from "./util";
export { clearCache } from "./config";

export default {};

const actionMapper = _.mapValues(
  {
    create: (db, payload) =>
      db.set({ createdAt: Date.now(), ...payload }).then(writeResult => {
        console.log(`Document written`, writeResult);
      }),
    remove: db => db.delete(),
    update: (db, payload) =>
      db.update(payload).then(writeResult => {
        console.log(`Document written`, writeResult);
      }),
    // .then(doc => doc.data()),
    array: () => console.warn("still no error updates")
  },
  fn => limitCalls(promiseDebugHelpers(fn))
);

export const fromCommand = ({ action, path, payload }) =>
  actionMapper[action](db.doc(path), payload);
