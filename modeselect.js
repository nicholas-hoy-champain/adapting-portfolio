const Mode = Object.freeze({
    Invalid: -1,
    Software: 0,
    Game: 1,
    Editor: 2
})

var currentMode = Mode.Invalid;

const modeselect = document.querySelector('.modeselect');

const UnravelMode = async () => {
    /*Text at top*/
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

    modeselect.style.display = 'flex';
    modeselect.style.gap = '20px';
    modeselect.append(intro);


    /*Project files*/
    const projList = await getSortedProjects();

}

const getSortedProjects = async () => {
    
    var modeKey;
    switch(currentMode)
    {
        case Mode.Game:
            modeKey = "gamedev";
            break;
        case Mode.Editor:
            modeKey = "editing";
            break;
        case Mode.Software:
        default:
            modeKey = "software";
            break;
    }

    var projs = [];

    projs.push(await getProject('addagrams'));
    projs.push(await getProject('artemis'));
    projs.push(await getProject('bwr'));
    projs.push(await getProject('the-well'));
    projs.push(await getProject('willard-and-maple'));

    console.log(projs.length);
    console.log(modeKey);

    projs.filter((proj) => modeKey in proj.modePriorities);
    projs.sort((a,b) => b.modePriorities[modeKey] - a.modePriorities[modeKey]);

    console.log(projs.length);

    return projs;
}

const getProject = async (name) => {
    const response = await fetch('./projects/' + name + '.json');
    const asdasda = await response.json();
    console.log(asdasda.toString());
    console.log(asdasda);
    return asdasda;
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