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

const buildTitleCard = () => {
    projData.pageTitle.image;
    projData.pageTitle.banner;
    projData.pageTitle.text;

    const titleCard = document.createElement('img');
    titleCard.classList.add('projtitlecard');
    titleCard.src = 'lib/images/' + projFileName + '/' + projData.pageTitle.banner;
    titleCard.alt = projData.pageTitle.bannerAlt;
    
    const titleImage = document.createElement('img');
    titleCard.src = 'lib/images/' + projFileName + '/' + projData.pageTitle.image;
    titleCard.alt = projData.pageTitle.imageAlt;
    titleCard.append(titleImage);

    const titleText = document.createElement('p');
    titleText.innerHTML = projData.pageTitle.text;
    titleCard.append(titleText);

    proj.append(titleCard);
}

const buildTopLevelInfo = () => {

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
    console.log('preJSON ' + currentMode);


    fetch('lib/projects/' + projFileName + '.json')
        .then(response => response.json())
        .then(response => {projData = response; buildProjectPage();});
}

console.log('pre onStart');

onStart();
//window.addEventListener("resize", onResizeSelector);