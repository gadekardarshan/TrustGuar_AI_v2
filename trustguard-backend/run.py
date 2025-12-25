import uvicorn
import os
from dotenv import load_dotenv

if __name__ == "__main__":
    # Load environment variables
    load_dotenv()
    
    # robust defaults matching our project structure
    PORT = int(os.getenv("PORT", 8081))
    HOST = os.getenv("HOST", "127.0.0.1")
    
    print(f"✅ Starting TrustGuard Backend...")
    print(f"📍 URL: http://{HOST}:{PORT}")
    print(f"🔌 API Docs: http://{HOST}:{PORT}/docs")
    
    uvicorn.run("app.main:app", host=HOST, port=PORT, reload=True)
