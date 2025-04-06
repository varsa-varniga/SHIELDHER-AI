import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Typography,
  Fade,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";

// Cyberpunk color palette
const colors = {
  deepSpace: "#0a0e17",
  cosmicPurple: "#1a1a2e",
  nebulaBlue: "#16213e",
  cyberViolet: "#4a148c",
  matrixGreen: "#00ff9d",
  electricBlue: "#00d1ff",
  plasmaPink: "#ff00aa",
  starlight: "#e6f1ff",
  cosmicDust: "#7f8c8d",
  voidBlack: "#000000",
  hackerGreen: "#39ff14",
};

const questions = [
  {
    question: "What is the best way to create a strong password?",
    options: [
      "Using your name and birthdate",
      "A mix of upper and lowercase letters, numbers, and symbols",
      "Using a simple word for easy recall",
      "Repeating the same password across all accounts",
    ],
    answer: 1,
  },
  {
    question: "Which is the safest way to handle suspicious emails?",
    options: [
      "Open them to check for hidden threats",
      "Reply to the sender to confirm authenticity",
      "Report and delete them without clicking any links",
      "Forward them to friends for awareness",
    ],
    answer: 2,
  },
  {
    question: "What should you do if a website asks for sensitive information?",
    options: [
      "Check if the website URL starts with 'https://' and has a padlock icon",
      "Provide information if the site looks professional",
      "Enter details quickly to avoid timeouts",
      "Ignore the website's security features",
    ],
    answer: 0,
  },
  {
    question: "What is two-factor authentication (2FA)?",
    options: [
      "Logging in from two different devices",
      "A security measure requiring a password and an additional verification step",
      "Using two passwords instead of one",
      "Automatically logging in after recognizing your device",
    ],
    answer: 1,
  },
  {
    question: "Which of these is a common sign of a phishing attempt?",
    options: [
      "An email from a known contact",
      "A message asking for urgent personal information",
      "Receiving a newsletter subscription confirmation",
      "A website with a security certificate",
    ],
    answer: 1,
  },
  {
    question:
      "Why should you avoid using public Wi-Fi for sensitive transactions?",
    options: [
      "It is too slow for secure activities",
      "It is often monitored by the government",
      "It increases the risk of data interception by hackers",
      "Public Wi-Fi automatically logs your passwords",
    ],
    answer: 2,
  },
  {
    question: "Which action helps protect your device from malware?",
    options: [
      "Downloading software from any website",
      "Updating your operating system and antivirus regularly",
      "Disabling your firewall for faster browsing",
      "Clicking on pop-up ads to close them",
    ],
    answer: 1,
  },
  {
    question: "What should you do if you suspect your account is compromised?",
    options: [
      "Ignore the warning and continue using it",
      "Log out and wait a few days before logging in",
      "Change your password immediately and enable 2FA",
      "Delete the account permanently",
    ],
    answer: 2,
  },
  {
    question: "Which of the following is a safe online browsing practice?",
    options: [
      "Clicking on pop-ups for exclusive offers",
      "Using the same password for all websites",
      "Only visiting websites with 'https://' encryption",
      "Saving passwords in your browser",
    ],
    answer: 2,
  },
  {
    question: "What is the purpose of a VPN (Virtual Private Network)?",
    options: [
      "Speeding up your internet connection",
      "Hiding your IP address and encrypting your online activities",
      "Downloading files faster",
      "Blocking advertisements on websites",
    ],
    answer: 1,
  },
];

const CybersecurityQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (index) => {
    if (isAnswered) return;

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

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const scorePercentage =
    questions.length > 0 ? (score / questions.length) * 100 : 0;

  if (!questions || questions.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 5,
          background: `linear-gradient(${colors.deepSpace}, ${colors.cosmicPurple})`,
          minHeight: "100vh",
          color: colors.starlight,
        }}
      >
        <Typography variant="h5" sx={{ color: colors.plasmaPink }}>
          No questions available. Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        textAlign: "center",
        py: 5,
        background: `linear-gradient(${colors.deepSpace}, ${colors.cosmicPurple})`,
        minHeight: "100vh",
        color: colors.starlight,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          color: colors.matrixGreen,
          fontWeight: "bold",
          letterSpacing: "0.05em",
        }}
      >
        {showResult
          ? "QUIZ COMPLETED"
          : `QUESTION ${currentQuestion + 1}/${questions.length}`}
      </Typography>

      <LinearProgress
        variant="determinate"
        value={
          ((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100
        }
        sx={{
          mb: 4,
          height: 8,
          borderRadius: 5,
          backgroundColor: colors.nebulaBlue,
          "& .MuiLinearProgress-bar": {
            background: `linear-gradient(90deg, ${colors.matrixGreen}, ${colors.electricBlue})`,
          },
        }}
      />

      {showResult ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{ color: colors.plasmaPink }}
          >
            🚀 YOU SCORED {score} OUT OF {questions.length}!
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
                  color:
                    scorePercentage >= 70
                      ? colors.matrixGreen
                      : scorePercentage >= 40
                      ? colors.electricBlue
                      : colors.plasmaPink,
                  filter: "drop-shadow(0 0 8px rgba(0, 255, 157, 0.5))",
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
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ color: colors.starlight }}
                >
                  {Math.round(scorePercentage)}%
                </Typography>
              </Box>
            </Box>
          </Box>

          <Typography variant="body1" sx={{ mt: 2, color: colors.starlight }}>
            {scorePercentage >= 70
              ? "🔥 EXCELLENT JOB! YOU'RE A CYBERSECURITY PRO!"
              : scorePercentage >= 40
              ? "💡 GOOD EFFORT! KEEP IMPROVING."
              : "⚠️ KEEP PRACTICING TO BOOST YOUR KNOWLEDGE."}
          </Typography>

          <Button
            variant="contained"
            onClick={handleRestart}
            sx={{
              mt: 4,
              position: "relative",
              overflow: "hidden",
              border: "1px solid transparent",
              background: `linear-gradient(${colors.deepSpace}, ${colors.deepSpace}) padding-box, 
                          linear-gradient(135deg, ${colors.matrixGreen} 0%, ${colors.electricBlue} 100%) border-box`,
              color: colors.starlight,
              fontWeight: "bold",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              transition: "all 0.3s ease",
              py: 1.5,
              px: 6,
              borderRadius: "8px",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: `0 10px 20px ${colors.matrixGreen}30`,
                background: `linear-gradient(${colors.deepSpace}, ${colors.deepSpace}) padding-box, 
                            linear-gradient(135deg, ${colors.matrixGreen} 0%, ${colors.plasmaPink} 100%) border-box`,
              },
              "&:after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: `linear-gradient(90deg, transparent, ${colors.matrixGreen}20, transparent)`,
                transform: "translateX(-100%)",
                transition: "transform 0.6s ease",
              },
              "&:hover:after": {
                transform: "translateX(100%)",
              },
            }}
          >
            Restart Quiz
          </Button>
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
              background: colors.cosmicPurple,
              border: `1px solid ${colors.cyberViolet}`,
              boxShadow: `0 8px 30px ${colors.matrixGreen}30`,
              borderRadius: 4,
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              sx={{
                color: colors.matrixGreen,
                mb: 3,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {questions[currentQuestion].question}
            </Typography>
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant={selectedOption === index ? "contained" : "outlined"}
                sx={{
                  my: 1,
                  py: 1.5,
                  borderRadius: 3,
                  transition: "0.3s",
                  fontWeight: "bold",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: isAnswered
                    ? index === questions[currentQuestion].answer
                      ? colors.matrixGreen
                      : index === selectedOption
                      ? colors.plasmaPink
                      : colors.starlight
                    : colors.starlight,
                  borderColor: colors.cyberViolet,
                  backgroundColor:
                    selectedOption === index
                      ? isAnswered
                        ? index === questions[currentQuestion].answer
                          ? `${colors.matrixGreen}20`
                          : `${colors.plasmaPink}20`
                        : `${colors.electricBlue}20`
                      : "transparent",
                  "&:hover": {
                    boxShadow: `0 4px 20px ${colors.matrixGreen}40`,
                    backgroundColor: `${colors.electricBlue}20`,
                    borderColor: colors.matrixGreen,
                  },
                  "&.Mui-disabled": {
                    color: isAnswered
                      ? index === questions[currentQuestion].answer
                        ? colors.matrixGreen
                        : index === selectedOption
                        ? colors.plasmaPink
                        : `${colors.starlight}80`
                      : `${colors.starlight}80`,
                    borderColor: `${colors.cyberViolet}80`,
                  },
                }}
                onClick={() => handleAnswer(index)}
                disabled={isAnswered}
              >
                {option}
              </Button>
            ))}
            {isAnswered && (
              <Typography
                sx={{
                  mt: 2,
                  fontWeight: "bold",
                  color:
                    selectedOption === questions[currentQuestion].answer
                      ? colors.matrixGreen
                      : colors.plasmaPink,
                  textShadow: `0 0 8px ${
                    selectedOption === questions[currentQuestion].answer
                      ? `${colors.matrixGreen}80`
                      : `${colors.plasmaPink}80`
                  }`,
                }}
              >
                {selectedOption === questions[currentQuestion].answer
                  ? "✅ CORRECT!"
                  : `❌ INCORRECT! THE RIGHT ANSWER IS: ${
                      questions[currentQuestion].options[
                        questions[currentQuestion].answer
                      ]
                    }`}
              </Typography>
            )}
            {isAnswered && (
              <Button
                onClick={handleNext}
                sx={{
                  mt: 3,
                  position: "relative",
                  overflow: "hidden",
                  border: "1px solid transparent",
                  background: `linear-gradient(${colors.deepSpace}, ${colors.deepSpace}) padding-box, 
                              linear-gradient(135deg, ${colors.matrixGreen} 0%, ${colors.electricBlue} 100%) border-box`,
                  color: colors.starlight,
                  fontWeight: "bold",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  transition: "all 0.3s ease",
                  py: 1.5,
                  px: 6,
                  borderRadius: "8px",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: `0 10px 20px ${colors.matrixGreen}30`,
                    background: `linear-gradient(${colors.deepSpace}, ${colors.deepSpace}) padding-box, 
                                linear-gradient(135deg, ${colors.matrixGreen} 0%, ${colors.plasmaPink} 100%) border-box`,
                  },
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: `linear-gradient(90deg, transparent, ${colors.matrixGreen}20, transparent)`,
                    transform: "translateX(-100%)",
                    transition: "transform 0.6s ease",
                  },
                  "&:hover:after": {
                    transform: "translateX(100%)",
                  },
                }}
              >
                {currentQuestion === questions.length - 1
                  ? "FINISH QUIZ"
                  : "NEXT QUESTION"}
              </Button>
            )}
          </Card>
        </Fade>
      )}
    </Box>
  );
};

export default CybersecurityQuiz;
