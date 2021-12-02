// console.clear();
var branches = [];
var currentIndex = 0;
var randomAngle = 0;
var c;
var canvas;

var forex_mode = false;

const fontSize = 15;
const maxParticles = 2000;
const particlesPerClick = 1200;
const particlesPerHold = 12;
const margin = 5;
const bounce = 2;
const clearEachFrame = false;

const scl = 0.3;
const timeScl = 0.0001;
const accScl = 0.005;

class Branch {
    constructor(x, y, drawLine = true) {
        this.x = x;
        this.y = y;
        this.prevx = x;
        this.prevy = y;
        this.drawLine = drawLine;
        this.visible = true;
        // this.speed =
        //   {
        //   x: random(-3, 3),
        //   y: random(-3, 3),
        // };
        this.speed = p5.Vector.fromAngle(randomAngle + random(TWO_PI), random(1, 3));
        this.currency = random(["$", "¥", "€", "£", "₪"]); //,
    }
    walls() {
        this.prevx = this.x;
        this.prevy = this.y;
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
            this.visible = false;
        }
    }

    walls2() {
        if (this.x > width) {
            this.x = 0;
            this.updatePrev();
        }
        if (this.x < 0) {
            this.x = width;
            this.updatePrev();
        }
        if (this.y > height) {
            this.y = 0;
            this.updatePrev();
        }
        if (this.y < 0) {
            this.y = height;
            this.updatePrev();
        }
    }

    walls3() {
        if (this.x > width - margin) {
            this.speed.x = -bounce;
        }
        if (this.x < margin) {
            this.speed.x = bounce;
        }
        if (this.y > height - margin) {
            this.speed.y = -bounce;
        }
        if (this.y < margin) {
            this.speed.y = bounce;
        }
    }

    draw() {
        //push();
        //translate(this.x, this.y);
        //let angle = atan2(this.prevx, this.prevy)-PI/2;
        //rotate(angle);
        // noStroke();
        // text(this.currency, this.x, this.y);
        // strokeWeight(2);
        if (this.drawLine) {
            strokeWeight(0.6);
            line(this.prevx, this.prevy, this.x, this.y);
        } else {
            noStroke();
            text(this.currency, this.x, this.y);
        }

        //pop();
    }

    moveNoise() {
        this.speed.x +=
            simplex.simplex3(this.x * accScl, this.y * accScl, millis() * timeScl) * scl;
        this.speed.y +=
            simplex.simplex3(this.y * accScl, this.x * accScl, millis() * timeScl) * scl;
        // this.speed.x +=
        this.x += this.speed.x;
        this.y += this.speed.y;
    }
    updatePrev() {
        this.prevx = this.x;
        this.prevy = this.y;
    }
}

function createBranches(amount, x = mouseX, y = mouseY, drawLine = true) {
    // Refresh color & blend mode

    for (let i = 0; i < amount; i++) {
        branches[currentIndex] = new Branch(x, y, drawLine);
        currentIndex++;
        if (currentIndex >= maxParticles) currentIndex = 0;
    }
}

function detectBrowser() {
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf("OPR")) != -1) {
        return "Opera";
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        return "Chrome";
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
        return "Safari";
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        return "Firefox";
    } else if (navigator.userAgent.indexOf("MSIE") != -1 || !!document.documentMode == true) {
        return "IE"; //crap
    } else {
        return "Unknown";
    }
}

function setup() {
    // frameRate(60);
    simplex.seed(random());
    clear();

    let parent = $("#home")[0];
    // console.log(parent.offsetWidth, parent.offsetHeight);
    canvas = createCanvas(windowWidth, parent.offsetHeight);
    canvas.parent("hero-canvas");
    canvas.style("display", "block");
    // console.log("canvas: ", canvas);

    createBranches(particlesPerClick, width / 2, height / 2, (drawLine = !forex_mode));

    textSize(fontSize);
    strokeCap(SQUARE);
    colorMode(HSB);
    strokeWeight(0.6);

    browser = detectBrowser();
    if (browser != "Firefox") {
        blendMode(SCREEN);
        // $("#defaultCanvas0").empty();
        // $("#defaultCanvas0")[1].remove();
        // blendMode(MULTIPLY);
    }

    //createBranches(2000,0,0);
    //noStroke();
}

function mouseInCanvas() {
    return 0 < mouseX && mouseX < width && 0 < mouseY && mouseY < height;
}

var i = 0;
function draw() {
    if (clearEachFrame) clear();
    //console.log(branches[0].x,branches[0].y,branches[0].prevx, branches[0].prevy );
    c = (millis() * 0.3) % 360;
    randomAngle = random(TWO_PI);

    stroke(c, 100, 50);
    fill(c, 100, 50);

    //clear();
    if (mouseIsPressed && window.innerWidth >= 768) {
        createBranches(particlesPerHold, mouseX, mouseY, !forex_mode);
    }

    branches.forEach(branch => {
        if (branch.visible) {
            branch.moveNoise();
            branch.draw();
            //branch.walls3();
            branch.walls();
        }
    });
    i++;
    if (i % 60 == 0) {
        // console.log("Frame Rate:", floor(frameRate()), currentIndex);
    }
}

function keyPressed() {
    if (keyCode === ESCAPE || keyCode == 32) {
        clear();
        branches = [];
        currentIndex = 0;
    }
    if (keyCode == 13) {
        clear();
        branches = [];
        currentIndex = 0;
        forex_mode = !forex_mode;
        createBranches(particlesPerClick, width / 2, height / 2, (drawLine = !forex_mode));
    }
    // console.log(keyCode);
}

function mousePressed() {
    if (window.innerWidth < 768) {
        return;
    }
    clear();
    branches = [];
    currentIndex = 0;
    createBranches(particlesPerClick, mouseX, mouseY, (drawLine = !forex_mode));
    //background(255,0,0)

    //   colorMode(HSB);
    //   blendMode(SCREEN);
}
function windowResized() {
    console.log("Resizing canvas...");
    resizeCanvas(windowWidth, windowHeight);
    clear();
    branches = [];
    currentIndex = 0;
    createBranches(particlesPerClick, width / 2, height / 2, !forex_mode);
}

$(window).on("orientationchange", function (event) {
    console.log("Mobile orientation changed!");
    windowResized();
});
