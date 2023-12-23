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

    fetch('.lib/projects/' + projFileName + '.json')
        .then(response => response.json())
        .then(response => {projData = response; buildProjectPage();});
}

onStart();
//window.addEventListener("resize", onResizeSelector);