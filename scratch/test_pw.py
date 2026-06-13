import asyncio
from playwright.async_api import async_playwright

async def run():
    print("Starting Playwright...")
    pw = await async_playwright().start()
    print("Launching Chromium...")
    b = await pw.chromium.launch(headless=True)
    print("Opening page...")
    p = await b.new_page()
    print("Navigating...")
    await p.goto('http://localhost:5173/')
    print("Title:", await p.title())
    await b.close()
    await pw.stop()
    print("Done!")

asyncio.run(run())
