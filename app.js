let themeData;

$(document).ready (async()=>{
    await fetch('./themes.json')
        .then(res => res.json())
        .then(data=> themeData = data)
        .catch(err => console.error(err));

    buildCtrlPanel ();
    listeners();
    $("#downloadBtn").click();


    let element = $(".main");
    $("#downloadBtn").on('click', function(){
        // html2canvas( element, { logging: true, letterRendering: 1} ).then(canvas => {let imageData = canvas.toDataURL("image/jpg");
        // $("#downloadBtn").attr("download", "image.jpg").attr("href", imageData); })
      html2canvas(element, {
        letterRendering: 1,
        allowTaint:true,
        useCORS: false,
        onrendered: function(canvas) {
          var imageData = canvas.toDataURL("image/jpg");
          $("#downloadBtn").attr("download", "image.jpg").attr("href", imageData);
        }
      });

    });
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
    $('#profileImgInput').change(() => {
        const imgFile = document.querySelector('#profileImgInput').files;
        document.querySelector('.profile > img').src = URL.createObjectURL(imgFile[0]);
    })}