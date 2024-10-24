let h1 = document.getElementById("english");
let h2 = document.getElementById("spanish");
let h3 = document.getElementById("streak");
let shuf = document.getElementById("shuffle");
let skip = document.getElementById("skip");
let buttons = document.getElementsByClassName("circle");
let colors = ["tomato", "peru", "goldenrod", "mediumseagreen", "cornflowerblue", "orchid"]
let layout = [
    [4],
    [1, 4],
    [3, 4, 5],
    [1, 3, 5, 7],
    [1, 3, 4, 5, 7],
    [0, 1, 2, 3, 4, 5],
    [0, 1, 3, 4, 5, 7, 8],
    [0, 1, 2, 3, 5, 6, 7, 8],
    [0, 1, 2, 3, 4, 5, 6, 7, 8]
]

function display() {
    word = strip(spanish[index])
    h1.textContent = english[index]
    var color = choice(colors)
    var l = layout[word.length-1]
    shuffle(l)
    
    for (let i = 0; i < l.length; i++) {
        buttons[l[i]].textContent = word.charAt(i)
        buttons[l[i]].style.visibility = "visible"
        buttons[l[i]].style.background = color
        buttons[l[i]].className = "circle inactive"
    }
    
    for (let i = 0; i < 9; i++) {
        if (!l.includes(i)) {
            buttons[i].style.visibility = "hidden"
        }
    }
}

function playSound(path) {
    var sound = new Audio(path)
    sound.play()
}

function choice(l) {
    return l[randex(l)]
}

function randex(l) {
    return Math.floor(Math.random() * l.length)
}

function strip(s) {
    return [...new Set(s)].join("")
}

function shuffle(l) {
    for (let i = l.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [l[i], l[j]] = [l[j], l[i]];
    }
}

function setStreak(n) {
    streak = n
    if (n > high) {
        high = n
    }
    h3.textContent = "score: " + n + "     high score: " + high
}

function press(event) {
    if (event.key == "Backspace") {
        var t = h2.textContent
        if (t.length > 0) {
            h2.textContent = t.substring(0, t.length-1)
            playSound("click.mp3")
        }
    }

    else if (event.key == "Enter") {
        if (h2.textContent == spanish[index]) {
            if (!h1.textContent.includes(":")) {
                setStreak(streak+1)
                playSound("ding.mp3")
            } else {
                setStreak(0)
            }
            h2.textContent = ""
            index = randex(english)
            display()
        }
    }

    else if (event.key == " " && !h1.textContent.includes(":")) {
        h1.textContent += ": " + spanish[index]
    }
    
    else {
        for (const b of buttons) {
            if (b.style.visibility == "visible" && b.textContent == event.key) {
                b.className = "circle active"
                h2.textContent += event.key
                playSound("click.mp3")
            }
        }
    }
}

function release(event) {
    var letter = event.key
    for (const b of buttons) {
        if (b.textContent == letter) {
            b.className = "circle inactive"
        }
    }
}

function write(event) {
    h2.textContent += event.target.textContent
    playSound("click.mp3")
    document.activeElement.blur();
}

function shuffleWord() {
    word = strip(spanish[index])
    var l = layout[word.length-1]
    shuffle(l)
    for (let i = 0; i < l.length; i++) {
        buttons[l[i]].textContent = word.charAt(i)
    }
}

function skipWord() {
    if (!h1.textContent.includes(":")) {
        h1.textContent += ": " + spanish[index]
    }
    document.activeElement.blur();
}

function addListeners() {
    document.addEventListener("keydown", press)
    document.addEventListener("keyup", release)
    shuf.addEventListener("click", shuffleWord)
    skip.addEventListener("click", skipWord)
    for (const b of buttons) {
        b.addEventListener("click", write)
    }
}

index = randex(english)
streak = 0
high = 0
setStreak(0)
addListeners()
display()