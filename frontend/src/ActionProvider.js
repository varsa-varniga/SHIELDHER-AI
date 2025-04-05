class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    helpMessage = () => {
      const message = this.createChatBotMessage("I'm here to help! What do you need?");
      this.updateChatbotState(message);
    };
  
    defaultMessage = () => {
      const message = this.createChatBotMessage("Sorry, I didn’t understand. Can you try again?");
      this.updateChatbotState(message);
    };
  
    updateChatbotState(message) {
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    }
  }
  
  export default ActionProvider;
  