import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# Load the dataset
dataset_path = "../dataset/PhiUSIIL_Phishing_URL_Dataset.csv"

df = pd.read_csv(dataset_path, nrows=5)

print("Dataset Loaded Successfully!")
print("Columns in the dataset:")
print(df.columns.tolist())
# Load the complete dataset
df = pd.read_csv(dataset_path)

# Remove columns that should not be used for training
X = df.drop(columns=["FILENAME", "URL", "Domain", "Title", "TLD", "label"])

# Target column
y = df["label"]

print("Features Shape:", X.shape)
print("Labels Shape:", y.shape)
# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

print("Training Samples:", X_train.shape)
print("Testing Samples:", X_test.shape)
# Train the Random Forest model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

print("Training the model...")

model.fit(X_train, y_train)

print("Model training completed!")
# Make predictions
y_pred = model.predict(X_test)

# Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)

print(f"Model Accuracy: {accuracy * 100:.2f}%")
# Save the trained model
joblib.dump(model, "model.pkl")

print("Model saved successfully as model.pkl")