import os
import random
from PIL import Image
import matplotlib.pyplot as plt

def show_sample_images(folder_path, category):
    """Show sample phishing images from a given folder category"""
    print(f"📸 Showing sample images from {category} dataset...")

    # ✅ List only image files, ignoring folders
    image_files = [f for f in os.listdir(folder_path) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]

    if not image_files:
        print(f"⚠ No images found in {folder_path}!")
        return

    sample_images = random.sample(image_files, min(5, len(image_files)))  # Pick up to 5 images
    fig, axes = plt.subplots(1, len(sample_images), figsize=(15, 5))

    for ax, img_name in zip(axes, sample_images):
        img_path = os.path.join(folder_path, img_name)
        img = Image.open(img_path)  # ✅ Load image properly
        ax.imshow(img)
        ax.set_title(img_name)
        ax.axis("off")

    plt.show()

# Paths (Update if needed)
dataset_path = r"D:/visual studio/phishingscreenshotdataset/dataset"
train_path = os.path.join(dataset_path, "train", "linkedin")  # Change 'linkedin' to any folder name
val_path = os.path.join(dataset_path, "val", "linkedin")  # Change 'linkedin' to any folder name

show_sample_images(train_path, "train")  # Show phishing images from train
