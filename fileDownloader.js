function autoClick(){
    $("#download").click();
  }

  $(document).ready(function(){
    var element = $("#htmlContent");

    $("#download").on('click', function(){

      html2canvas(element, {
        onrendered: function(canvas) {
          var imageData = canvas.toDataURL("image/jpg");
          $("#download").attr("download", "image.jpg").attr("href", imageData);
        }
      });

    });
  });