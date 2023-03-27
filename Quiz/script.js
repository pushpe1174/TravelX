const quizData = [
    {
        question: "Which is the world heritage site in Sri Lanka?",
        a: "Port city",
        b: "Kandy",
        c: "Jaffna",
        d: "Nuwara Eliya",
        correct: "b",
        user: "",
    },
    {
        question: "What is the best period of camping?",
        a: "Summer",
        b: "Spring",
        c: "Rainy",
        d: "Wet season",
        correct: "a",
        user: "",
    },
    {
        question: "What is famous tourist places in the world?",
        a: "Dubai",
        b: "Afghanistan",
        c: " Syria",
        d: "Uganda",
        correct: "a",
        user: "",
    },
    {
        question: "Select the correct combination of tourist places?",
        a: "Egypt - Eiffel Tower",
        b: "Colombo - Statue of Liberty",
        c: "Paris - The Taj Mahal",
        d: "none of the above",
        correct: "d",
        user: "",
    },
    {
        question: "Lotus Tower situated in?",
        a: "India",
        b: "China",
        c: "Colombo",
        d: "Rusia",
        correct: "c",
        user: "",
    },
    {
        question: "Cheapest county to visit for your next vacation?",
        a: "Sri Lanka",
        b: "UAE",
        c: "London",
        d: "USA",
        correct: "a",
        user: "",
    },
    {
        question: "How many airports are in Sri Lanka?",
        a: "1",
        b: "4",
        c: "8",
        d: "2",
        correct: "d",
        user: "",
    },
    {
        question: "Where does The Elephant Gathering take place every year?",
        a: "Minneriya National Park",
        b: "Yala National Park",
        c: "Udawalawe National Park",
        d: "Wilpattu National Park  ",
        correct: "a",
        user: "",
    },
    {
        question: "There is famous for its surfing points that attract surfers from all over the world. Which one is it? ",
        a: "Nilaveli Beach",
        b: "Arugam Bay",
        c: "Marble Beach",
        d: "Kalkudah Beach",
        correct: "b",
        user: "",
    },
    {
        question: "How many of the protected areas are declared as National Parks in Sri Lanka? ",
        a: "19 National Parks",
        b: "16 National parks",
        c: "26 National parks",
        d: "32 National parks",
        correct: "c",
        user: "",
    },
];
data = []
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");

const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");


const timeValue =  performance.now();
let score = 0
let myTimer
let count
let incremental = 0

startTimer(60, 0);
loadQuestion();

function generator() {
    while (true) {
        const random = Math.floor(Math.random() * (quizData.length));
        if (data.includes(random) === false) {
            data.push(random)
            count = random
            incremental += 1
            return random
        }
    }
}

function loadQuestion() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });

    const question = generator()
    const currentQuizData = quizData[question];

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function getSelected() {
    let answer;

    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

 function startTimer(time, trigger){
    if (trigger === 0) {
        myTimer = setInterval(timer, 1000);
        function timer(){
            timeCount.textContent = time;
            time--;
            if(time < 9){
                let addZero = timeCount.textContent;
                timeCount.textContent = "0" + addZero;
            }
            if(time < 0){
                timeText.textContent = "Time Out";
                clearInterval(myTimer)
                return update('60', score)
            }
        }
    } else if (trigger === 1) {
        const timeTaken = Math.round((performance.now() - timeValue) / 1000)
        clearInterval(myTimer)
        return update(timeTaken, score)
    }
}

submitBtn.addEventListener("click", () => {
    if (incremental < 10) {
        const answer = getSelected();
        if (answer) {
            quizData[count].user = answer
            if (answer === quizData[count].correct) {
                score +=2;
            }
            else{
                if(score > 0){
                    score -= 1;
                }
            }
            loadQuestion();
        }
    } else {
        const answer = getSelected();
        if (answer) {
            quizData[count].user = answer
            if (answer === quizData[count].correct) {
                score +=2;
            }
            else{
                if(score > 0){
                    score -= 1;
                }
            }
        }
        return startTimer(0, 1)

    }

});

function update(time, scores) {
    document.getElementsByClassName('quiz-container')[0].style.display = 'none'
    const parent = document.getElementsByClassName('result-container')[0]

    const timeRow = document.createElement('div')
    timeRow.classList.add('item')
    timeRow.innerHTML = `
        <h2>You earned ${scores}/20 marks.<br>You have taken ${time} seconds to finish the quiz</h2><br>`;
    parent.append(timeRow)


    for (let i = 0; i < quizData.length; i++) {
        const quizRow = document.createElement('div')
        quizRow.classList.add('item')

        const question = quizData[i].question
        const correctAnswer = quizData[i].correct
        const userAnswer = quizData[i].user
        let userClass;

        if (userAnswer === correctAnswer) {
            userClass = 'correct'
        } else {
            userClass = 'incorrect'
        }

        quizRow.innerHTML = `
                <div class=${userClass}>
                    <h3>Question ${question}</h3>
                    <table>
                        <tr>
                            <td>Your Answer:</td>
                            <td>${userAnswer}</td>
                        </tr>
                        <tr>
                            <td>Correct Answer:</td>
                            <td>${correctAnswer}</td>
                        </tr>
                    </table>
                </div>`
        parent.append(quizRow)
    }
    const homeRow = document.createElement('div')
    homeRow.classList.add('item')
    homeRow.innerHTML = `
        <button class="refresh" onclick="window.location='../Quizrules/index.html'">Back to home</button>`;
    parent.append(homeRow)
    document.getElementsByClassName('result-container')[0].style.display = 'flex'
}