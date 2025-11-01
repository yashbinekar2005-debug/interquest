// AI Chat Support functionality

document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendMessageBtn = document.getElementById('send-message');
    
    if (sendMessageBtn && chatInput) {
        // Send message when button is clicked
        sendMessageBtn.addEventListener('click', sendMessage);
        
        // Send message when Enter key is pressed
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    function sendMessage() {
        const message = chatInput.value.trim();
        
        if (!message) return;
        
        // Add user message to chat
        addMessageToChat(message, 'user');
        
        // Clear input
        chatInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Get AI response
        getAIResponse(message);
    }
    
    function addMessageToChat(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const messageText = document.createElement('p');
        messageText.textContent = message;
        
        messageContent.appendChild(messageText);
        messageDiv.appendChild(messageContent);
        
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.id = 'typing-indicator';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const typingText = document.createElement('p');
        typingText.innerHTML = '<i class="fas fa-ellipsis-h"></i>';
        
        messageContent.appendChild(typingText);
        typingDiv.appendChild(messageContent);
        
        chatMessages.appendChild(typingDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    function getAIResponse(userMessage) {
        // In a real application, this would make an API call to the backend
        // which would use web scraping or an AI API to generate a response
        
        // Simulate API call delay
        setTimeout(() => {
            removeTypingIndicator();
            
            // Get AI response based on user message
            const aiResponse = generateAIResponse(userMessage);
            
            // Add AI response to chat
            addMessageToChat(aiResponse, 'bot');
        }, 1500);
    }
    
    function generateAIResponse(userMessage) {
        // This is a simulation - in a real app, this would use web scraping
        // to query ChatGPT or another AI service
        
        const lowerMessage = userMessage.toLowerCase();
        
        // Predefined responses based on common questions
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "Hello! I'm your career guidance assistant. How can I help you with your internship search or career questions today?";
        } else if (lowerMessage.includes('internship') && lowerMessage.includes('find')) {
            return "To find internships, I recommend using our Job Finder feature. You can search by field and location, and we'll show you relevant opportunities from multiple job sites. You can also set up alerts for new postings.";
        } else if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
            return "For resume help, check out our Resume Maker tool. It can help you create a professional resume highlighting your projects and skills. I also recommend tailoring your resume for each application and focusing on quantifiable achievements.";
        } else if (lowerMessage.includes('interview')) {
            return "Our AI Interviewer is perfect for practice! It can simulate real interview questions for your field. Generally, prepare by researching the company, practicing common questions, and preparing examples of your work using the STAR method (Situation, Task, Action, Result).";
        } else if (lowerMessage.includes('skill') && (lowerMessage.includes('learn') || lowerMessage.includes('improve'))) {
            return "Our Skill Analyzer can help identify what skills you need for specific roles. Based on current trends, in-demand skills include programming (Python, JavaScript), data analysis, cloud computing, and soft skills like communication and problem-solving.";
        } else if (lowerMessage.includes('career') && lowerMessage.includes('change')) {
            return "Changing careers can be challenging but rewarding. Start by identifying transferable skills, networking in your target industry, gaining relevant experience through projects or volunteering, and consider taking courses to fill skill gaps.";
        } else if (lowerMessage.includes('linkedin') || lowerMessage.includes('profile')) {
            return "For LinkedIn optimization: Use a professional photo, create a compelling headline, write a detailed summary highlighting your achievements, list relevant skills, ask for recommendations, and engage with content in your industry.";
        } else if (lowerMessage.includes('thank')) {
            return "You're welcome! Is there anything else I can help you with regarding your career or internship search?";
        } else if (lowerMessage.includes('salary') || lowerMessage.includes('pay')) {
            return "Internship salaries vary by field, location, and company. Tech roles often pay more than non-tech roles. Research typical rates on sites like Glassdoor or Levels.fyi, and consider the value of experience and networking opportunities when evaluating offers.";
        } else {
            // Generic response for other questions
            return "That's an interesting question about your career development. While I don't have a specific answer for that, I recommend using our Skill Analyzer to identify areas for improvement, practicing with our AI Interviewer, or searching for internships in our Job Finder. Would you like help with any of these features?";
        }
    }
});