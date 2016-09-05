(function(){
    var buttons = document.getElementsByClassName('play'),
        bwamps = document.getElementsByClassName('bwamp'),
        playAll = document.getElementById('playAll');

    function pauseResetPlayAll() {
      for(var i = 0; i < bwamps.length; i++) {
        bwamps[i].pause();
        bwamps[i].currentTime = 0;
        bwamps[i].play();
      }
    }

    playAll.addEventListener('click', function(e) {
      pauseResetPlayAll();
      e.preventDefault();
    }, false);

    function wireStereo(button, bwamp) {
      button.addEventListener('click', function(e) {
        bwamp.pause();
        bwamp.currentTime = 0;
        bwamp.play();
        e.preventDefault();
      }, false);
    }

    if(buttons.length === bwamps.length) {
      for(var i = 0; i < bwamps.length; i++) {
        wireStereo(buttons[i], bwamps[i]);
      }
    }


})();
