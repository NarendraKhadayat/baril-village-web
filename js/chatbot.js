
/**
 * @author Narendra Khadayat
 */

document.addEventListener("DOMContentLoaded", () => {
 
  // INITIAL SETUP & ELEMENT SELECTION
  

  let villageData = {};

  const CONTEXT_KEYWORDS = [
    "baril",
    "village",
    "website",
    "site",
    "here",
    "this",
    "narendra",
    "यो",
    "गाउँ",
  ];
  const AMBIGUOUS_TOPICS = ["developer"];

  const chatbotToggle = document.querySelector(".chatbot-toggle");
  const chatbotContainer = document.querySelector(".chatbot-container");
  const chatbotClose = document.querySelector(".chatbot-close");
  const chatInput = document.querySelector(".chatbot-input input");
  const chatSend = document.querySelector(".chatbot-send");
  const chatMessages = document.querySelector(".chatbot-messages");
  const quickReplies = document.querySelectorAll(".quick-reply");

  
  //  DATA LOADING
  

  fetch("village_data.json")
    .then((response) => {
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      villageData = data;
      initializeChatbot();
    })
    .catch((error) => {
      console.error("Fatal Error: Could not load village_data.json.", error);
      addMessage(
        "I'm sorry, my knowledge base is currently unavailable. Please try again later.",
        "bot"
      );
      initializeChatbot();
  });

  // CHATBOT INITIALIZATION

  function initializeChatbot() {
    if (!chatbotToggle) return;

    chatbotToggle.addEventListener("click", toggleChatbot);
    chatbotClose.addEventListener("click", toggleChatbot);
    chatSend.addEventListener("click", handleUserMessage);
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleUserMessage();
    });
    quickReplies.forEach((button) => {
      button.addEventListener("click", () => {
        const currentLanguage = document.documentElement.lang || "en";
        const message = button.getAttribute(`data-${currentLanguage}`);
        chatInput.value = message;
        handleUserMessage();
      });
    });
  }

  
  // for CHATBOT LOGIC 
  
  function handleUserMessage() {
    const userInput = chatInput.value.trim();
    if (!userInput) return;
    addMessage(userInput, "user");
    chatInput.value = "";
    showTypingIndicator();
    setTimeout(() => {
      removeTypingIndicator();
      if (Object.keys(villageData).length === 0) {
        addMessage(
          "I'm having trouble accessing my information right now.",
          "bot"
        );
        return;
      }
      const botResponse = findBestResponse(userInput);
      addMessage(botResponse, "bot");
    }, 1200);
  }

  /**
   * The new "brain" added.
   */
  function findBestResponse(userInput) {
    
    const currentLanguage = document.documentElement.lang || "en";
    

    const lowerInput = userInput.toLowerCase();
    let bestMatch = { score: 0, topic: null };

    const conversationalTopics = [
      "greetings",
      "thanks",
      "goodbye",
      "how_are_you",
      "bot_name",
      "joke",
      "weather",
      "compliment",
    ];
    for (const topicName of conversationalTopics) {
      const topic = villageData.topics[topicName];
      if (
        topic &&
        topic.keywords.some((kw) => lowerInput.includes(kw.toLowerCase()))
      ) {
        // checked language to get the response
        return topic.response[currentLanguage];
      }
    }

    const hasVillageContext = CONTEXT_KEYWORDS.some((kw) =>
      lowerInput.includes(kw)
    );
    for (const topicName in villageData.topics) {
      if (conversationalTopics.includes(topicName)) continue;
      const topic = villageData.topics[topicName];
      let currentScore = 0;
      topic.keywords.forEach((keyword) => {
        if (lowerInput.includes(keyword.toLowerCase())) {
          currentScore++;
        }
      });
      if (AMBIGUOUS_TOPICS.includes(topicName) && !hasVillageContext) {
        currentScore = 0;
      }
      if (currentScore > bestMatch.score) {
        bestMatch = { score: currentScore, topic: topic };
      }
    }

    if (bestMatch.score > 0) {
      // checked language to get the response again 2
      return bestMatch.topic.response[currentLanguage];
    }

    // checked language to get the fallback
    return villageData.fallback[currentLanguage];
  }

  
  // UI & HELPER FUNCTIONS
  

  function toggleChatbot() {
    chatbotContainer.classList.toggle("active");
    chatbotToggle.classList.toggle("active");
    if (chatbotContainer.classList.contains("active")) {
      chatInput.focus();
    }
  }

  function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `chatbot-message ${sender}`;
    const messageContent = document.createElement("p");
    messageContent.innerHTML = text;
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTypingIndicator() {
    const typingDiv = document.createElement("div");
    typingDiv.className = "chatbot-message bot typing-indicator";
    typingDiv.innerHTML = "<p><span></span><span></span><span></span></p>";
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function removeTypingIndicator() {
    const typingIndicator = document.querySelector(".typing-indicator");
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }
});
