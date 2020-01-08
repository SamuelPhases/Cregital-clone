const Typewriter = function(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait,10);
    this.type();
    this.isDeleting = false; 
}

// TYPE METHOD
Typewriter.prototype.type = function() {
// console.log('hello');
    // CURRENT INDEX OF WORD
    const current = this.wordIndex % this.words.length;

    // GET FULL TEXT OF CURRENT WORD
    const fullTxt  = this.words[current];
    // console.log(fullTxt);

    // CHECK IF DELETING

    if(this.isDeleting) {
        // REMOVE CHAR
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        // ADD CHAR
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // INSERT TXT INTO ELEMENT
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    //INITIAL  TYPE SPEED
    let typeSpeed = 300;

    if(this.isDeleting) {
        typeSpeed /= 2;
    }

 
    // CHECK IF WORD IS COMPLETE
    if(!this.isDeleting && this.txt === fullTxt) {
        typeSpeed = this.wait;

        // SET DELETE TO TRUE

        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        // move to the next word
        this.wordIndex++;
        // pause before typing
        typeSpeed = 500;
    }

    setTimeout(() => {
        this.type()
    }, typeSpeed)
}

// INIT ON DOM LOAD
document.addEventListener('DOMContentLoaded', init);


// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // init typewriter
    new Typewriter(txtElement,words,wait);
}