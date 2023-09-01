function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    }

    return adjDescriptor;
};

enum ProjectStatus { Active, Finished };
class Project {
    id: string;

    constructor(public title: string, public description: string, public people: number, public status: ProjectStatus) {
        this.id = Math.random().toString();
    }
}

type Listener = (projects: Project[]) => void;
class ProjectState {
    private projects: Project[] = [];
    private static instance: ProjectState;
    private listeners: Listener[] = [];

    private constructor() {
    }

    addProject(title: string, description: string, people: number) {
        const newProject = new Project(title, description, people, ProjectStatus.Active);
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

    addListener(listerFn: Listener) {
        this.listeners.push(listerFn);
    }
}

interface Validatable {
    value: string | number;
    message: string,
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
};

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

class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLElement;
    element: HTMLElement;
    assignedProjects: any[];

    constructor(private type: 'active' | 'finished') {
        this.templateElement = document.getElementById("project-list")! as HTMLTemplateElement;
        this.hostElement = document.getElementById("app")! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLElement;
        this.element.id = `${this.type}-projects`;

        this.assignedProjects = [];
        ProjectState.getInstance().addListener((projects: Project[]) => {
            this.assignedProjects = projects;
            this.renderProjects();
        })

        this.attach();
        this.renderContent();
        this.renderProjects();
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        this.assignedProjects.forEach(prj => {
            const listItem = document.createElement('li');
            listItem.textContent = prj.title;
            listEl?.appendChild(listItem);
        })
    }

    private renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + " Projects";
    };

    private attach() {
        this.hostElement.insertAdjacentElement("beforeend", this.element);
    }
};

// Input class
class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputE: HTMLInputElement
    descriptionInputE: HTMLInputElement
    peopleInputE: HTMLInputElement

    constructor() {
        this.templateElement = document.getElementById("project-input")! as HTMLTemplateElement;
        this.hostElement = document.getElementById("app")! as HTMLDivElement;
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = "user-input";
        this.configure();
        this.attach();

        this.titleInputE = this.element.querySelector("#title") as HTMLInputElement;
        this.descriptionInputE = this.element.querySelector("#description") as HTMLInputElement;
        this.peopleInputE = this.element.querySelector("#people") as HTMLInputElement;

    }

    private clearInputs() {
        for (const ele of [this.titleInputE, this.descriptionInputE, this.peopleInputE]) {
            ele.value = "";
        }
    }

    private gatherUserInput() : [string, string, number] | void {
        const title = this.titleInputE.value;
        const description = this.descriptionInputE.value;
        const people = this.peopleInputE.value;

        const validators: Validatable[] = [
            {
                value: title,
                message: "Title must not be empty.",
                required: true
            },
            {
                value: description,
                message: "Description must have length > 5.",
                required: true,
                minLength: 5
            },
            {
                value: +people,
                message: "Must be more than 1 person.",
                required: true,
                min: 1
            },
        ]
        for (const validatable of validators) {
            if (!validate(validatable)) {
                alert(validatable.message);
                return;
            }
        }

        return [
            title,
            description,
            +people
        ]
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

    private configure() {
        this.element.addEventListener("submit", this.submitHandler.bind(this));
    }

    private attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
};

const pr = new ProjectInput();
const activeProjects = new ProjectList("active");
const finishedProjects = new ProjectList("finished");