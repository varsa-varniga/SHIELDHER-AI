from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import cv2
import os

app = Flask(__name__)
CORS(app)  # Enable CORS

model = tf.keras.models.load_model('phishing_screenshot_cnn.h5')
IMG_SIZE = (224, 224)

class_labels = ['adobe', 'alibaba', 'amazon', 'apple', 'boa', 'chase', 'dhl', 'dropbox',
                'facebook', 'linkedin', 'microsoft', 'other', 'paypal', 'wellsfargo', 'yahoo']

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file found in request'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        # Save image temporarily
        image_path = os.path.join("temp.jpg")
        file.save(image_path)

        # Preprocess
        img = cv2.imread(image_path)
        img = cv2.resize(img, IMG_SIZE)
        img = np.expand_dims(img, axis=0)
        img = img / 255.0

        # Predict
        predictions = model.predict(img)
        predicted_class = np.argmax(predictions, axis=1)[0]
        predicted_confidence = float(np.max(predictions))

        return jsonify({
            "predicted_category": class_labels[predicted_class],
            "confidence": predicted_confidence
        })

    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': 'Prediction failed', 'details': str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True, port=5001)
