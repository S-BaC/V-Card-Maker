let themeData;

$(document).ready (async()=>{
    await fetch('./themes.json')
        .then(res => res.json())
        .then(data=> themeData = data)
        .catch(err => console.error(err));
    buildCtrlPanel ();
    listeners();
})

function buildCtrlPanel () {
    for(color in themeData.colors){
        $('.colors').append(
            `<button id="theme-${color}">${color.toUpperCase()}</button>`
        )

        $(`#theme-${color}`).css(themeData.colors[color]);
    }
    for(style in themeData.styles){
        $('.styles').append(
            `<button id="style-${style}">${style}</button>`
        )
    }
}

function listeners(){
    $('.colors > button').click(e=>{
        let color = e.target.id.split('-')[1];
        $(':root').css(themeData.colors[color]);
        }
    )
    $('.styles > button').click(e=>{
        let style = e.target.id.split('-')[1];
        $('.main').css(themeData.styles[style]);
        }
    )
}