// Getters
const getTodoInput = () => cy.get("input");
const getSubmitButton = () => cy.get("button").contains("Add Todo");
const getFilters = () => cy.get("p").children();
const getViewAllFilter = () => getFilters().contains("All");
const getActiveFilter = () => getFilters().contains("Active");
const getCompletedFilter = () => getFilters().contains("Completed");
const getTodoList = () => cy.get("ul");
const getTodoListItems = () => cy.get("ul").children();
const getTodoItem = label => getTodoList().contains(label);
// Actions
const takeSnapshot = () => cy.get("#root").snapshot("rendered");
const enterText = (text = "test") => getTodoInput().type(text);
const submitTodo = () => getSubmitButton().click();
const createTodo = text => {
  enterText(text);
  submitTodo();
};
const toggleTodoItem = text => getTodoItem(text).click();
const selectViewAllFilter = () => getViewAllFilter().click();
const selectActiveFilter = () => getActiveFilter().click();
const selectCompleteedFilter = () => getCompletedFilter().click();
// Assertions
const confirmItemIsDone = [
  "have.css",
  "text-decoration",
  "line-through solid rgb(0, 0, 0)"
];

describe("App", () => {
  describe("Render", () => {
    it("should render without a problem", () => {
      cy.visit("http://localhost:3000/");
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
        selectCompleteedFilter();
        getTodoListItems().should("have.length", 1);
        takeSnapshot("Completed Filter");
      });
      it("`All` should show all todo", () => {
        selectViewAllFilter();
        getTodoListItems().should("have.length", 2);
        takeSnapshot("All Filter");
      });
    });
  });
});
