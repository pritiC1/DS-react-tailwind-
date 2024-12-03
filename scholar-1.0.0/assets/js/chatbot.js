document.addEventListener("DOMContentLoaded", () => {
    const chatbotIcon = document.getElementById("chatbot-icon");
    const chatbotContainer = document.getElementById("chatbot-container");
    const closeChatbot = document.getElementById("close-chatbot");
    const sendBtn = document.getElementById("send-btn");
    const userInput = document.getElementById("user-input");
    const chatMessages = document.getElementById("chat-messages");

    // Toggle chatbot visibility
    chatbotIcon.addEventListener("click", () => {
        chatbotContainer.style.display = "flex";
        chatbotIcon.style.display = "none";
    });

    closeChatbot.addEventListener("click", () => {
        chatbotContainer.style.display = "none";
        chatbotIcon.style.display = "flex";
    });

    // Send user input to the API
    sendBtn.addEventListener("click", () => {
        const query = userInput.value.trim();
        if (!query) return;

        // Append user message to chat
        appendMessage("user", query);

        // Clear input field
        userInput.value = "";

        // Make API request
        fetch("http://127.0.0.1:5000/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
        })
            .then((response) => response.json())
            .then((data) => {
                const results = data.items || [];
                if (results.length > 0) {
                    results.forEach((item) => {
                        appendMessage(
                            "bot",
                            `<a href="${item.link}" target="_blank">${item.title}</a>`
                        );
                    });
                } else {
                    appendMessage("bot", "No results found.");
                }
            })
            .catch((error) => {
                appendMessage("bot", "Error fetching results. Please try again.");
                console.error("Error:", error);
            });
    });

    // Append messages to chat
    function appendMessage(sender, text) {
        const message = document.createElement("div");
        message.classList.add(sender === "user" ? "user-message" : "bot-message");
        message.innerHTML = text;
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the bottom
    }
});
