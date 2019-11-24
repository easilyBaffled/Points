// Getters
const getTodoInput = () => cy.get("input").first();
const getTodoValueInput = () => cy.get("input").eq(1);
const getSubmitButton = () => cy.get("button").contains("Add Todo");
const getFilters = () => cy.get("p").children();
const getViewAllFilter = () => getFilters().contains("All");
const getActiveFilter = () => getFilters().contains("Active");
const getCompletedFilter = () => getFilters().contains("Completed");
const getTodoList = () => cy.get("ul");
const getTodoListItems = () => cy.get("ul").children();
const getTodoItem = label => getTodoList().contains(label);
const getRenderedState = () => cy.get("code").first();
const getBank = () => cy.get("#bank");
// Actions
const takeSnapshot = () => cy.get("#root").snapshot("rendered");
const enterText = (text = "test") =>
  getTodoInput()
    .clear()
    .type(text);
const enterValue = (text = "test") =>
  getTodoValueInput()
    .clear()
    .type(text);
const submitTodo = () => getSubmitButton().click();
const createTodo = (text, value) => {
  enterText(text);
  if (value) enterValue(value);
  submitTodo();
};
const toggleTodoItem = text => getTodoItem(text).click();
const selectViewAllFilter = () => getViewAllFilter().click();
const selectActiveFilter = () => getActiveFilter().click();
const selectCompletedFilter = () => getCompletedFilter().click();
// Assertions
const confirmItemIsDone = [
  "have.css",
  "text-decoration",
  "line-through solid rgb(0, 0, 0)"
];
const haveValue = value => ["have.text", `: ${value}`];
const stateHasValue = (name, value) =>
  getRenderedState().contains(`"${name}": ${value}`);

describe("App", () => {
  describe("Render", () => {
    it("should render without a problem", () => {
      cy.visit("http://localhost:3000/", { timeout: 30000 });
      cy.get("#root").should("exist");
      getSubmitButton().should("exist");

      takeSnapshot();
    });
    it("should find the filters", () => {
      getFilters().should("have.length", 3);
      getFilters()
        .get("span")
        .contains("All")
        .should("exist");
    });
  });
  describe("basic actions", () => {
    it("should create a new todo item", () => {
      createTodo("test");
      getTodoList().should("exist");
      getTodoItem("test").should("exist");
      takeSnapshot("created todo");
    });
    it("item should have a default value of 1", () => {
      getTodoItem("test").contains(": 1");
    });
    it("should mark item as complete", () => {
      toggleTodoItem("test");
      getTodoItem("test").should(...confirmItemIsDone);
      takeSnapshot("mark item completed");
    });
    describe("filters", () => {
      it("`Active` should hide completed todo", () => {
        createTodo("active");
        selectActiveFilter();
        getTodoListItems().should("have.length", 1);
        takeSnapshot("Active Filter");
      });
      it("`Completed` should show completed todo", () => {
        selectCompletedFilter();
        getTodoListItems().should("have.length", 1);
        takeSnapshot("Completed Filter");
      });
      it("`All` should show all todo", () => {
        selectViewAllFilter();
        getTodoListItems().should("have.length", 2);
        takeSnapshot("All Filter");
      });
      it("should create an item with value", () => {
        createTodo("test2", 2);
        getTodoItem("test2").should("exist");
        getTodoItem("test2").contains(": 2");
      });
    });
    describe("bank", () => {
      it("should have value 1", () => {
        stateHasValue("bank", 1);
      });
    });
  });
  describe("Remote Data", () => {
    it("should maintain state on a page reload", () => {
      const state = {
        todos: [
          {
            completed: true,
            value: 1,
            id: "0-0-0-0",
            text: "a"
          }
        ],
        visibilityFilter: "SHOW_ALL",
        rewards: [],
        bank: 1
      };
      localStorage.setItem("state", JSON.stringify(state));
      cy.reload();
      getBank().contains(1);
    });
    it("should update stored state on a page reload", () => {
      const state = {
        todos: [
          {
            completed: true,
            value: 1,
            id: "0-0-0-0",
            text: "a"
          }
        ],
        visibilityFilter: "SHOW_ALL",
        rewards: [],
        bank: 1
      };
      localStorage.setItem("state", JSON.stringify(state));
      cy.reload();
      cy.wait(501);
      toggleTodoItem("a");
      cy.wait(501);
      cy.reload();
      getBank().contains(0);
    });
  });
});
