(function () {
  // Check if warning card already exists to avoid duplicates
  const existingCard = document.getElementById("phishing-warning-card");
  if (existingCard) return;
  
  // Create the warning card with proper styling
  const warningCard = document.createElement("div");
  warningCard.id = "phishing-warning-card";
  warningCard.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 340px;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-left: 5px solid #d32f2f;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    font-family: 'Segoe UI', sans-serif;
    z-index: 99999;
    padding: 16px;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  `;
  
  warningCard.innerHTML = `
    <div style="display: flex; flex-direction: column;">
      <div style="font-size: 16px; font-weight: bold; color: #d32f2f; margin-bottom: 8px;">
        ⚠ Phishing Website Detected!
      </div>
      <div style="font-size: 14px; color: #333; margin-bottom: 12px;">
        This website may try to steal your information. It's recommended you leave immediately.
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 8px;">
        <button id="ignore-btn" style="
          background: transparent;
          border: none;
          color: #1976d2;
          cursor: pointer;
          font-size: 14px;
        ">Ignore</button>
        <button id="close-btn" style="
          background-color: #d32f2f;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        ">Go Back</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(warningCard);
  
  // Close button action
  document.getElementById("close-btn").addEventListener("click", () => {
    window.history.back(); // Navigate back
  });
  
  // Ignore button just closes the card
  document.getElementById("ignore-btn").addEventListener("click", () => {
    warningCard.style.opacity = "0";
    setTimeout(() => warningCard.remove(), 300);
  });
})();