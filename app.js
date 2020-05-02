const app = document.querySelector('#app');

const state = {
    users: [
        {id: 1, name: 'moe', slot: 'first'},
        {id: 2, name: 'larry', slot: 'second'},
        {id: 3, name: 'curly', slot: 'third'},
        {id: 4, name: 'lucy', slot: 'third', selected: true},
    ],
};

const slots = ['first', 'second', 'third'];

const create = (type) => document.createElement(type);

const createHeader = () => {
    const header = create('h1');
    header.classList.add('title');

    header.innerText = 'Acme First, Second, Third';
    return header;
};

const createListContainer = () => {
    const listContainer = create('div');
    listContainer.classList.add('listContainer');

    return listContainer;
};

const creatSlotContainer = (name) => {
    const slotContainer = create('div');
    slotContainer.classList.add('slotContainer')
    slotContainer.setAttribute('id', name);

    return slotContainer;
};

const creatNavLeftButtons = (name) => {
    const leftButton = create('button');
    leftButton.classList.add('leftButton');
    leftButton.innerText = '<'

    if (name == 'first'){
        leftButton.setAttribute('disabled', 'disabled');
        leftButton.setAttribute('style', 'background-color: white');
    };

    leftButton.addEventListener('click', ev => {
        console.log('leftButton');
    });

    return leftButton;
};

const creatNavRightButtons = (name) => {
    const rightButton = create('button');
    rightButton.classList.add('rightButton');
    rightButton.innerText = '>'

    if (name == 'third'){
        rightButton.setAttribute('disabled', 'disabled');
        rightButton.setAttribute('style', 'background-color: white');
    };

    rightButton.addEventListener('click', ev => {
        console.log('rightButton');
    });

    return rightButton;
};

const createSlotName = (name) => {
    const slotName = create('div');
    slotName.classList.add('slotName')
    slotName.innerText = name;

    return slotName;
};

const createUserSlot = (user) => {
    const userSlot = create('div');
    userSlot.classList.add('user');
    userSlot.setAttribute('id', user.id);

    userSlot.innerText = user.name;
    user.selected = false;

    userSlot.addEventListener('click', ev => {
        console.log(user.name);
        render();
    })

    return userSlot;
};

const render = () => {
    app.innerHTML = '';

    const renderHeader = createHeader();
    app.append(renderHeader);

    const listContainer = createListContainer();
    app.append(listContainer);


    slots.forEach(el => {
        const slotContainer = creatSlotContainer(el);
        listContainer.append(slotContainer);

        const leftNavButton = creatNavLeftButtons(el);
        slotContainer.append(leftNavButton);
        
        const rightNavButton = creatNavRightButtons(el);
        slotContainer.append(rightNavButton);

        const slotName = createSlotName(el);
        slotContainer.append(slotName);

        state.users.forEach(userEl => {
            if (userEl.slot == el){
                const userSlot = createUserSlot(userEl);
                slotContainer.append(userSlot);
            };
        });
    })

    
};

render();