import json
import ast

log_path = r'C:\Users\USER-PC\.gemini\antigravity-ide\brain\73eb0d29-0380-4a46-8d96-2fc5456717b6\.system_generated\logs\transcript.jsonl'
with open(log_path, 'r', encoding='utf-8') as f:
    for i, line in enumerate(f):
        if i == 772:
            obj = json.loads(line)
            content_str = obj.get('content', '')
            
            # Find the starting brace of the tool call args dictionary representation
            start_idx = content_str.find("{'ArtifactMetadata'")
            if start_idx != -1:
                # ast.literal_eval is extremely safe and handles python dict syntax perfectly!
                args_dict = ast.literal_eval(content_str[start_idx:])
                code_content = args_dict['CodeContent']
                print("Extracted code content length:", len(code_content))
                
                # The code_content starts with "<!DOCTYPE html> ... let's write it to index.html under login
                with open('C:\\Users\\USER-PC\\Downloads\\stitch_artisan_marketplace_hub\\login\\index.html', 'w', encoding='utf-8') as out:
                    out.write(code_content)
                print("Wrote login/index.html successfully!")
