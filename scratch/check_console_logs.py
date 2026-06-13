import asyncio
from playwright.async_api import async_playwright

async def run():
    print("Starting Playwright...")
    pw = await async_playwright().start()
    b = await pw.chromium.launch(headless=True)
    p = await b.new_page()
    
    # Listen to console messages and page errors
    p.on("console", lambda msg: print(f"[CONSOLE {msg.type.upper()}] {msg.text}"))
    p.on("pageerror", lambda err: print(f"[PAGE ERROR] {err}"))
    
    # Navigate to homepage
    print("\
--- Navigating to Homepage ---")
    await p.goto('http://localhost:5173/')
    await asyncio.sleep(2)
    
    # Navigate to artists directory
    print("\
--- Navigating to Artists Directory ---")
    await p.goto('http://localhost:5173/artists.html')
    await asyncio.sleep(2)
    
    # Navigate to live auctions
    print("\
--- Navigating to Live Auctions ---")
    await p.goto('http://localhost:5173/live-auctions.html')
    await asyncio.sleep(2)
    
    # Navigate to browse gallery
    print("\
--- Navigating to Browse Gallery ---")
    await p.goto('http://localhost:5173/browse-gallery.html')
    await asyncio.sleep(2)
    
    # Navigate to login page
    print("\
--- Navigating to Login ---")
    await p.goto('http://localhost:5173/login')
    await asyncio.sleep(2)

    await b.close()
    await pw.stop()
    print("\
Done!")

asyncio.run(run())
