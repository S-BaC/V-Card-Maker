let themeData;

$(document).ready (async()=>{
    await fetch('./themes.json')
        .then(res => res.json())
        .then(data=> themeData = data)
        .catch(err => console.error(err));

    buildCtrlPanel ();
    showLocalStorage();
    listeners();
    $("#downloadBtn").click();


    let element = $(".main");
    $("#downloadBtn").on('click', function(){
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

function showLocalStorage () {
    let storedData = localStorage.getItem('ContactCardData');
    if(storedData){
        storedData = JSON.parse(storedData);
        for(data in storedData){
            $(`#${data}`).val(storedData[data]);
        }

        // Cannot load image this way, yet.
        // if(localStorage.getItem('ContactCardImg')){
        //     let storedImg = JSON.parse(localStorage.getItem('ContactCardImg'));
        //     console.log(storedImg);
        //     document.querySelector('.profile > img').src = URL.createObjectURL(storedImg);  
        // }
        console.log('added');
    } else {
        addToLocalStorage();
    }
}

function addToLocalStorage () {
    let dataObj = {
            name: $('#name').val(),
            title: $('#title').val(),
            address: $('#address').val(),
            contactPhone: $('#contactPhone').val(),
            contactEmail: $('#contactEmail').val(),
            contactLinkedIn: $('#contactLinkedIn').val(),
            contactSocial: $('#contactSocial').val()
        }
    localStorage.setItem('ContactCardData', JSON.stringify(dataObj));
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
        localStorage.setItem('ContactCardImg', JSON.stringify(imgFile[0]));
        document.querySelector('.profile > img').src = URL.createObjectURL(imgFile[0]);
    })
    $('input[type=text]').blur(function(){
        addToLocalStorage();
    })
}