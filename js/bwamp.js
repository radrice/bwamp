(function(){
    var buttons = document.getElementsByClassName('play'),
        bwamps = document.getElementsByClassName('bwamp'),
        playAll = document.getElementById('playAll'),
        identify = document.getElementById('identify'),
        identity = document.getElementById('identity'),
        identified = document.getElementById('identified');

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

    identify.addEventListener('click', function(e) {
      var value = getValue(identity);
      if (value) {
        identified.textContent = value;
        if (FS) {
          FS.identify(value.toString(), { displayName: value });
        }
        document.getElementById('bwampForm').classList.add('dn');
        document.getElementById('bwampMessage').classList.remove('dn');
      } else {
        return;
      }
      e.preventDefault();
    }, false);

    function getValue(input) {
      return input.value.toString();
    }

})();
