function captureVoice() {
    let micBtn = document.querySelector('#mic-btn');
    let searchBarText = document.querySelector('#searchbar');
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    // This runs when the speech recognition service starts
    recognition.onstart = function() {
       micBtn.style.color='red';
    };
    
    recognition.onspeechend = function() {
        micBtn.style.color='black';
        recognition.stop();
    }
  
    // This runs when the speech recognition service returns result
    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        searchBarText.value=transcript;
    };
     recognition.start();
}