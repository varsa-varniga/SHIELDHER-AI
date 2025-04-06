import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Load trained model
model = load_model("phishing_screenshot_cnn.h5")

# Define dataset paths
dataset_path = r"D:/visual studio/phishingscreenshotdataset/dataset"
val_path = dataset_path + "/val"  # Path to validation data

# Define image size
IMG_SIZE = (224, 224)

# Load validation data
datagen = ImageDataGenerator(rescale=1./255)

# The 'val' folder should contain 15 subfolders (one for each class)
val_generator = datagen.flow_from_directory(
    val_path,
    target_size=IMG_SIZE,
    batch_size=32,
    class_mode="categorical",  # Since it's multi-class classification
    shuffle=False  # Don't shuffle for evaluation to keep track of class order
)

# Evaluate model on validation data
loss, accuracy = model.evaluate(val_generator)
print(f"Validation Loss: {loss:.4f}")
print(f"Validation Accuracy: {accuracy:.4f}")
