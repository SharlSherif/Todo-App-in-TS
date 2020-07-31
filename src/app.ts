import fs from "fs";
import Todo from "../interfaces/Todo";

interface MainInterface {
  storedTodos: Array<Todo>;
}

class Helper implements MainInterface {
  storedTodos: Array<Todo>;

  constructor(storedTodos?: Array<Todo>) {
    if (storedTodos == undefined) {
      this.storedTodos = JSON.parse(fs.readFileSync("./todos.json").toString());
    } else {
      this.storedTodos = storedTodos;
    }
  }

  getLastTodo() {
    return this.storedTodos[this.storedTodos.length - 1];
  }

  generateID() {
    let id = 0;
    let latestTodo = this.storedTodos[this.storedTodos.length - 1];

    if (latestTodo !== undefined && latestTodo.id !== undefined) {
      id = latestTodo.id + 1;
    }

    return id;
  }

  deleteFromMemory(id: number) {
    for (let i = 0; i < this.storedTodos.length; i++) {
      const todo = this.storedTodos[i];

      if (todo.id == id) {
        this.storedTodos.splice(i);
        return "Deleted"
      }
    }

    return "Not found"
  }

  saveInMemory(title: string, description: string) {
    let todo: Todo = {
      id: this.generateID(),
      title,
      description,
      date: new Date(),
    };

    // add to array in memory
    this.storedTodos.push(todo);
  }

  updateStoredTodos() {
    fs.writeFileSync("./todos.json", JSON.stringify(this.storedTodos));
  }
}

class Main extends Helper {
  read() {
    return this.storedTodos;
  }

  add(title: string, description: string) {
    this.saveInMemory(title, description);
    this.updateStoredTodos();
  }

  findByTitle(title: string) {
    let todo = this.storedTodos.find((todo) => todo.title == title);

    if (todo == undefined) {
      return `"${title}" is not found`;
    } else {
      return todo;
    }
  }

  deleteById(id: number) {
    this.deleteFromMemory(id);
    this.updateStoredTodos();
  }
}

const operation = new Main();
operation.findByTitle("todo title for testing");
operation.add("todo title2", "todo description2");

export default Main;
