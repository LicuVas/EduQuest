#!/usr/bin/env python3
"""
EduQuest Feedback Analyzer
Runs every 5 minutes:
- Full analysis workflow if feedback exists
- Health check if no feedback

Usage: python feedback_analyzer.py
"""

import json
import time
import os
import sys
from pathlib import Path
from datetime import datetime
from typing import List, Dict, Optional

# Configuration
INTERVAL = 300  # 5 minutes
SERVER_URL = "http://localhost:8080"
BASE_DIR = Path(__file__).parent.parent
DATA_DIR = BASE_DIR / "data"
FEEDBACK_DIR = DATA_DIR / "feedback"
CONFIG_FILE = BASE_DIR / "config.json"
LOG_FILE = DATA_DIR / "analyzer.log"

# Ensure directories exist
FEEDBACK_DIR.mkdir(parents=True, exist_ok=True)


def log(message: str, level: str = "INFO"):
    """Log message to file and console"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_line = f"[{timestamp}] [{level}] {message}"
    print(log_line)

    try:
        with open(LOG_FILE, "a", encoding="utf-8") as f:
            f.write(log_line + "\n")
    except:
        pass


def check_new_feedback() -> List[Path]:
    """Check for unprocessed feedback files"""
    if not FEEDBACK_DIR.exists():
        return []

    feedback_files = list(FEEDBACK_DIR.glob("*.json"))
    return [f for f in feedback_files if not f.name.endswith(".processed.json")]


def load_config() -> Dict:
    """Load application config"""
    try:
        with open(CONFIG_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        log(f"Error loading config: {e}", "ERROR")
        return {}


def save_config(config: Dict):
    """Save application config"""
    try:
        with open(CONFIG_FILE, "w", encoding="utf-8") as f:
            json.dump(config, f, indent=4, ensure_ascii=False)
        log("Config saved successfully")
    except Exception as e:
        log(f"Error saving config: {e}", "ERROR")


def analyze_feedback(feedback_data: Dict) -> Dict:
    """Analyze feedback and return insights"""
    insights = {
        "user": feedback_data.get("user", "unknown"),
        "subject": feedback_data.get("subject", "unknown"),
        "correct": 0,
        "total": 0,
        "accuracy": 0,
        "time_spent": 0,
        "difficulty_adjustment": None
    }

    questions = feedback_data.get("questions", [])
    insights["total"] = len(questions)
    insights["correct"] = sum(1 for q in questions if q.get("correct", False))

    if insights["total"] > 0:
        insights["accuracy"] = round(insights["correct"] / insights["total"] * 100, 1)

    # Calculate time spent
    if "start_time" in feedback_data and "end_time" in feedback_data:
        try:
            start = datetime.fromisoformat(feedback_data["start_time"])
            end = datetime.fromisoformat(feedback_data["end_time"])
            insights["time_spent"] = (end - start).total_seconds()
        except:
            pass

    # Difficulty adjustment recommendation
    if insights["accuracy"] >= 90:
        insights["difficulty_adjustment"] = "increase"
        log(f"User {insights['user']} excelling in {insights['subject']} - recommend harder content")
    elif insights["accuracy"] < 50:
        insights["difficulty_adjustment"] = "decrease"
        log(f"User {insights['user']} struggling in {insights['subject']} - recommend easier content")
    else:
        insights["difficulty_adjustment"] = "maintain"

    return insights


def update_user_difficulty(user: str, subject: str, adjustment: str, config: Dict):
    """Update user difficulty level in config"""
    if "difficulty" not in config:
        config["difficulty"] = {}

    if user not in config["difficulty"]:
        config["difficulty"][user] = {}

    current = config["difficulty"][user].get(subject, "medium")
    levels = ["easy", "medium", "hard"]

    try:
        current_idx = levels.index(current)
    except ValueError:
        current_idx = 1  # default to medium

    if adjustment == "increase" and current_idx < 2:
        config["difficulty"][user][subject] = levels[current_idx + 1]
        log(f"Increased {user}'s {subject} difficulty to {levels[current_idx + 1]}")
    elif adjustment == "decrease" and current_idx > 0:
        config["difficulty"][user][subject] = levels[current_idx - 1]
        log(f"Decreased {user}'s {subject} difficulty to {levels[current_idx - 1]}")


def process_feedback(feedback_file: Path) -> bool:
    """Process a single feedback file"""
    try:
        with open(feedback_file, "r", encoding="utf-8") as f:
            feedback_data = json.load(f)

        log(f"Processing feedback: {feedback_file.name}")

        # Analyze
        insights = analyze_feedback(feedback_data)
        log(f"  User: {insights['user']}, Subject: {insights['subject']}")
        log(f"  Accuracy: {insights['accuracy']}% ({insights['correct']}/{insights['total']})")

        # Update config if needed
        if insights["difficulty_adjustment"] in ["increase", "decrease"]:
            config = load_config()
            update_user_difficulty(
                insights["user"],
                insights["subject"],
                insights["difficulty_adjustment"],
                config
            )
            save_config(config)

        # Save insights
        insights_file = feedback_file.with_suffix(".insights.json")
        with open(insights_file, "w", encoding="utf-8") as f:
            json.dump(insights, f, indent=2, ensure_ascii=False)

        # Mark as processed
        processed_file = feedback_file.with_suffix(".processed.json")
        feedback_file.rename(processed_file)

        log(f"  Processed and saved insights to {insights_file.name}")
        return True

    except Exception as e:
        log(f"Error processing {feedback_file.name}: {e}", "ERROR")
        return False


def process_all_feedback(files: List[Path]):
    """Process all pending feedback files"""
    log(f"Processing {len(files)} feedback file(s)")

    success = 0
    for f in files:
        if process_feedback(f):
            success += 1

    log(f"Processed {success}/{len(files)} files successfully")


def health_check() -> bool:
    """Perform server health check"""
    try:
        import urllib.request
        import urllib.error

        req = urllib.request.Request(f"{SERVER_URL}/api/health", method="GET")
        with urllib.request.urlopen(req, timeout=5) as response:
            if response.status == 200:
                return True
    except urllib.error.URLError:
        pass
    except Exception as e:
        log(f"Health check error: {e}", "WARN")

    return False


def get_stats() -> Dict:
    """Get current statistics"""
    stats = {
        "total_feedback_files": 0,
        "processed_files": 0,
        "pending_files": 0
    }

    if FEEDBACK_DIR.exists():
        all_files = list(FEEDBACK_DIR.glob("*.json"))
        stats["total_feedback_files"] = len(all_files)
        stats["processed_files"] = len([f for f in all_files if ".processed." in f.name])
        stats["pending_files"] = len([f for f in all_files if ".processed." not in f.name and ".insights." not in f.name])

    return stats


def main_loop():
    """Main loop - runs every INTERVAL seconds"""
    log("=" * 50)
    log("EduQuest Feedback Analyzer Started")
    log(f"Interval: {INTERVAL} seconds")
    log(f"Data directory: {DATA_DIR}")
    log("=" * 50)

    while True:
        try:
            # Check for new feedback
            feedback_files = check_new_feedback()

            if feedback_files:
                log(f"Found {len(feedback_files)} new feedback file(s)")
                process_all_feedback(feedback_files)
            else:
                # Just do health check
                server_status = "OK" if health_check() else "OFFLINE"
                stats = get_stats()
                log(f"Health: {server_status} | Pending: {stats['pending_files']} | Processed: {stats['processed_files']}")

        except KeyboardInterrupt:
            log("Shutdown requested")
            break
        except Exception as e:
            log(f"Main loop error: {e}", "ERROR")

        # Wait for next interval
        time.sleep(INTERVAL)

    log("Feedback Analyzer stopped")


def run_once():
    """Run analysis once and exit"""
    log("Running single analysis...")
    feedback_files = check_new_feedback()

    if feedback_files:
        process_all_feedback(feedback_files)
    else:
        log("No pending feedback files")
        stats = get_stats()
        log(f"Stats: {stats}")

    server_status = "OK" if health_check() else "OFFLINE"
    log(f"Server status: {server_status}")


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--once":
        run_once()
    else:
        main_loop()
