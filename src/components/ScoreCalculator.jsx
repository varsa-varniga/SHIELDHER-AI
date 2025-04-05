// ScoreCalculator Component
const ScoreCalculator = ({ score, totalQuestions }) => {
  // Function to map score to gauge angle (-90 to 90 degrees)
  const calculateRotation = (score) => {
    return (score / totalQuestions) * 180 - 90;
  };

  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h6">Your Score</Typography>

      {/* Gauge Meter */}
      <Box
        sx={{
          position: "relative",
          width: 200,
          height: 100,
          mt: 2,
          mx: "auto",
        }}
      >
        <svg viewBox="0 0 100 50" width="200" height="100">
          <defs>
            <linearGradient id="gaugeGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#818CF8" />
            </linearGradient>
          </defs>
          <path
            d="M10,50 A40,40 0 0,1 90,50"
            fill="url(#gaugeGradient)"
            stroke="none"
          />
        </svg>

        {/* Needle */}
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            bottom: "0",
            transformOrigin: "bottom",
            transform: `rotate(${calculateRotation(score)}deg)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 60,
              backgroundColor: "#1e40af",
              borderRadius: "4px",
            }}
          />
        </Box>
      </Box>

      {/* Display Score */}
      <Typography variant="h5" sx={{ mt: 3 }}>
        {score} / {totalQuestions}
      </Typography>
    </Box>
  );
};

export default ScoreCalculator;
