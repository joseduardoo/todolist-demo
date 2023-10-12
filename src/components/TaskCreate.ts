import {
  FASTElement,
  attr,
  customElement,
  css,
  html,
} from "@microsoft/fast-element";
import { addTask } from "../store/slice";
import store from "../store/store";
import { connect } from "pwa-helpers";

const template = html<TasksCreate>`
  <input
    :value="${(x) => x.taskText}"
    @input=${(x, c) => x.handleInput(c.event)}
  />
  <button @click="${(x) => x.addNewTask()}">Add</button>
`;

const styles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  margin: 10px 0;
`;

@customElement({
  name: "tasks-create",
  template,
  styles,
})
export class TasksCreate extends FASTElement {
  taskText: string = "";

  handleInput(event: Event) {
    this.taskText = (event.target as HTMLInputElement).value;
  }

  addNewTask() {
    if (this.taskText) {
      store.dispatch(addTask({ task: this.taskText, status: "pending" }));
      this.taskText = "";
    }
  }
}

// Using pwa-helpers connect mixin with FASTElement
connect(store)(TasksCreate);