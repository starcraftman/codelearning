function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };

  return adjDescriptor;
}

enum ProjectStatus {
  Active,
  Finished,
}
class Project {
  id: string;

  constructor(
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus,
  ) {
    this.id = Math.random().toString();
  }
}

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string,
  ) {
    this.templateElement = document.getElementById(
      templateId,
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true,
    );
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAtStart);
  }

  private attach(insertAtStart: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtStart ? "afterbegin" : "beforeend",
      this.element,
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}

type Listener<T> = (projects: T[]) => void;

abstract class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listerFn: Listener<T>) {
    this.listeners.push(listerFn);
  }
}

class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  addProject(title: string, description: string, people: number) {
    const newProject = new Project(
      title,
      description,
      people,
      ProjectStatus.Active,
    );
    this.projects.push(newProject);
    for (const listen of this.listeners) {
      listen(this.projects.slice());
    }
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProjectState();
    }

    return this.instance;
  }
}

interface Validatable {
  value: string | number;
  message: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(config: Validatable) {
  let isValid = true;

  if (config.required) {
    isValid = isValid && config.value.toString().trim().length !== 0;
  }

  // String checks
  if (typeof config.value === "string") {
    if (config.minLength && config.minLength !== null) {
      isValid = isValid && config.value.length > config.minLength;
    }
    if (config.maxLength && config.maxLength !== null) {
      isValid = isValid && config.value.length < config.maxLength;
    }

    // Number checks
  } else if (typeof config.value === "number") {
    if (config.min && config.min !== null) {
      isValid = isValid && +config.value > config.min;
    }
    if (config.max && config.max !== null) {
      isValid = isValid && +config.value > config.max;
    }
  }

  return isValid;
}

class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  assignedProjects: any[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    this.assignedProjects = [];

    this.configure();
    this.renderContent();
    this.renderProjects();
  }

  configure() {
    ProjectState.getInstance().addListener((projects: Project[]) => {
      const requiredStatus =
        this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished;
      this.assignedProjects = projects.filter((prj) => {
        return prj.status === requiredStatus;
      });
      this.renderProjects();
    });
  }
  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " Projects";
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`,
    )! as HTMLUListElement;
    listEl.innerHTML = "";
    this.assignedProjects.forEach((prj) => {
      const listItem = document.createElement("li");
      listItem.textContent = prj.title;
      listEl?.appendChild(listItem);
    });
  }
}

// Input class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputE: HTMLInputElement;
  descriptionInputE: HTMLInputElement;
  peopleInputE: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.configure();
    this.titleInputE = this.element.querySelector("#title") as HTMLInputElement;
    this.descriptionInputE = this.element.querySelector(
      "#description",
    ) as HTMLInputElement;
    this.peopleInputE = this.element.querySelector(
      "#people",
    ) as HTMLInputElement;
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }

  renderContent() {}

  private clearInputs() {
    for (const ele of [
      this.titleInputE,
      this.descriptionInputE,
      this.peopleInputE,
    ]) {
      ele.value = "";
    }
  }

  private gatherUserInput(): [string, string, number] | void {
    const title = this.titleInputE.value;
    const description = this.descriptionInputE.value;
    const people = this.peopleInputE.value;

    const validators: Validatable[] = [
      {
        value: title,
        message: "Title must not be empty.",
        required: true,
      },
      {
        value: description,
        message: "Description must have length > 5.",
        required: true,
        minLength: 5,
      },
      {
        value: +people,
        message: "Must be more than 1 person.",
        required: true,
        min: 1,
      },
    ];
    for (const validatable of validators) {
      if (!validate(validatable)) {
        alert(validatable.message);
        return;
      }
    }

    return [title, description, +people];
  }

  @AutoBind
  private submitHandler(event: Event) {
    event.preventDefault();

    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      ProjectState.getInstance().addProject(...userInput);
      this.clearInputs();
    }
  }
}

const pr = new ProjectInput();
const activeProjects = new ProjectList("active");
const finishedProjects = new ProjectList("finished");
