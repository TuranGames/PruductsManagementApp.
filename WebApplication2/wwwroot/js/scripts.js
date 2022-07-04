function sendData(Tovar, date){
  var formData = new FormData();
var fileInput = document.getElementById('image');
var pprogres = document.getElementById('imagePlace');
var hideContainer = document.getElementById('hideContainer');
var changer = document.getElementById('ChangerUser').value;
var hideContainerValue = document.getElementById('hideContainerValue');
var file = fileInput.files[0];
var percentage = 0;
var contexttPlace = document.getElementById('contexttPlace');

  formData.append('uploadedFile', file);
formData.append('Tovar', Tovar);
formData.append('date', date);
  var xhr = new XMLHttpRequest();
   xhr.upload.onprogress = function(event) {
   	hideContainerValue.style.opacity = "1";
hideContainerValue.style.transition = "1.5s";
	percentage = Math.round(event.loaded/event.total*100);
	console.log(percentage);
	hideContainerValue.innerHTML = percentage + "%";
    hideContainerValue.style.width = percentage + "%";
    if(hideContainerValue.style.width == "100%"){
    	setTimeout(function(){
     hideContainerValue.innerHTML = "Yuklandi";
     setTimeout(function(){
     hideContainerValue.style.transition = "1.5s";
     hideContainerValue.style.opacity = "0";
     hideContainerValue.style.width = "0%";
     percentage = 0;
 },500);
},1500);
    	


	
    }
  }

    xhr.onreadystatechange = function() {
      console.log(this.readyState);
    if (this.status == 200) {
      contexttPlace.innerHTML = this.responseText;
    } else {

    }
    
  };
  // Add any event handlers here...
  xhr.open('POST', 'myscript.php', true);
  xhr.send(formData);


}
	function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    document.getElementById('blahh').setAttribute('src', e.target.result);
                };

                reader.readAsDataURL(input.files[0]);
            }
        }

          function doCmd(command, id,button){
          button.onclick = '';
              var url = $(button).data('request-url');
          var feedback = $.ajax({
          type: "POST",
              url: url,
              datatype: 'json',
          data: { comd: command, id: id},
           beforeSend: function(){
               console.log('Sending...');
               
               button.innerHTML = "<img src='~/images/loading.gif' >";
              },
              success: function (Data, Status, jqXHR) {

                  button.innerHTML = Data;
                  
                  setTimeout(function () { removeSmooth(button); }, 300);
              },
           error:  function(){
           console.log('Error');
            button.innerHTML = "Error!!!!";
            button.onclick = doCmd(command, id, button , son);
                                }

          });
          
        
          
          }
          
          var timeOut = 0;
          function get_fb(){
          
    var feedback = $.ajax({
        type: "POST",
        url: "ajaxNew.php",
        async: false
    }).success(function(){
        setTimeout(function(){get_fb();}, timeOut);
        timeOut = 3000;
    }).responseText;

    $('#feedback-box').html(feedback);
}