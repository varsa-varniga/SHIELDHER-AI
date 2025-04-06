import tempfile
import os

# Set temp directory to D drive
tempfile.tempdir = r'D:\temp'

# Optional: Create it if it doesn't exist
os.makedirs(tempfile.tempdir, exist_ok=True)

# Test
with tempfile.NamedTemporaryFile(delete=False) as temp_file:
    print("File saved at:", temp_file.name)
