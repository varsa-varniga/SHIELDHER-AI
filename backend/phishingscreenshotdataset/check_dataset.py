import os

dataset_path = r"D:/visual studio/phishingscreenshotdataset/dataset/phishIRIS_DL_Dataset"

# Check 'train' folder inside phishIRIS_DL_Dataset
train_path = os.path.join(dataset_path, "phishIRIS_DL_Dataset")
val_path = os.path.join(dataset_path, "val")

if os.path.exists(train_path):
    print("\n📂 Train Folder Contents:")
    print(os.listdir(train_path))  # List categories inside train folder
else:
    print(f"❌ Train folder not found in {dataset_path}!")

if os.path.exists(val_path):
    print("\n📂 Validation Folder Contents:")
    print(os.listdir(val_path))  # List categories inside val folder
else:
    print(f"❌ Validation folder not found in {dataset_path}!")
