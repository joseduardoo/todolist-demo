import {
  FASTElement,
  attr,
  customElement,
  css,
  html,
} from "@microsoft/fast-element";
import "./TaskCreate";
import "./TasksList";



const template = html<TodoList>`
  <tasks-create></tasks-create>
  <tasks-list></tasks-list>
`;

const styles = css`
  :host {
    display: block;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    max-width: 500px;
    margin: 40px auto;
    background-color: #f9f9f9;
  }
`;

@customElement({
  name: "todo-list",
  template,
  styles,
})

export class TodoList extends FASTElement {}
