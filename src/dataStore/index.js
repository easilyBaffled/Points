import { dbActions } from "./util";
import { db } from "./config";

export const tasks = db.collection("tasks");

export const tasksDb = dbActions(tasks);

export { applyDB } from "./util";
export { clearCache } from "./config";

export default {};
