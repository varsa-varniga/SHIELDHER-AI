import { GppGood, Report, Search, Timeline } from "@mui/icons-material";

  export const features = [
    {
      icon: <Search color="primary" sx={{ fontSize: 40 }} />,
      title: "URL Scanning",
      description: "Instant analysis of any URL to detect potential threats and safety concerns."
    },
    {
      icon: <GppGood color="primary" sx={{ fontSize: 40 }} />,
      title: "Safety Ratings",
      description: "Comprehensive safety scores with detailed breakdowns of risk factors."
    },
    {
      icon: <Report color="primary" sx={{ fontSize: 40 }} />,
      title: "Threat Detection",
      description: "Identify phishing attempts, malware, and other malicious content."
    },
    {
      icon: <Timeline color="primary" sx={{ fontSize: 40 }} />,
      title: "History Tracking",
      description: "View historical safety data for websites you frequently visit."
    }
  ];
  