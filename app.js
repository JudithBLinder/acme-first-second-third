const app = document.querySelector("#app");

const state = {
  users: [
    { id: 1, name: "moe", slot: "first" },
    { id: 2, name: "larry", slot: "second" },
    { id: 3, name: "curly", slot: "third" },
    { id: 4, name: "lucy", slot: "third", selected: false },
  ],
};

const slots = ["first", "second", "third"];

const create = (type) => document.createElement(type);

// Header Function
const createHeader = () => {
  const header = create("h1");
  header.classList.add("title");

  header.innerText = "Acme First, Second, Third";
  return header;
};

// Main Container Function
const createListContainer = () => {
  const listContainer = create("div");
  listContainer.classList.add("listContainer");

  return listContainer;
};

const creatNavLeftButtonsForForm = (name) => {
  const leftButton = create("button");
  leftButton.classList.add("leftButton");
  leftButton.innerText = "<";

  if (name == "first") {
    leftButton.setAttribute("disabled", "disabled");
    leftButton.setAttribute("style", "background-color: white");
  }

  leftButton.addEventListener("click", (ev) => {
    ev.preventDefault();
    if (name == 'third') {
      state.users.forEach(user => {
        if (user.slot == name && user.selected == true) {
          user.slot = 'second';
        }
      });
    }
    if (name == 'second') {
      state.users.forEach(user => {
        if (user.slot == name && user.selected == true) {
          user.slot = 'first';
        }
      });
    }
    render();
  });

  return leftButton;
};

const creatNavRightButtonsForForm = (name) => {
  const rightButton = create("button");
  rightButton.classList.add("rightButton");
  rightButton.innerText = ">";

  if (name == "third") {
    rightButton.setAttribute("disabled", "disabled");
    rightButton.setAttribute("style", "background-color: white");
  }

  rightButton.addEventListener("click", (ev) => {
    ev.preventDefault();
    if (name == 'first') {
      state.users.forEach(user => {
        if (user.slot == name && user.selected == true) {
          user.slot = 'second';
        }
      });
    }
    if (name == 'second') {
      state.users.forEach(user => {
        if (user.slot == name && user.selected == true) {
          user.slot = 'third';
        }
      });
    }
    render();
  });

  return rightButton;
};

// Name for slots
const createSlotName = (name) => {
  const slotName = create("div");
  slotName.classList.add("slotName");
  slotName.innerText = name;

  return slotName;
};

const createUserContainer = (name) => {
    const usersContainer = create("div");
    usersContainer.setAttribute('class', `UsersContainer ${name}`)
  
    return usersContainer;
  };

const createUserSlot = (user) => {
  const userSlot = create("div");
  userSlot.classList.add("user");
  userSlot.setAttribute("id", user.id);

  userSlot.innerText = user.name;
  // user.selected = false;

  userSlot.addEventListener("click", (ev) => {
    ev.preventDefault();
    user.selected = !user.selected;
    console.log(user.selected);
    console.log(user.name);
    render();
  });

  return userSlot;
};

const createForm = (name) => {
  const formContainer = create("div");
  formContainer.setAttribute('class', `formContainer ${name}`)

  const form = create("form");
  formContainer.append(form);

  const leftNavButton = creatNavLeftButtonsForForm(name);
  form.append(leftNavButton);

  const rightNavButton = creatNavRightButtonsForForm(name);
  form.append(rightNavButton);

  const slotName = createSlotName(name);
  form.append(slotName);

  const usersContainer = createUserContainer(name);
  form.append(usersContainer);

  state.users.forEach(userEl => {
    if (userEl.slot == name) {
      const userSlot = createUserSlot(userEl);
      usersContainer.append(userSlot);
    }
  });

  return formContainer;
};

// Create Header
const header = createHeader();
app.append(header);

// Create all the slots container
const listContainer = createListContainer();
app.append(listContainer);

// Create form for each slot
slots.forEach(slotName => {
  const formElement = createForm(slotName);
  listContainer.append(formElement);
});

const firstForm = document.querySelector('[class = "formContainer first"]');
const SecondForm = document.querySelector('[class = "formContainer second"]');
const thirdForm = document.querySelector('[class = "formContainer third"]');

const firstContainer = document.querySelector('[class = "UsersContainer first"]');
const secondContainer = document.querySelector('[class = "UsersContainer second"]');
const thirdContainer = document.querySelector('[class = "UsersContainer third"]');


const render = () => {
  console.log(state.users);
  firstContainer.innerHTML = '';
  secondContainer.innerHTML = '';
  thirdContainer.innerHTML = '';

  slots.forEach(slotName => {
    state.users.forEach(userEl => {
      if (userEl.slot == slotName) {
        const userSlot = createUserSlot(userEl);
        if (userEl.selected == true) {
          userSlot.setAttribute('class', 'true user');
        }
        let container = document.querySelector(`[class="UsersContainer ${slotName}"]`)
        container.append(userSlot);
      }
    });
  });
  
};