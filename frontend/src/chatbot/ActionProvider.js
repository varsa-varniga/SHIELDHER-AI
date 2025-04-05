import { createChatBotMessage } from "react-chatbot-kit";

class ActionProvider {
  constructor(createChatbotMessage, setStateFunc) {
    this.createChatbotMessage = createChatbotMessage;
    this.setState = setStateFunc;
  }

  handleGreeting = () => {
    const message = createChatBotMessage(
      "Hello, I am ShieldHerAI. How can I help you with cyber security today?",
      {
        delay: 500,
      }
    );
    
    this.addMessageToState(message);
    // Small delay before showing topics to ensure greeting is seen first
    setTimeout(() => {
      this.showTopics();
    }, 700);
  };

  handleThankYou = () => {
    const message = createChatBotMessage(
      "You're welcome! You can come to me whenever you want and I will guide you!",
      {
        delay: 500,
      }
    );
    
    this.addMessageToState(message);
  };

  showTopics = () => {
    // Get topics from state and build the complete message with topics list
    this.setState((state) => {
      const topicsList = state.topics.map(
        (topic) => `${topic.id}. ${topic.name}`
      ).join("\n");
      
      // Create a single message with both the intro text and the topics list
      const combinedMessage = createChatBotMessage(
        `Here are some topics I can help you with. Please select one by typing its number:\n\n${topicsList}`,
        {
          delay: 500,
        }
      );
      
      return {
        ...state,
        currentTopic: null,
        messages: [...state.messages, combinedMessage],
      };
    });
  };

  handleTopicSelection = (topicId) => {
    this.setState((state) => {
      const selectedTopic = state.topics.find((topic) => topic.id === topicId);
      
      if (!selectedTopic) {
        const errorMessage = createChatBotMessage(
          "I couldn't find that topic. Please select a valid topic number."
        );
        return {
          ...state,
          messages: [...state.messages, errorMessage],
        };
      }
      
      const message = createChatBotMessage(
        `You've selected "${selectedTopic.name}". Here are some common questions on this topic:`
      );
      
      return {
        ...state,
        currentTopic: topicId,
        messages: [...state.messages, message],
      };
    });
    
    // Small delay before showing questions to ensure the topic selection message is seen first
    setTimeout(() => {
      this.showQuestionsForTopic(topicId);
    }, 700);
  };

  showQuestionsForTopic = (topicId) => {
    this.setState((state) => {
      const selectedTopic = state.topics.find((topic) => topic.id === topicId);
      
      if (!selectedTopic) {
        return state;
      }
      
      const questionsList = selectedTopic.questions
        .map((q) => `${q.id}. ${q.text}`)
        .join("\n");
      
      const questionsMessage = createChatBotMessage(
        `Please select a question by typing its number:\n\n${questionsList}\n\n(Type "topics" to see all topics again)`
      );
      
      return {
        ...state,
        messages: [...state.messages, questionsMessage],
      };
    });
  };

  handleQuestionSelection = (questionId) => {
    this.setState((state) => {
      if (!state.currentTopic) {
        return state;
      }
      
      const currentTopic = state.topics.find(
        (topic) => topic.id === state.currentTopic
      );
      
      if (!currentTopic) {
        return state;
      }
      
      const selectedQuestion = currentTopic.questions.find(
        (q) => q.id === questionId
      );
      
      if (!selectedQuestion) {
        const errorMessage = createChatBotMessage(
          "I couldn't find that question. Please select a valid question number."
        );
        return {
          ...state,
          messages: [...state.messages, errorMessage],
        };
      }
      
      const answerMessage = createChatBotMessage(
        `${selectedQuestion.text}\n\n${selectedQuestion.answer}\n\n(Type "topics" to see all topics or another question number to continue)`
      );
      
      return {
        ...state,
        messages: [...state.messages, answerMessage],
      };
    });
  };

  resetTopicAndShowTopics = () => {
    this.setState((state) => {
      return {
        ...state,
        currentTopic: null,
      };
    });
    
    this.showTopics();
  };

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;