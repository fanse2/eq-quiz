// Quiz
let quizNo = 0;
let score = 0;
let maxQuestion = 0;
let correctAnswer = 0;
let scoreTxt = ""

// Equation Variables

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

const nextBtn = document.querySelector("#next")
const qTitle = document.querySelector("#question-title")

const a1 = document.querySelector("#a1");
const a2 = document.querySelector("#a2");
const a3 = document.querySelector("#a3");
const a4 = document.querySelector("#a4");

const sTxt = document.querySelector("#score-txt");

nextBtn.disabled = true
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
questions.sort(() =>  Math.random() - 0.5);

maxQuestion = questions.length;

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
  return 125 + 12.5 * n;
}

function ly(n) {
  return 125 - 12.5 * n;
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

  qTitle.innerHTML = `Qustion (${quizNo+1}/${maxQuestion})`;
}

function drawInit(ctx) {
  drawLine(ctx, 0, 125, 250, 125); // x-axis
  drawLine(ctx, 125, 0, 125, 250); // y-axis

  //draw graduations
  ctx.strokeStyle = "#cccccc";
  arrNum.forEach((n) => drawLine(ctx, lx(n), ly(0) - 250, lx(n), ly(0) + 250));
  arrNum.forEach((n) => drawLine(ctx, lx(0) - 250, ly(n), lx(0) + 250, ly(n)));
  ctx.strokeStyle = "#000000";
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

function drawGraph(ctx,factor) {
  console.log(`${factor.m} x , ${factor.b}`);
  let contacts = [];
  ctx.clearRect(0, 0, 250, 250);
  drawInit(ctx);

  //x=10,-19  y=mx+b x=(y-b)/m
  let xp10 = factor.m * 10 + factor.b;
  let xn10 = factor.m * -10 + factor.b;
  let yp10 = (10 - factor.b) / factor.m;
  let yn10 = (-10 - factor.b) / factor.m;

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

  //console.log(contacts);
}

function makeQuiz(no){
  const arrEq = [...questions]
  const answerList = []
  
  correctAnswer = Math.floor(Math.random() * 4)
  arrEq.splice(no,1) //remove correct eq
  arrEq.sort(()=>Math.random()-0.5)
  for (let i=0;i<=3;i++){
    if (i===correctAnswer){
      answerList.push(questions[no])
    } else {
      answerList.push(arrEq[i])
    }
  }
  //console.log(answerList)
  console.log(correctAnswer)
  answerList.forEach((v,i)=>{
    let m,b;
    m= answerList[i].m1/answerList[i].m2;
    b= answerList[i].b1/answerList[i].b2;
    drawInit(ctx[i]);
    drawGraph(ctx[i],{m,b})
  })

}

function initQuiz() {
  showEquation(questions[quizNo]);
  makeQuiz(quizNo);
  quizNo++;
}

function goNext(){
  if(quizNo>=maxQuestion) return;
  showEquation(questions[quizNo]);
  makeQuiz(quizNo);
  quizNo++;
  nextBtn.disabled = true
  a1.disabled = false
  a2.disabled = false
  a3.disabled = false
  a4.disabled = false
}

function correct(){
  scoreTxt += '😍'
  sTxt.textContent = scoreTxt
}

function wrong(){
  scoreTxt += '🤬'
  sTxt.textContent = scoreTxt
}
function answer1() {
  if(correctAnswer==0){
    correct()
  } else {
    wrong()
  }
  nextBtn.disabled = false
  a1.disabled = true
  a2.disabled = true
  a3.disabled = true
  a4.disabled = true
}
function answer2() {
  if(correctAnswer==1){
    correct()
  } else {
    wrong()
  }
  nextBtn.disabled = false
  a1.disabled = true
  a2.disabled = true
  a3.disabled = true
  a4.disabled = true
}
function answer3() {
  if(correctAnswer==2){
    correct()
  } else {
    wrong()
  }
  nextBtn.disabled = false
  a1.disabled = true
  a2.disabled = true
  a3.disabled = true
  a4.disabled = true
}
function answer4() {
  if(correctAnswer==3){
    correct()
  } else {
    wrong()
  }
  nextBtn.disabled = false
  a1.disabled = true
  a2.disabled = true
  a3.disabled = true
  a4.disabled = true
}




// Event Listeners
a1.addEventListener("click", answer1);
a2.addEventListener("click", answer2);
a3.addEventListener("click", answer3);
a4.addEventListener("click", answer4);

nextBtn.addEventListener("click",goNext)

