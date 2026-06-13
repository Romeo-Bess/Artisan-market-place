import os
import subprocess
import sys

# Ensure stdout uses UTF-8 to prevent unicode encoding errors on Windows
sys.stdout.reconfigure(encoding='utf-8')

def main():
    test_dir = "testsprite_tests"
    files = sorted([f for f in os.listdir(test_dir) if f.startswith("TC") and f.endswith(".py")])
    
    print(f"Found {len(files)} test files to run.")
    
    passed = []
    failed = []
    
    for f in files:
        path = os.path.join(test_dir, f)
        print(f"Running {f}...", end="", flush=True)
        try:
            res = subprocess.run([sys.executable, path], capture_output=True, text=True, timeout=30)
            if res.returncode == 0:
                print(" PASSED")
                passed.append(f)
            else:
                print(" FAILED")
                print(f"--- STDOUT ---\
{res.stdout}")
                print(f"--- STDERR ---\
{res.stderr}")
                failed.append((f, res.stdout, res.stderr))
        except subprocess.TimeoutExpired:
            print(" TIMEOUT")
            failed.append((f, "TIMEOUT", "TIMEOUT"))
        except Exception as e:
            print(f" ERROR: {str(e)}")
            failed.append((f, str(e), ""))
            
    print("\
=== SUMMARY ===")
    print(f"Passed: {len(passed)}")
    print(f"Failed: {len(failed)}")
    for f, out, err in failed:
        print(f"  - {f}")

if __name__ == "__main__":
    main()
