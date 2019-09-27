
var LeftMouseButtonPressed =false;
var LeftMouseButtonReleased = false;


var stream=[];
var jsonObj = [];
var Start = false;


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "start" ) {
       start();
           }
    
      if( request.message === "stop" ) {
        stop();
        }
         
    }



  );

function start(){
      alert("started");
      Start = true;
}

function stop(){

    Start = false;

    $.ajax({
        url: 'http://localhost:3001/csv', 
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data,status) {
          //do something with data
          console.log('WE good');
        },
        error: function(data,status) {
          //show error data and status
          console.log('Nope');
        }
    }
    );

}



jQuery(function($) {
    var currentMousePos = { x: -1, y: -1 };
    $(document).mousemove(function(event) {
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;
   
    
        
        item = {};


        
            stream.push(currentMousePos.x+" "+currentMousePos.y);
        


        if(LeftMouseButtonReleased){

            item["data"]=stream;

            jsonObj.push(stream);

            //console.log(jsonObj);

            LeftMouseButtonReleased=false;

            stream=[];

            $.ajax({
                url: 'http://localhost:3001/', 
                type: 'POST',
                data:  JSON.stringify(jsonObj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data,status) {
                  //do something with data
                  console.log('WE good');
                },
                error: function(data,status) {
                  //show error data and status
                  console.log('Nope');
                }
            }
            )


           



        }

        if(Start)console.log(currentMousePos.x+" "+currentMousePos.y);
   
    });


    $(document).mousedown(function(event) {
        switch (event.which) {
            case 1:
                LeftMouseButtonPressed =true;
                console.log('Left Mouse button pressed.');
                break;
            case 2:
                console.log('Middle Mouse button pressed.');
                break;
            case 3:
                   
                console.log('Right Mouse button pressed.');
                break;
            default:
                console.log('You have a strange Mouse!');
        }
    });
    



    $(document).mouseup(function(event) {
        switch (event.which) {
            case 1:
                LeftMouseButtonPressed =false;
                LeftMouseButtonReleased=true;
                console.log('Left Mouse button released.');
                break;
            case 2:
                console.log('Middle Mouse button released.');
                break;
            case 3:
                console.log('Right Mouse button released.');
                break;
            default:
                console.log('You have a strange Mouse!');
        }
    });
    

    
    



    







   
});