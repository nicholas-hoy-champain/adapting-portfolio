const Mode = Object.freeze({
    Invalid: -1,
    Software: 0,
    Game: 1,
    Editor: 2
})
const ModeKey = ['software','gamedev','editing']

var currentMode = Mode.Invalid;

const proj = document.querySelector('.projblog');

var projFileName = 'artemis';
var projData;

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

const buildTitleCard = () => {
    const titleCard = document.createElement('div');
    titleCard.classList.add('projtitlecard');
    titleCard.style.backgroundImage = 'url(\'lib/images/' + projFileName + '/' + projData.pageTitle.banner + '\')';
    
    const titleImage = document.createElement('img');
    titleImage.src = 'lib/images/' + projFileName + '/' + projData.pageTitle.image;
    titleImage.alt = projData.pageTitle.imageAlt;
    titleImage.style.width = '50vw';
    titleImage.style.display = 'block';
    titleImage.style.marginLeft = 'auto';
    titleImage.style.marginRight = 'auto';
    titleCard.append(titleImage);

    const titleText = document.createElement('div');
    titleText.innerHTML = projData.pageTitle.text;
    titleText.style.textAlign = 'center';
    titleCard.append(titleText);

    proj.append(titleCard);
}

const buildTopLevelInfo = () => {
    const container = document.createElement('div');
    container.classList.add('projtoplevel');

    const summary = document.createElement('p');
    summary.innerHTML = projData.topLevel.summary;
    container.append(summary);

    const stats = document.createElement('p');
    stats.style.display = 'content';

    const role = document.createElement('p');
    role.innerText = getFromMode(projData.role);
    role.style.fontStyle = 'italic';
    stats.append(role);
    
    const teamSize = document.createElement('p');
    teamSize.innerText = 'Team Size: ' + getFromMode(projData.topLevel.teamSize);
    stats.append(teamSize);

    
    const scale = document.createElement('p');
    scale.innerText = 'Scale: ' + getFromMode(projData.topLevel.scale);
    stats.append(scale);

    const timeframe = document.createElement('p');
    timeframe.innerText = 'Development Period: ' + getFromMode(projData.timeframe);
    stats.append(timeframe);
    
    const toolsUsed = document.createElement('p');
    toolsUsed.innerText = 'Tools Used: ' + getFromMode(projData.topLevel.toolsUsed);
    stats.append(toolsUsed);

    container.append(stats);
    
    proj.append(container);

    const action = document.createElement('div');
    action.innerHTML = projData.actionHTML;
    proj.append(action);
}

const buildBlog = () => {
    
}

const buildProjectPage = () => {
    console.log(currentMode);
    console.log(projData);

    buildTitleCard();
    buildTopLevelInfo();
    buildBlog();
}

const onStart = () => {
    const params = new URLSearchParams(window.location.search);
    
    if(params.has('project')) {
        projFileName = params.get('project');
    }
    else {
        projFileName = 'artemis';
    }

    if(params.has('selection')) {
        currentMode = ModeKey[params.get('selection')];
    }
    else{
        currentMode = Math.floor(Math.random() * 3);
    }
    console.log('preJSON - ' + currentMode);


    fetch('lib/projects/' + projFileName + '.json')
        .then(response => response.json())
        .then(response => {projData = response; buildProjectPage();});
}

console.log('pre onStart');

onStart();
//window.addEventListener("resize", onResizeSelector);