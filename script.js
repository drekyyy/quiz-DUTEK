const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const body=document.body
var answerCount=document.getElementById('correctAnswerCount')

let shuffledQuestions, currectQuestionIndex
var img1, img2, img3, img4, src
img1 = document.createElement('img')
img2 = document.createElement('img')
img3 = document.createElement('img')
img4 = document.createElement('img')
const div=document.createElement('div') //pop up window nazwane div poprostu, pojawia sie po nacisnieciu next
const okButton=document.createElement('button')
const RestartButton=document.createElement('button')
const divContainer=document.getElementById('container')
// img.src="https://www.google.com/intl/en_com/images/logo_plain.png"
// src=document.getElementById("img1")
// src.appendChild(img);
div.style.maxWidth='80%'
div.style.width='900px'
//div.style.height='10%'
div.style.backgroundColor='white'
div.style.position='absolute'
div.style.boxShadow= '0 0 10px 2px'
div.style.padding='15px'
div.style.display='flex'
div.style.alignItems='center'
div.style.flexDirection='column'
div.style.textAlign='center'
okButton.style.padding='5px 10px'
okButton.style.marginTop='15px'
okButton.style.width='80px'
okButton.innerText='Ok'
okButton.style.backgroundColor='blue'
okButton.style.color='white'
okButton.style.border='none'

RestartButton.style.padding='5px 10px'
RestartButton.style.marginTop='15px'
RestartButton.style.width='120px'
RestartButton.innerText='Restart'
RestartButton.style.backgroundColor='blue'
RestartButton.style.color='white'
RestartButton.style.border='none'

let answerFlag=0;
let correctAnswerCount=0;
//startButton.addEventListener('click', startGame)
startButton.addEventListener('click', () => {
    if (startButton.innerText=='Koniec'){
        div.innerText="To koniec quizu!"
        body.append(div)
        div.append(RestartButton)
        divContainer.style.filter='blur(8px)'
    }else {
        startGame();
    }
})
nextButton.addEventListener('click', () => {
    div.innerText=shuffledQuestions[currentQuestionIndex].explanation
    body.append(div)
    div.append(okButton)
    divContainer.style.filter='blur(8px)'
    }
)
okButton.addEventListener('click', () =>{
    currentQuestionIndex++
    setNextQuestion()
})

RestartButton.addEventListener('click', startGame)


function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    correctAnswerCount=0
    answerCount.innerHTML='Poprawne odpowiedzi:'+correctAnswerCount+'/'+shuffledQuestions.length
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    if (question.image1 !== 'blank') {
        img1.src = question.image1
        src = document.getElementById("img1")
        src.appendChild(img1)
    }
    if (question.image2 !== 'blank') {
        img2.src = question.image2
        src = document.getElementById("img2")
        src.appendChild(img2)
    }
    if (question.image3 !== 'blank') {
        img3.src = question.image3
        src = document.getElementById("img3")
        src.appendChild(img3)
    }
    if (question.image4 !== 'blank') {
        img4.src = question.image4
        src = document.getElementById("img4")
        src.appendChild(img4)
    }
    
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    answerFlag=0
    img1.src=''
    img2.src=''
    img3.src=''
    img4.src=''
    src=0
    div.remove()
    divContainer.style.filter='none'
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    
    if (e.target.dataset.correct!=undefined && answerFlag==0){ 
        //console.log("poprawna odpowiedz")
        correctAnswerCount+=1
        answerFlag=1
    } else answerFlag=1
    answerCount.innerHTML='Poprawne odpowiedzi:'+correctAnswerCount+'/'+shuffledQuestions.length
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Koniec'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
const questions = [{
        question: 'What is 2 + 2?',
        image1: "https://www.google.com/intl/en_com/images/logo_plain.png",
        image2: 'https://robimylogo.pl/img/projekt-logo.png',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: '4',
                correct: true
            },
            {
                text: '22',
                correct: false
            }
        ],
        explanation: 'Poprawna odpowiedz to... 4'
    },
    {
        question: 'What is 2 * 3?',
        image1: 'https://robimylogo.pl/img/projekt-logo.png',
        image2: 'blank',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: '6',
                correct: true
            },
            {
                text: '12',
                correct: false
            }
        ],
        explanation: 'Poprawna odpowiedz to... 6'
    },
    {
        question: 'What is 2+3/3?',
        image1: 'https://ocdn.eu/pulscms-transforms/1/fluk9kpTURBXy9hYzQ5NzEzYWRiNzM2Y2Q0MDhiNjU5YTRhZWVmN2MwNi5qcGeSlQMANs0DwM0CHJUCzQIaAMPDgaExAQ',
        image2: 'blank',
        image3: 'blank',
        image4: 'blank',
        answers: [{
                text: '3',
                correct: true
            },
            {
                text: '1.(6)',
                correct: false
            }
        ],
        explanation: 'Poprawna odpowiedz to... 3, bo najpierw dzielimy, a później dodajemy!'
    }
]