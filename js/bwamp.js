(function(){
    var buttons = document.getElementsByClassName('play'),
        bwamps = document.getElementsByClassName('bwamp'),
        playAll = document.getElementById('playAll'),
        identify = document.getElementById('identify'),
        identity = document.getElementById('identity'),
        identified = document.getElementById('identified'),
        wish = document.getElementById('wish'),
        wishConsent = document.getElementById('wishConsent'),
        wishSubmit = document.getElementById('wishSubmit'),
        wishPower = document.getElementById('wishPower'),
        twinkle = document.getElementById('twinkle'),
        hasWished = false,
        bwampsToWish = 0;

    function pauseResetPlayAll() {
      for(var i = 0; i < bwamps.length; i++) {
        bwamps[i].pause();
        bwamps[i].currentTime = 0;
        bwamps[i].play();
      }
    }

    playAll.addEventListener('click', function(e) {
      pauseResetPlayAll();
      if (hasWished) {
        bwampWish(bwampsToWish);
      }
      e.preventDefault();
    }, false);

    function wireStereo(button, bwamp) {
      button.addEventListener('click', function(e) {
        bwamp.pause();
        bwamp.currentTime = 0;
        bwamp.play();

        if (hasWished) {
          bwampWish(bwampsToWish);
        }
        e.preventDefault();
      }, false);
    }

    if(buttons.length === bwamps.length) {
      for(var i = 0; i < bwamps.length; i++) {
        wireStereo(buttons[i], bwamps[i]);
      }
    }

    identify.addEventListener('click', function(e) {
      var value = getValueString(identity);
      if (value) {
        identified.textContent = value;
        if (FS) {
          FS.clearUserCookie();
          FS.identify(shittyId(), { displayName: value });
        }
        document.getElementById('bwampForm').classList.add('dn');
        document.getElementById('bwampMessage').classList.remove('dn');
      } else {
        return;
      }
      e.preventDefault();
    }, false);

    wishSubmit.addEventListener('click', function(e) {
      var wishValue = getValueString(wish);

      if (wishValue) {
        document.getElementById('wishForm').classList.add('dn');
        document.getElementById('wishMessage').classList.remove('dn');
        wishPower.textContent = wishValue.length;
        bwampsToWish = wishValue.length;
        hasWished = true;
        if (FS && wishConsent.checked) {
          FS.consent(true);
        }
        twinkle.play();
      } else {
        return;
      }

      e.preventDefault();
    }, false);

    function bwampWish(bwampsTo) {
      if (bwampsTo == 0) {
        return;
      }

      bwampsTo--
      if (bwampsTo == 0) {
        hasWished = false;
        document.getElementById('wishMessage').classList.add('dn');
        document.getElementById('wishedMessage').classList.remove('dn');
      }
      bwampsToWish = bwampsTo;
      wishPower.textContent = bwampsToWish;
    }

    function getValueString(input) {
      return input.value.toString();
    }

    function shittyId() {
      return Math.random().toString(36).substr(2,9);
    }
})();
