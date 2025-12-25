import asyncio
import os
import sys
from dotenv import load_dotenv

# Add parent directory to path to import app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.services.database import db
from app.services.firecrawl_client import FirecrawlClient
from app.services.llm_client import LLMClient

# Config from user request
USER_MODEL_ID = "nvidia/nemotron-4-340b-instruct" # Standard NIM ID for Nemotron (Nano might be local only or specific endpoint, falling back to standard Nemotron for cloud test)
# User asked for "nvidia-nemotron-nano-9b-v2" - trying to set that if possible, but usually NIM uses standard paths.
# Let's try to set it in env for the test
os.environ["LLM_MODEL_ID"] = "nvidia/nemotron-4-340b-instruct" # Using the reliable cloud endpoint for Nemotron

async def test_mongodb():
    print("\n--- Testing MongoDB Connection ---")
    try:
        await db.connect_db()
        if db.client:
            print("✓ MongoDB Connected Successfully")
            # Test Read
            count = await db.scam_patterns.count_documents({})
            print(f"✓ Found {count} scam patterns in database")
        else:
            print("❌ MongoDB Connection Failed (Client is None)")
    except Exception as e:
        print(f"❌ MongoDB Error: {e}")
    finally:
        await db.close_db()

def test_firecrawl():
    print("\n--- Testing Firecrawl API ---")
    client = FirecrawlClient()
    if not client.api_key:
        print("❌ Firecrawl API Key MISSING in environment")
        return

    try:
        print("Testing scrape of 'https://example.com'...")
        result = client.scrape_url("https://example.com", formats=["markdown"])
        if result.get("success"):
            print("✓ Firecrawl Scrape Successful")
            print(f"  Title: {result.get('metadata', {}).get('title')}")
            content_len = len(result.get('data', {}).get('markdown', ''))
            print(f"  Content Length: {content_len} chars")
        else:
            print(f"❌ Firecrawl Scrape Failed: {result.get('error')}")
    except Exception as e:
        print(f"❌ Firecrawl Exception: {e}")

def test_llm():
    print("\n--- Testing LLM API ---")
    
    # Models to test
    models_to_test = [
        "nvidia-nemotron-nano-9b-v2", # User requested
        "mistralai/mixtral-8x7b-instruct-v0.1" # Fallback/Baseline
    ]

    client = LLMClient()
    if client.api_key == "dummy":
        print("⚠️ LLM API Key is 'dummy'. Skipping.")
        return

    for model_id in models_to_test:
        print(f"\nTesting Model: {model_id}")
        client.model_id = model_id # Temporarily switch model
        
        try:
            result = client.analyze("Test prompt", context="Test")
            if result.get("error"):
                 print(f"❌ Failed: {result.get('error')}")
            else:
                 print(f"✅ Success! Score: {result.get('llm_score')}")
                 return # Stop after first success
        except Exception as e:
            print(f"❌ Exception: {e}")

async def main():
    print("🚀 Starting System Verification...")
    load_dotenv()
    
    await test_mongodb()
    test_firecrawl()
    test_llm()
    print("\n✅ Verification Complete")

if __name__ == "__main__":
    asyncio.run(main())
