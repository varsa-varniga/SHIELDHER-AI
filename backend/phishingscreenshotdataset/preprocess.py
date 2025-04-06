import tensorflow as tf
import numpy as np
import cv2
import json
import os
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import matplotlib.pyplot as plt

# Constants
IMG_SIZE = (224, 224)
MODEL_PATH = "phishing_screenshot_cnn_improved.h5"
CLASS_MAPPING_PATH = "class_mapping.json"

def load_and_preprocess_image(img_path):
    """Load and preprocess a single image for prediction"""
    img = image.load_img(img_path, target_size=IMG_SIZE)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0  # Rescale just like during training
    return img_array

def predict_image(model, img_path, class_mapping):
    """Make prediction on a single image"""
    # Load and preprocess the image
    processed_img = load_and_preprocess_image(img_path)
    
    # Make prediction
    predictions = model.predict(processed_img)
    
    # Get top predicted class
    predicted_class_idx = np.argmax(predictions[0])
    confidence = float(predictions[0][predicted_class_idx] * 100)
    
    # Convert class index to class name using inverse mapping
    idx_to_class = {v: k for k, v in class_mapping.items()}
    predicted_class = idx_to_class[predicted_class_idx]
    
    # Get top 3 predictions
    top_3_indices = predictions[0].argsort()[-3:][::-1]
    top_3_predictions = [(idx_to_class[idx], float(predictions[0][idx] * 100)) for idx in top_3_indices]
    
    return predicted_class, confidence, top_3_predictions

def visualize_prediction(img_path, predicted_class, confidence, top_3_predictions):
    """Visualize the image with prediction results"""
    # Load the image
    img = cv2.imread(img_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    # Create figure
    plt.figure(figsize=(12, 6))
    
    # Display image
    plt.subplot(1, 2, 1)
    plt.imshow(img)
    plt.title(f"Predicted: {predicted_class} ({confidence:.2f}%)")
    plt.axis('off')
    
    # Display prediction probabilities
    plt.subplot(1, 2, 2)
    classes = [p[0] for p in top_3_predictions]
    scores = [p[1] for p in top_3_predictions]
    
    y_pos = np.arange(len(classes))
    plt.barh(y_pos, scores, align='center')
    plt.yticks(y_pos, classes)
    plt.xlabel('Confidence (%)')
    plt.title('Top 3 Predictions')
    
    plt.tight_layout()
    plt.savefig("prediction_result.png")
    plt.show()

def main():
    # Load class mapping
    try:
        with open(CLASS_MAPPING_PATH, 'r') as f:
            class_mapping = json.load(f)
        print("Loaded class mapping:", class_mapping)
    except FileNotFoundError:
        print(f"Error: Class mapping file {CLASS_MAPPING_PATH} not found.")
        print("Tip: Make sure to run the training script first or create the mapping file.")
        return
    
    # Load the model
    try:
        model = load_model(MODEL_PATH)
        print(f"Model loaded successfully from {MODEL_PATH}")
    except:
        print(f"Error: Could not load model from {MODEL_PATH}")
        return
    
    # Path to test image
    test_image_path = input("Enter the path to the image for prediction: ")
    if not os.path.exists(test_image_path):
        print(f"Error: Image not found at {test_image_path}")
        return
    
    print(f"Testing single image: {test_image_path}")
    
    # Make prediction
    predicted_class, confidence, top_3_predictions = predict_image(model, test_image_path, class_mapping)
    
    # Display results
    print(f"Predicted Category: {predicted_class}")
    print(f"Confidence: {confidence:.2f}%")
    
    print("Top 3 predictions:")
    for i, (class_name, prob) in enumerate(top_3_predictions, 1):
        print(f"{i}. {class_name}: {prob:.2f}%")
    
    # Visualize the prediction
    visualize_prediction(test_image_path, predicted_class, confidence, top_3_predictions)

if __name__ == "__main__":
    main()