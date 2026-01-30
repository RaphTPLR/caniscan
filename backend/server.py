from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
import json

IMG_SIZE = 224

app = FastAPI()

# Autorise Next.js (local)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = tf.keras.models.load_model("dog_breed_model.keras")

with open("labels.json", "r") as f:
    vocab = json.load(f)

def preprocess_image_bytes(image_bytes: bytes):
    img = tf.io.decode_image(image_bytes, channels=3, expand_animations=False)
    img = tf.image.resize(img, (IMG_SIZE, IMG_SIZE))
    img = tf.cast(img, tf.float32)  # 0..255
    return tf.expand_dims(img, 0)

@app.post("/predict")
async def predict(image: UploadFile = File(...)):
    image_bytes = await image.read()
    x = preprocess_image_bytes(image_bytes)
    preds = model.predict(x, verbose=0)[0]
    idx = int(np.argmax(preds))
    return {
        "label": vocab[idx],
        "score": float(preds[idx]),
        "top5": [
            {"label": vocab[i], "score": float(preds[i])}
            for i in preds.argsort()[-5:][::-1]
        ],
    }
