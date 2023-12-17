const Mode = Object.freeze({
    Invalid: -1,
    Software: 0,
    Game: 1,
    Editor: 2
})
const ModeKey = ['software','gamedev','editing']

var currentMode = Mode.Invalid;

const modeselect = document.querySelector('.modeselect');

const UnravelMode = async () => {
    /*Text at top*/
    const headshot = document.createElement('div');
    headshot.style.display = 'flex';
    headshot.style.gap = '20px';

    const intro = document.createElement('div');
    intro.style.display = 'content';
    intro.style.width = '1000px';

    const greeting = document.createElement('h2');
    greeting.innerText = 'Hello! My name is Nicholas Perell.'
    greeting.style.marginTop = '125px';
    intro.append(greeting);
    
    const selfpitch = document.createElement('p');
    selfpitch.innerText = 'I\'m a game programmer who excels in communication, technical research, and planning. I collaborate intentionally with my team to give players an experience that communicates a sense of care was put behind it. Focus on AI, systems, and gameplay programming. Well-versed in narrative structure, management, and writing.';
    intro.append(selfpitch);

    headshot.append(modeselect.querySelector('img'));
    headshot.append(intro);
    modeselect.append(headshot);

    /*Project files*/
    const projList = await getSortedProjects();

    const board = document.createElement('div');
    board.classList.add('projectsboard');
    projList.forEach((proj) => {
        board.append(createProjectRow(proj));
    });
    modeselect.append(board);
}

const createProjectRow = (proj) => {
    const row = document.createElement('div');
    row.classList.add('projectrow');

    const icon = document.createElement('img');
    icon.setAttribute('src', 'images/' + proj.iconPath);
    icon.setAttribute('alt', proj.title);
    icon.style.height = 100;
    icon.style.width = 100;
    row.append(icon);

    const title = document.createElement('p');
    title.innerHTML = '<b>' + proj.title + '</>'
    row.append(title);

    const role = document.createElement('p');
    role.innerText = getFromMode(proj.role);
    row.append(role);

    const timeframe = document.createElement('p');
    timeframe.innerText = getFromMode(proj.timeframe);
    row.append(timeframe);

    return row;
}

const getFromMode = (value) => {
    if(typeof value === 'object')
    {
        return getFromMode(value[ModeKey[currentMode]]);
    }
    else
    {
        return value;
    }
}

const getSortedProjects = async () => {
    
    var modeKey = ModeKey[currentMode];
    console.log(modeKey, currentMode);

    var projs = [];

    /*Section to update*/
    projs.push(await getProject('addagrams'));
    projs.push(await getProject('artemis'));
    projs.push(await getProject('bwr'));
    projs.push(await getProject('high-tide'));
    projs.push(await getProject('lenora-fedora'));
    projs.push(await getProject('private-dick'));
    projs.push(await getProject('project-nautilus'));
    projs.push(await getProject('the-well'));
    projs.push(await getProject('willard-and-maple'));

    projs = projs.filter((proj) => proj.modePriorities.hasOwnProperty(modeKey));
    projs = projs.sort((a,b) => a.modePriorities[modeKey] - b.modePriorities[modeKey]);    
    return projs;
}

const getProject = async (name) => {
    const response = await fetch('./projects/' + name + '.json');
    return await response.json();
}

const onClickButton = (event) => {
    
    currentMode = event.target.id;

    const buttons = modeselect.querySelectorAll('.modebutton');
    for (let index = buttons.length - 1; index >= 0; index--) {
        const button = buttons[index];
        button.remove();
    }

    UnravelMode();
}

const onResizeSelector = (event) => {
    const headshot = modeselect.querySelector('img');
    if(currentMode == Mode.Invalid && window.innerWidth >= headshot.width * 3 + 60) {
        headshot.style.marginBottom = '90px';
    }
    else {
        headshot.style.marginBottom = '10px';
    }
}

const onStart = () => {
    const buttons = modeselect.querySelectorAll('.modebutton');
    for (let index = 0; index < buttons.length; index++) {
        const button = buttons[index];
        button.id = index;
        button.onclick = onClickButton;
    }

    const params = new URLSearchParams(window.location.search);
    if(params.has('selection'))
    {
        buttons[params.get('selection')].click();
    }
}

onStart();
window.addEventListener("resize", onResizeSelector);