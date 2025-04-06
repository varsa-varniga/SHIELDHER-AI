import tensorflow as tf
import cv2
import numpy as np

# Load the model
model = tf.keras.models.load_model('phishing_screenshot_cnn.h5')

# Define image size
IMG_SIZE = (224, 224)

# Load and preprocess the image
def predict_image(image_path):
    img = cv2.imread(image_path)
    if img is None:
        print("Error: Image not found or unable to open.")
        return
    img = cv2.resize(img, IMG_SIZE)
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    img = img / 255.0  # Normalize the image

    # Get predictions
    predictions = model.predict(img)
    predicted_class = np.argmax(predictions, axis=1)
    predicted_confidence = np.max(predictions)

    # Mapping class indices to class labels
    class_labels = ['adobe', 'alibaba', 'amazon', 'apple', 'boa', 'chase', 'dhl', 'dropbox', 
                    'facebook', 'linkedin', 'microsoft', 'other', 'paypal', 'wellsfargo', 'yahoo']
    
    print(f"Predicted Category: {class_labels[predicted_class[0]]}")
    print(f"Prediction Confidence: {predicted_confidence * 100:.2f}%")

# Test the function with an image
image_path = "D:/visual studio/phishingscreenshotdataset/sample9.png"
predict_image(image_path)
