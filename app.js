document.addEventListener('DOMContentLoaded', function() {

    const video = document.getElementById('my-video');
    const progressBar = document.getElementById('progress-bar');

    video.addEventListener('loadeddata', function() {
    }, false);


    var thumbnailList = [];

    // video.addEventListener('seeked', function() {
    //       console.log('seeked');
    //       var canvas = document.createElement('canvas');
    //       var context = canvas.getContext('2d');
    //       context.drawImage(video, 0, 0,400,200); // Draw video frame onto canvas
    
    //       var img = new Image;
    //       // now this represents the canvas, when the video has been drawn on it
        
    //       // Convert canvas to data URL
    //       var thumbnailDataURL = canvas.toDataURL('image/jpeg');
    //       img.setAttribute('src', thumbnailDataURL);
    //       document.body.appendChild(img);
    //       // Add thumbnail to list
    //       thumbnailList.push({
    //         dataURL: thumbnailDataURL,
    //         timestamp: video.currentTime
    //       });

    //       console.log(video.currentTime,' ',thumbnailList,'thumbnailList');
    
    //       var img = document.createElement('img');
    //       img.src=thumbnailDataURL
    //       img.alt = 'Thumbnail - ' + video.currentTime + 's';
    //       document.body.appendChild(img);
    // });

    const notes = [
        { time: 1, note: 'First note',id:1 },
        { time: 3, note: 'Second note',id:2 },
        { time: 5, note: 'Third note',id:3 },
    ];
    
    var timeArr = [];
    function addNoteMarker(time,note,id) {
            console.log('video.duration',video.duration);
            const marker = document.createElement('div');
            marker.classList.add('note-marker');
            marker.style.left = `${(time / video.duration) * 100}%`;
            // console.log('console.log((marker.style.left',marker.style.left);
            // console.log((((time / video.duration) * 100)*(video.duration*1000))/100,'<<time==');
            marker.setAttribute('text',note);
            marker.setAttribute('time',time);
            marker.setAttribute('data-id',id);
            progressBar.appendChild(marker);
    }

    $(document).on("click",'.note-marker', function(event){
        console.log(event.target);
        // console.log($(this).attr('text')); 
        video.currentTime = $(this).attr('time');
        video.pause();
        console.log($(this).attr('text'),'  ',$(this).attr('time'));
    })

    function registerVideoEventListeners() {
    //    console.log('canplay');
    
    notes.forEach((note,index) => {
        //   console.log('note.time',note.time);
        addNoteMarker(note.time,note.note,index+1);
        });
    }

    video.addEventListener('loadeddata',function(){
    //   console.log('canplay');
    registerVideoEventListeners();
    //   console.log($('.note-marker').length); 
    });

    video.addEventListener("timeupdate", () => {
        console.log(video.currentTime,' ',(video.currentTime%1),'video %1  ',Math.floor((video.currentTime%1)*10));
        if(Math.round((video.currentTime%1))!=1){
            const currentTime = Math.floor(video.currentTime);
            // console.log('playing',video.currentTime);
            // find the note that matches the current time
            const currentNote = notes.find((note) => note.time === currentTime);
            // console.log(currentNote,'time update pauseddd before');
            // display the note text if it exists
            if (currentNote) {
                // console.log($('.note-marker').length);
                // console.log('currentNote',currentNote);
                $('.note-marker').each(function(index,element){
                    // console.log(index,'ele',element);
                    let currentElement = $('.note-marker')[index];
                    // console.log(currentElement,'currentElement')
                    let onId = $(this).attr('data-id');
                    // console.log(onId,'id');
                    if(onId == currentNote.id){
                        // console.log('Hi')
                        console.log(currentElement);
                        $('.note-marker').eq(index).addClass('active');
                    }
                    else{
                        $('.note-marker').eq(index).removeClass('active');
                    }
                })
                console.log(currentNote,'time update pause');
                video.pause();
            }
        }
    });

    video.addEventListener("playing", () => {
        // console.log(video.currentTime,'playing current time');
        if(Math.round((video.currentTime%1))!=1){
            // console.log(video.currentTime%1,'  ',Math.floor(video.currentTime%1));
            const currentTime = Math.floor(video.currentTime);
            const currentNote = notes.find((note) => note.time === currentTime);
            if (currentNote) {
                // console.log(currentNote.time);
                video.currentTime += 0.5;
            }
        }
    });


    function reloadRandomFrame() {
        let i =0 
        while(i<=5){
            if (!isNaN(video.duration)) {
                /*  var rand = Math.round(Math.random() * video.duration * 1000) + 1;
                console.log("load at " + rand + " millis"); */
                setTimeout(function(){
                video.currentTime = i;
                console.log(video.currentTime);
                i+=1;
                },500)
            }
        }   
    }
    
    let addNotes = document.getElementById('addNotes');

    addNotes.addEventListener('click',function(){
        console.log('add notes event');
        video.pause();
        console.log('original video add note time ',video.currentTime);
        video.currentTime = Math.floor(video.currentTime);
        console.log('after math floor note time',video.currentTime);
        notes.push({
            time: video.currentTime,
            note:`${notes.length} note`,
            id:notes.length+1
        });
        addNoteMarker(video.currentTime,`${notes.length} note`,notes.length);
    });

    // Store the interval ID
    let intervalId;

    // Add an event listener for the 'play' event
    video.addEventListener('play', () => {
        // Start the interval to get milliseconds every 1 millisecond
        intervalId = setInterval(() => {
            // Get the current time of the video in seconds
            const currentTime = video.currentTime;

            // Convert the current time to milliseconds
            // const currentMilliseconds = Math.floor((currentTime * 1000) % 1000);

            // Get the two-digit milliseconds
            // const twoDigitMilliseconds = currentMilliseconds.toFixed(2);

            // Output the two-digit milliseconds
            // console.log('twoDigitMilliseconds',twoDigitMilliseconds);
            
            // Output the current milliseconds
            // console.log(currentTime,'mili',currentMilliseconds);
              // Get the current time with two decimal places for the milliseconds
            const currentTimeFormatted = currentTime.toFixed(2);
            // console.log('currentTimeFormatted',currentTimeFormatted);

        }, 1);
    });

    // Add an event listener for the 'pause' event
    video.addEventListener('pause', () => {
        // Clear the interval when the video is paused
        clearInterval(intervalId);
    });

});