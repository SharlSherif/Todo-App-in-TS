import Main from "../src/app";

test("Save Todo in Memory", () => {
  const operation = new Main();
  const prevTodoLength = operation.storedTodos.length;

  operation.saveInMemory(
    "todo title for testing",
    "todo description for testing"
  );

  expect(operation.storedTodos.length).toBeGreaterThan(prevTodoLength);
});

test("Find Todo by title", () => {
  const testArrayData = [
    {
      id: 1,
      title: "todo title one",
      description: "todo description one",
      date: new Date(),
    },
  ];
  const operation = new Main(testArrayData);

  const result = operation.findByTitle("todo title one");

  expect(result).toHaveProperty("id");
  expect(result).toHaveProperty("title");
  expect(result).toHaveProperty("description");
  expect(result).toHaveProperty("date");
});

test("Todo ID Generator", () => {
  const operation = new Main();
  const newID = operation.generateID();
  const latestTodoID = operation.getLastTodo().id;

  expect(newID).toBeGreaterThan(latestTodoID);
});

test("Delete Todo by ID", () => {
  const testArrayData = [
    {
      id: 1,
      title: "todo title one",
      description: "todo description one",
      date: new Date(),
    },
  ];
  const operation = new Main(testArrayData);

  expect(operation.deleteFromMemory(1)).toEqual("Deleted");
});