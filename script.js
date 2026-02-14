var canvas, stage, container;

function init() {
    // 1. Setup Hearts Canvas
    canvas = document.getElementById("testCanvas");
    stage = new createjs.Stage(canvas);
    
    handleResize();
    window.addEventListener('resize', handleResize);

    container = new createjs.Container();
    stage.addChild(container);

    // Create hearts
    for (var i = 0; i < 50; i++) {
        var heart = new createjs.Shape();
        heart.graphics.beginFill("#ff4d6d");
        // Simple heart path
        heart.graphics.moveTo(0, -12).curveTo(1, -20, 8, -20).curveTo(16, -20, 16, -10).curveTo(16, 0, 0, 12);
        heart.graphics.curveTo(-16, 0, -16, -10).curveTo(-16, -20, -8, -20).curveTo(-1, -20, 0, -12);
        
        resetHeart(heart);
        container.addChild(heart);
    }

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.on("tick", tick);

    // 2. UI Button Logic
    const wrapper = document.querySelector(".wrapper");
    const openBtn = document.getElementById("openBtn");
    const closeBtn = document.getElementById("closeBtn");

    openBtn.addEventListener("click", () => {
        wrapper.classList.add("open");
        openBtn.style.display = "none";
        closeBtn.style.display = "inline-block";
    });

    closeBtn.addEventListener("click", () => {
        wrapper.classList.remove("open");
        closeBtn.style.display = "none";
        openBtn.style.display = "inline-block";
    });
}

function resetHeart(heart) {
    heart.x = Math.random() * canvas.width;
    heart.y = canvas.height + 50 + Math.random() * 200;
    heart.velY = -Math.random() * 1.5 - 0.5;
    heart.scale = Math.random() * 0.5 + 0.2;
    heart.alpha = Math.random() * 0.6 + 0.2;
}

function tick(event) {
    var l = container.numChildren;
    for (var i = 0; i < l; i++) {
        var heart = container.getChildAt(i);
        heart.y += heart.velY;
        if (heart.y < -50) resetHeart(heart);
    }
    stage.update(event);
}

function handleResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}