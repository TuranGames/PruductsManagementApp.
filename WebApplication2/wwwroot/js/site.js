function initImagePopup(elem,isImage = true) {
   

    var image = elem; // get current clicked image

            // create new popup image with all attributes for clicked images and offsets of the clicked image
    var popupImage = document.createElement("img");
    var canvasCont = document.createElement("div");
    var qrString = image.getAttribute('alt');
    $cnv = $(canvasCont).qrcode(qrString);
    var canvas = $cnv.find("canvas")[0];
    $cnv.remove();
            popupImage.setAttribute('src', image.src);
    popupImage.style.width = "0px";
    popupImage.style.height = "0px";
    canvas.style.width =  "0px";
    canvas.style.height = "0px";
            popupImage.classList.add('popImage');
    popupImage.id = 'popImage';
    canvas.classList.add('popImage');
           
            // creating popup image container
            var popupContainer = document.createElement("div");
            popupContainer.classList.add('popupContainer');

            // creating popup image background
            var popUpBackground = document.createElement("div");
            popUpBackground.classList.add('popUpBackground');

            // append all created elements to the popupContainer then on the document.body
    popupContainer.appendChild(popUpBackground);
    if (isImage) {
        var imageType =  popupContainer.appendChild(popupImage);
        getCommodityPic(image.getAttribute('alt'), image);
    } else {
        
       var  imageType = popupContainer.appendChild(canvas);
    }
    
   
            document.body.appendChild(popupContainer);

            // call function popup image to create new dimensions for popup image and make the effect
    popupImageFunction(imageType);


            // resize function, so that popup image have responsive ability
            var wait;
            window.onresize = function () {
                clearTimeout(wait);
                wait = setTimeout(popupImageFunction, 100);
            };

            // close popup image clicking on it
    imageType.addEventListener('click', function (e) {
                closePopUpImage(imageType);
            });
            // close popup image on clicking on the background
            popUpBackground.addEventListener('click', function (e) {
                closePopUpImage(imageType);
            });
         
            function popupImageFunction(imageType) {
                // wait few miliseconds (10) and change style of the popup image and make it popup
                // waiting is for animation to work, yulu can disable it and check what is happening when it's not there
                setTimeout(function () {
                    // I created this part very simple, but you can do it much better by calculating height and width of the screen,
                    // image dimensions.. so that popup image can be placed much better
                    
                    popUpBackground.classList.add('active');
                    imageType.style.top = "60px";
                    imageType.style.width = "";
                    imageType.style.height = window.innerHeight-130+"px";
                }, 10);
            }

            // function for closing popup image, first it will be return to the place where 
            // it started then it will be removed totaly (deleted) after animation is over, in our case 300ms
    function closePopUpImage(imageType) {
                //popupImage.style.width = image.width + "px";
        imageType.style.height = image.height + "px";

                popUpBackground.classList.remove('active');
                setTimeout(function () {
                    popupContainer.remove();
                }, 300);
            }


    
}


// Start popup image function
//initImagePopup(".img-container") // elem = image container