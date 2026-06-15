import json

transcript_path = "/Users/heenatewani/.gemini/antigravity/brain/17e0f2e5-cdaf-48e1-b882-372807d41359/.system_generated/logs/transcript.jsonl"

file_chunks = {}

with open(transcript_path, 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get("type") == "PLANNER_RESPONSE":
                # Look for view_file output in the next steps or directly in the response
                pass
            if data.get("source") == "SYSTEM" and "response:default_api:view_file" in str(data):
                content = data.get("content", "")
                if "page.tsx" in content and "Showing lines" in content:
                    print("Found view_file output")
                    # Extract the lines
                    lines = content.split("The following code has been modified to include a line number before every line")[1].split("The above content")[0]
                    for l in lines.strip().split("\n"):
                        if ":" in l:
                            parts = l.split(":", 1)
                            if parts[0].isdigit():
                                line_num = int(parts[0])
                                file_chunks[line_num] = parts[1][1:] if parts[1].startswith(" ") else parts[1]
            # Also check if there's any multi_replace output that might give us the full file
        except Exception as e:
            pass

with open("recovered_page.tsx", "w") as out:
    for i in sorted(file_chunks.keys()):
        out.write(file_chunks[i] + "\n")

print(f"Recovered {len(file_chunks)} lines")
