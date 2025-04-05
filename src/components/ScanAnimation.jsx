import Lottie from "lottie-react";
import scanJsonUrl from "../assets/Scan.json?url";
import { useEffect, useState } from "react";

const ScanAnimation = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Fetch the JSON from the URL
    fetch(scanJsonUrl)
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

  if (!animationData) {
    return <div>Loading animation...</div>;
  }

  return (
    <Lottie
      animationData={animationData}
      loop={true}
      style={{ width: "500px", height: "500px", marginLeft: "150px" }}
    />
  );
};

export default ScanAnimation;
