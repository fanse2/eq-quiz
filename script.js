// Quiz
quizNo = 0;

// Equation Variables
let slopeFactor = 1;
let yIntercept = 1;
/*
  y = mx + b
  [Y] = s1 m1/m2[X]  s2 b1/b2
  [Y] = ss1 mm[X]  ss2 bb
*/
// Dom Object input
const questionTxt = document.querySelector("#question");

const myGraph = [];
myGraph.push(document.querySelector("#myGraph1"));
myGraph.push(document.querySelector("#myGraph2"));
myGraph.push(document.querySelector("#myGraph3"));
myGraph.push(document.querySelector("#myGraph4"));

// questions
const questions = [
  { m1: -3, m2: 1, b1: 4, b2: 1 },
  { m1: 1, m2: 1, b1: 0, b2: 1 },
  { m1: 2, m2: 1, b1: 1, b2: 1 },
  { m1: 3, m2: 2, b1: -3, b2: 1 },
  { m1: 1, m2: 2, b1: -1, b2: 1 },
  { m1: -1, m2: 1, b1: 1, b2: 2 },
  { m1: 1, m2: 3, b1: -2, b2: 1 },
  { m1: -2, m2: 3, b1: 3, b2: 1 },
  { m1: 0, m2: 1, b1: -2, b2: 1 },
  { m1: 5, m2: 1, b1: 0, b2: 1 },
  { m1: 1, m2: 4, b1: 5, b2: 1 },
];

//Shuffle Quiz
questions.sort(() => {
  return Math.random() - 0.5;
});

//console.log(questions);

let questionIter = 0;
let questionCounter = questions.length;

// Canvas and Graph
const arrNum = [];
for (let i = -10; i <= 10; i++) arrNum.push(i);

let ctx = [];
myGraph.forEach((g) => ctx.push(g.getContext("2d")));

function drawLine(ctx, startX, startY, endX, endY) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}

function lx(n) {
  return 125 + 25 * n;
}

function ly(n) {
  return 125 - 25 * n;
}

function showEquation(eq) {
  let { m1, m2, b1, b2 } = eq;
  let mSign = "";
  let m = "";
  let bSign = "";
  let b = "";

  if (m1 < 0) mSign = "-";

  if (m1 / m2 === 0) m = "";
  else if (Math.abs(m1 / m2) === 1) m = "<td>x</td>";
  else if (Number.isInteger(m1 / m2))
    m = `<td>${Math.abs(m1 / m2)}</td><td>x</td>`;
  else {
    m = `<td><table><tr><td>${Math.abs(
      m1
    )}</td></tr><tr><td class="upper_line">${m2}</td></tr></table></td><td>x</td>`;
  }

  if (b1 > 0) bSign = `<td>&nbsp;+&nbsp;</td>`;
  if (b1 < 0) bSign = `<td>&nbsp;-&nbsp;</td>`;

  if (b1 / b2 === 0) b = "";
  else if (Number.isInteger(b1 / b2)) b = `<td>${Math.abs(b1 / b2)}</td>`;
  else {
    b = `<td><table><tr><td>${Math.abs(
      b1
    )}</td></tr><tr><td class="upper_line">${b2}</td></tr></table></td>`;
  }

  let eqTable = `<table><tr><td>y =&nbsp;</td>
  <td>${mSign}</td>${m} ${bSign} ${b}</tr></table>`;
  questionTxt.innerHTML = eqTable;
}

function drawInit(ctx) {
  drawLine(ctx, 0, 125, 250, 125); // x-axis
  drawLine(ctx, 125, 0, 125, 250); // y-axis

  //draw graduations
  arrNum.forEach((n) => drawLine(ctx, lx(n), ly(0) - 3, lx(n), ly(0) + 3));
  arrNum.forEach((n) => drawLine(ctx, lx(0) - 3, ly(n), lx(0) + 3, ly(n)));

  ctx.font = "14px Arial";
  ctx.fillText("5", lx(5) - 4, ly(0) + 14);
  ctx.fillText("10", lx(10) - 16, ly(0) + 14);
  ctx.fillText("-5", lx(-5) - 8, ly(0) + 14);
  ctx.fillText("-10", lx(-10) - 2, ly(0) + 14);
  ctx.fillText("0", lx(0) - 10, ly(0) + 14);

  ctx.fillText("5", lx(0) - 11, ly(5) + 5);
  ctx.fillText("10", lx(0) - 18, ly(10) + 11);
  ctx.fillText("-5", lx(0) - 17, ly(-5) + 5);
  ctx.fillText("-10", lx(0) - 22, ly(-10) - 1);
}

function drawGraph(ctx) {
  console.log(`${slopeFactor} x , ${yIntercept}`);
  let contacts = [];
  ctx.clearRect(0, 0, 250, 250);
  drawInit(ctx);

  //x=10,-19  y=mx+b x=(y-b)/m
  let xp10 = slopeFactor * 10 + yIntercept;
  let xn10 = slopeFactor * -10 + yIntercept;
  let yp10 = (10 - yIntercept) / slopeFactor;
  let yn10 = (-10 - yIntercept) / slopeFactor;

  /*
    right, left, top, bottom
  */
  if (xp10 >= -10 && xp10 <= 10) contacts.push({ x: 10, y: xp10 });
  if (xn10 >= -10 && xn10 <= 10) contacts.push({ x: -10, y: xn10 });
  if (yp10 >= -10 && yp10 <= 10) contacts.push({ x: yp10, y: 10 });
  if (yn10 >= -10 && yn10 <= 10) contacts.push({ x: yn10, y: -10 });

  if (contacts.length >= 2) {
    ctx.strokeStyle = "#FF0000";
    drawLine(
      ctx,
      lx(contacts[0].x),
      ly(contacts[0].y),
      lx(contacts[1].x),
      ly(contacts[1].y)
    );
    ctx.strokeStyle = "#000000";
  }

  console.log(contacts);
}

function initQuiz() {
  showEquation(questions[0]);
}

function answer1() {}
function answer2() {}
function answer3() {}
function answer4() {}

// Event Listeners
myGraph[0].addEventListener("click", answer1);
myGraph[1].addEventListener("click", answer2);
myGraph[2].addEventListener("click", answer3);
myGraph[3].addEventListener("click", answer4);
