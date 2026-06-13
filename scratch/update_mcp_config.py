import json

path = r"C:\Users\USER-PC\.gemini\config\mcp_config.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

# Update TestSprite args
if "TestSprite" in data.get("mcpServers", {}):
    args = data["mcpServers"]["TestSprite"].get("args", [])
    if "-y" not in args:
        data["mcpServers"]["TestSprite"]["args"] = ["-y"] + args
        print("Updated TestSprite args to include -y")
    else:
        print("TestSprite args already include -y")
else:
    print("TestSprite not found in mcp_config.json")

with open(path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)
