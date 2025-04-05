import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Typography,
  Fade,
  LinearProgress,
  CircularProgress
} from "@mui/material";
import { motion } from "framer-motion";

const questions = [
    {
      question: "What is the best way to create a strong password?",
      options: [
        "Using your name and birthdate",
        "A mix of upper and lowercase letters, numbers, and symbols",
        "Using a simple word for easy recall",
        "Repeating the same password across all accounts"
      ],
      answer: 1
    },
    {
      question: "Which is the safest way to handle suspicious emails?",
      options: [
        "Open them to check for hidden threats",
        "Reply to the sender to confirm authenticity",
        "Report and delete them without clicking any links",
        "Forward them to friends for awareness"
      ],
      answer: 2
    },
    {
      question: "What should you do if a website asks for sensitive information?",
      options: [
        "Check if the website URL starts with 'https://' and has a padlock icon",
        "Provide information if the site looks professional",
        "Enter details quickly to avoid timeouts",
        "Ignore the website's security features"
      ],
      answer: 0
    },
    {
      question: "What is two-factor authentication (2FA)?",
      options: [
        "Logging in from two different devices",
        "A security measure requiring a password and an additional verification step",
        "Using two passwords instead of one",
        "Automatically logging in after recognizing your device"
      ],
      answer: 1
    },
    {
      question: "Which of these is a common sign of a phishing attempt?",
      options: [
        "An email from a known contact",
        "A message asking for urgent personal information",
        "Receiving a newsletter subscription confirmation",
        "A website with a security certificate"
      ],
      answer: 1
    },
    {
      question: "Why should you avoid using public Wi-Fi for sensitive transactions?",
      options: [
        "It is too slow for secure activities",
        "It is often monitored by the government",
        "It increases the risk of data interception by hackers",
        "Public Wi-Fi automatically logs your passwords"
      ],
      answer: 2
    },
    {
      question: "Which action helps protect your device from malware?",
      options: [
        "Downloading software from any website",
        "Updating your operating system and antivirus regularly",
        "Disabling your firewall for faster browsing",
        "Clicking on pop-up ads to close them"
      ],
      answer: 1
    },
    {
      question: "What should you do if you suspect your account is compromised?",
      options: [
        "Ignore the warning and continue using it",
        "Log out and wait a few days before logging in",
        "Change your password immediately and enable 2FA",
        "Delete the account permanently"
      ],
      answer: 2
    },
    {
      question: "Which of the following is a safe online browsing practice?",
      options: [
        "Clicking on pop-ups for exclusive offers",
        "Using the same password for all websites",
        "Only visiting websites with 'https://' encryption",
        "Saving passwords in your browser"
      ],
      answer: 2
    },
    {
      question: "What is the purpose of a VPN (Virtual Private Network)?",
      options: [
        "Speeding up your internet connection",
        "Hiding your IP address and encrypting your online activities",
        "Downloading files faster",
        "Blocking advertisements on websites"
      ],
      answer: 1
    },
  ];
  
const CybersecurityQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (index) => {
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const scorePercentage = (score / questions.length) * 100;

  return (
    <Box sx={{ textAlign: "center", py: 5 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {showResult ? "Quiz Completed" : `Question ${currentQuestion + 1}/${questions.length}`}
      </Typography>

      <LinearProgress
        variant="determinate"
        value={((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100}
        sx={{ mb: 4, height: 8, borderRadius: 5 }}
      />

      {showResult ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            🎉 You scored {score} out of {questions.length}!
          </Typography>

          {/* Score Gauge */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Box sx={{ position: "relative", display: "inline-flex" }}>
              <CircularProgress
                variant="determinate"
                value={scorePercentage}
                size={150}
                thickness={5}
                sx={{
                  color: scorePercentage >= 70 ? "#4caf50" : scorePercentage >= 40 ? "#ff9800" : "#f44336",
                }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  {Math.round(scorePercentage)}%
                </Typography>
              </Box>
            </Box>
          </Box>

          <Typography variant="body1" sx={{ mt: 2 }}>
            {scorePercentage >= 70
              ? "🚀 Excellent job! You're a cybersecurity pro!"
              : scorePercentage >= 40
              ? "👍 Good effort! Keep improving."
              : "🔍 Keep practicing to boost your cybersecurity knowledge."}
          </Typography>
        </motion.div>
      ) : (
        <Fade in={!showResult} timeout={500}>
          <Card
            component={motion.div}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
              p: 4,
              mx: "auto",
              maxWidth: 600,
              boxShadow: "0 8px 30px rgba(56, 189, 248, 0.3)",
              borderRadius: 4,
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {questions[currentQuestion].question}
            </Typography>
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant={selectedOption === index ? "contained" : "outlined"}
                color={
                  isAnswered
                    ? index === questions[currentQuestion].answer
                      ? "success"
                      : index === selectedOption
                      ? "error"
                      : "primary"
                    : "primary"
                }
                fullWidth
                onClick={() => handleAnswer(index)}
                disabled={isAnswered}
                sx={{
                  my: 1,
                  py: 1.5,
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: "0 4px 20px rgba(129, 140, 248, 0.4)",
                  },
                }}
              >
                {option}
              </Button>
            ))}
            {isAnswered && (
              <Typography
                sx={{
                  mt: 2,
                  color: selectedOption === questions[currentQuestion].answer ? "green" : "red",
                }}
              >
                {selectedOption === questions[currentQuestion].answer
                  ? "✅ Correct!"
                  : `❌ Incorrect! The right answer is: ${
                      questions[currentQuestion].options[questions[currentQuestion].answer]
                    }`}
              </Typography>
            )}
            {isAnswered && (
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{
                  mt: 3,
                  borderRadius: 3,
                  background: "linear-gradient(45deg, #38BDF8, #818CF8)",
                }}
              >
                {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
              </Button>
            )}
          </Card>
        </Fade>
      )}
    </Box>
  );
};

export default CybersecurityQuiz;
