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

    const titleCard = document.createElement('div');
    titleCard.classList.add('projtitlecard');
    titleCard.style.backgroundImage = 'url(\'lib/images/' + projFileName + '/' + projData.pageTitle.banner + '\')';
    //titleCard.style.background = projData.pageTitle.bannerAlt;
    
    const titleImage = document.createElement('img');
    titleImage.src = 'lib/images/' + projFileName + '/' + projData.pageTitle.image;
    titleImage.alt = projData.pageTitle.imageAlt;
    titleImage.style.width = '100vw';
    titleImage.style.display = 'block';
    titleImage.style.marginLeft = 'auto';
    titleImage.style.marginRight = 'auto';
    titleCard.append(titleImage);

    const titleText = document.createElement('h1');
    titleText.innerHTML = projData.pageTitle.text;
    titleImage.style.textAlign = 'center';
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
    console.log('preJSON - ' + currentMode);


    fetch('lib/projects/' + projFileName + '.json')
        .then(response => response.json())
        .then(response => {projData = response; buildProjectPage();});
}

console.log('pre onStart');

onStart();
//window.addEventListener("resize", onResizeSelector);