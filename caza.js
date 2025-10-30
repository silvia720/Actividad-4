let x = 200;
let y = 150;
let r = 30;  // radio
let score = 0;
let startTime = 0;
let gameOver = false;
let pausa = false;
let dificil = false;



function setup() {
    const lienzo = createCanvas(700, 400);
    textFont('Futura')
    moveCircle();
    startTime = millis(); 

}

function draw() {
    if (pausa) {
        background(159, 245, 238);
        text("PAUSA (P para seguir)", 120, height / 2);
        text(dificil ? "Modo: DIFÍCIL (H)" : "Modo: NORMAL (H)", 10, 68);

        return;
    }

    background(159, 245, 238);
    let t = timeLeft();
    if (t === 0) gameOver = true;
    text("Tiempo: " + nf(t, 2), 10, 48);
    
    circle(x, y, r * 2);  // x, y, diámetro
    noStroke();
    textSize(18);
    text("Puntos: " + score, 10, 24);
    if (!gameOver) {
        circle(x, y, r * 2);
    }
    if (gameOver) {
        textSize(24);
        text("¡FIN! Puntos: " + score, 110, height / 2);
    }


}

function moveCircle() {
    x = random(r, width - r);
    y = random(r, height - r);
}

function mousePressed() {
    if (gameOver) return;

  
    let d = dist(mouseX, mouseY, x, y);
    if (d < r) {
        r = max(10, r - 2);

        moveCircle(); // si clicas dentro, reaparece en otro sitio
        score = score + 1; 

    }
}



function timeLeft() {
    let total = dificil ? 20 : 30;
    let elapsed = int((millis() - startTime) / 1000);
    return max(0, total - elapsed);
}


function keyPressed() {
    if (key === 'R' || key === 'r') {
        r = 30; // restaurar tamaño inicial

        score = 0;
        gameOver = false;
        startTime = millis();
        moveCircle();
    }
    if (key === 'P' || key === 'p') pausa = !pausa;
    if (key === 'H' || key === 'h') {
        dificil = !dificil;
        startTime = millis(); // reinicia el cronómetro al cambiar modo
    }



}
