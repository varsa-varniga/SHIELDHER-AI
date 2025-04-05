class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase();
      
      // Thank you responses - this check should come first
      if (this.isThankYou(lowerCaseMessage)) {
        return this.actionProvider.handleThankYou();
      }
      
      // Greeting responses
      if (this.isGreeting(lowerCaseMessage)) {
        return this.actionProvider.showTopics();
      }
      
      // Check if user has selected a topic (responding with a number)
      if (this.state.currentTopic === null) {
        const topicNumber = this.extractNumber(lowerCaseMessage);
        if (topicNumber && topicNumber >= 1 && topicNumber <= this.state.topics.length) {
          return this.actionProvider.handleTopicSelection(topicNumber);
        }
        
        // If user types something that's not a valid topic number
        if (lowerCaseMessage.length > 0) {
          return this.actionProvider.showTopics();
        }
      } 
      // Check if user has selected a question from within a topic
      else if (this.state.currentTopic) {
        const questionNumber = this.extractNumber(lowerCaseMessage);
        const currentTopic = this.state.topics.find(topic => topic.id === this.state.currentTopic);
        
        if (questionNumber && questionNumber >= 1 && questionNumber <= currentTopic.questions.length) {
          return this.actionProvider.handleQuestionSelection(questionNumber);
        }
        
        // Check for requests to see topics again
        if (this.containsTopicRequest(lowerCaseMessage)) {
          return this.actionProvider.resetTopicAndShowTopics();
        }
        
        // If user types something that's not a valid question number
        if (lowerCaseMessage.length > 0) {
          return this.actionProvider.showQuestionsForTopic(this.state.currentTopic);
        }
      }
    }
    
    isGreeting(message) {
      const greetings = ["hi", "hello", "hey", "howdy", "greetings", "good morning", "good afternoon", "good evening", "what's up", "sup"];
      return greetings.some(greeting => message.includes(greeting));
    }
    
    isThankYou(message) {
      const thankYouPhrases = ["thank you", "thanks", "thx", "thank u", "ty", "thankyou", "appreciate it", "grateful"];
      return thankYouPhrases.some(phrase => message.includes(phrase));
    }
    
    extractNumber(message) {
      // Extract the first number from the message
      const matches = message.match(/\d+/);
      if (matches) {
        return parseInt(matches[0]);
      }
      return null;
    }
    
    containsTopicRequest(message) {
      const topicPhrases = ["show topics", "see topics", "topics", "go back", "menu", "start over", "main menu"];
      return topicPhrases.some(phrase => message.includes(phrase));
    }
  }
  
  export default MessageParser;