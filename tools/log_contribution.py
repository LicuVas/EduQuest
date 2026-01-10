#!/usr/bin/env python3
"""
EduQuest Contribution Logger
Logs all changes with attribution for tracking purposes.

Usage:
  python log_contribution.py "Phase 2.1" "Simplificare text Brianna" file1.js file2.css
"""

import json
import sys
from datetime import datetime
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
DATA_DIR = BASE_DIR / "data"
CONTRIBUTIONS_FILE = DATA_DIR / "contributions.jsonl"

# Ensure data directory exists
DATA_DIR.mkdir(parents=True, exist_ok=True)


def log_contribution(phase: str, description: str, files: list, agent: str = "Claude Opus 4.5"):
    """Log a contribution to the JSONL file"""

    entry = {
        "timestamp": datetime.now().isoformat(),
        "agent": agent,
        "phase": phase,
        "files": files,
        "description": description
    }

    # Append to JSONL file
    with open(CONTRIBUTIONS_FILE, "a", encoding="utf-8") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")

    print(f"[OK] Logged contribution: {phase} - {description}")
    print(f"     Files: {', '.join(files)}")
    return entry


def get_contributions(limit: int = 10) -> list:
    """Get recent contributions"""
    contributions = []

    if CONTRIBUTIONS_FILE.exists():
        with open(CONTRIBUTIONS_FILE, "r", encoding="utf-8") as f:
            for line in f:
                if line.strip():
                    contributions.append(json.loads(line))

    return contributions[-limit:]


def print_summary():
    """Print contribution summary"""
    contributions = get_contributions(20)

    print("\n" + "=" * 60)
    print("  EduQuest Contribution Log")
    print("=" * 60)

    if not contributions:
        print("  No contributions recorded yet.")
    else:
        for c in contributions:
            ts = c.get("timestamp", "")[:19].replace("T", " ")
            phase = c.get("phase", "?")
            desc = c.get("description", "")
            print(f"\n  [{ts}] Phase {phase}")
            print(f"  {desc}")
            print(f"  Files: {', '.join(c.get('files', []))}")

    print("\n" + "=" * 60)


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python log_contribution.py <phase> <description> [files...]")
        print("       python log_contribution.py --summary")
        sys.exit(1)

    if sys.argv[1] == "--summary":
        print_summary()
    else:
        phase = sys.argv[1]
        description = sys.argv[2]
        files = sys.argv[3:] if len(sys.argv) > 3 else []

        log_contribution(phase, description, files)
