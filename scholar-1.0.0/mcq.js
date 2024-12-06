let questions = [];

document.getElementById("addQuestionForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Gather question details
    const question = document.getElementById("question").value;
    const optionA = document.getElementById("optionA").value;
    const optionB = document.getElementById("optionB").value;
    const optionC = document.getElementById("optionC").value;
    const optionD = document.getElementById("optionD").value;
    const correctOption = document.getElementById("correctOption").value;

    // Add question to the list
    questions.push({ question, options: { A: optionA, B: optionB, C: optionC, D: optionD }, correct: correctOption });

    alert("Question added successfully!");

    // Clear form
    this.reset();
});

document.getElementById("createTestBtn").addEventListener("click", function () {
    if (questions.length === 0) {
        alert("No questions added!");
        return;
    }

    const quizSection = document.getElementById("quiz");
    quizSection.innerHTML = ""; // Clear any previous quiz

    questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.innerHTML = `
            <p>${index + 1}. ${q.question}</p>
            <label><input type="radio" name="q${index}" value="A"> ${q.options.A}</label><br>
            <label><input type="radio" name="q${index}" value="B"> ${q.options.B}</label><br>
            <label><input type="radio" name="q${index}" value="C"> ${q.options.C}</label><br>
            <label><input type="radio" name="q${index}" value="D"> ${q.options.D}</label><br>
        `;
        quizSection.appendChild(questionDiv);
    });

    document.getElementById("quiz-section").style.display = "block";
});

document.getElementById("submitQuizBtn").addEventListener("click", function () {
    let score = 0;

    questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && selected.value === q.correct) {
            score++;
        }
    });

    document.getElementById("marks").textContent = `${score} / ${questions.length}`;
    document.getElementById("result-section").style.display = "block";
});
