"""
EduQuest Server - Local Educational Platform with Grok AI Integration
Serves the web app and handles API requests including AI tutoring
"""

import os
import sys
import json
import http.server
import socketserver
import webbrowser
import socket
from pathlib import Path
from urllib.parse import urlparse, parse_qs

# Add api directory to path for imports
sys.path.insert(0, str(Path(__file__).parent / "api"))

PORT = 8080
APP_DIR = Path(__file__).parent / "app"
CONFIG_PATH = Path(__file__).parent / "config.json"
DATA_DIR = Path(__file__).parent / "data"

# Load configuration
def load_config():
    if CONFIG_PATH.exists():
        return json.loads(CONFIG_PATH.read_text(encoding='utf-8'))
    return {}

config = load_config()

class EduQuestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom handler for EduQuest with AI integration"""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(APP_DIR), **kwargs)
    
    def do_GET(self):
        """Handle GET requests"""
        parsed = urlparse(self.path)
        
        if parsed.path.startswith('/api/'):
            self.handle_api(parsed.path, parse_qs(parsed.query))
            return
        
        super().do_GET()
    
    def do_POST(self):
        """Handle POST requests"""
        parsed = urlparse(self.path)
        
        if parsed.path.startswith('/api/'):
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode('utf-8')
            data = json.loads(body) if body else {}
            self.handle_api_post(parsed.path, data)
            return
        
        self.send_error(404)
    
    def do_OPTIONS(self):
        """Handle CORS preflight"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def handle_api(self, path, params):
        """Handle API GET requests"""
        if path == '/api/health':
            self.send_json({
                'status': 'ok', 
                'message': 'EduQuest is running!',
                'ai_enabled': bool(config.get('api', {}).get('api_key'))
            })
        elif path == '/api/stats':
            user = params.get('user', ['rebecca'])[0]
            stats = self.load_user_stats(user)
            self.send_json(stats)
        elif path == '/api/config':
            # Return safe config (without API key)
            safe_config = {
                'app': config.get('app', {}),
                'users': config.get('users', {}),
                'rewards': config.get('rewards', {})
            }
            self.send_json(safe_config)
        else:
            self.send_json({'error': 'Unknown endpoint'}, 404)
    
    def handle_api_post(self, path, data):
        """Handle API POST requests"""
        if path == '/api/stats':
            user = data.get('user', 'rebecca')
            stats = data.get('stats', {})
            self.save_user_stats(user, stats)
            self.send_json({'success': True})
        
        elif path == '/api/chat':
            message = data.get('message', '')
            user = data.get('user', 'rebecca')
            response = self.get_ai_response(message, user)
            self.send_json({'response': response})
        
        elif path == '/api/generate-exercise':
            subject = data.get('subject', 'matematica')
            grade = data.get('grade', 3)
            difficulty = data.get('difficulty', 'medium')
            exercise = self.generate_ai_exercise(subject, grade, difficulty)
            self.send_json(exercise)
        
        elif path == '/api/analyze':
            user = data.get('user', 'rebecca')
            stats = self.load_user_stats(user)
            analysis = self.analyze_progress(user, stats)
            self.send_json({'analysis': analysis})

        elif path == '/api/feedback':
            # Save feedback for analysis
            self.save_feedback(data)
            self.send_json({'success': True, 'message': 'Feedback saved'})

        else:
            self.send_json({'error': 'Unknown endpoint'}, 404)
    
    def send_json(self, data, status=200):
        """Send JSON response with CORS headers"""
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode('utf-8'))
    
    def load_user_stats(self, user):
        """Load user stats from file"""
        stats_file = DATA_DIR / f"{user}_stats.json"
        if stats_file.exists():
            return json.loads(stats_file.read_text(encoding='utf-8'))
        return {'totalPoints': 0, 'questsCompleted': 0, 'streak': 0}
    
    def save_user_stats(self, user, stats):
        """Save user stats to file"""
        DATA_DIR.mkdir(exist_ok=True)
        stats_file = DATA_DIR / f"{user}_stats.json"
        stats_file.write_text(json.dumps(stats, indent=2, ensure_ascii=False), encoding='utf-8')

    def save_feedback(self, data):
        """Save feedback for later analysis"""
        from datetime import datetime

        feedback_dir = DATA_DIR / "feedback"
        feedback_dir.mkdir(exist_ok=True)

        # Add timestamp
        data['timestamp'] = datetime.now().isoformat()

        # Generate unique filename
        filename = f"feedback_{datetime.now().strftime('%Y%m%d_%H%M%S')}_{data.get('user', 'unknown')}.json"
        feedback_file = feedback_dir / filename

        feedback_file.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding='utf-8')
        print(f"[Feedback] Saved: {filename}")
    
    def get_ai_response(self, message, user='rebecca'):
        """Get AI response using Grok API"""
        try:
            from grok_client import chat
            return chat(message, user=user, context='tutor')
        except ImportError:
            return self.get_fallback_response(message)
        except Exception as e:
            print(f"AI Error: {e}")
            return self.get_fallback_response(message)
    
    def get_fallback_response(self, message):
        """Fallback responses when AI is not available"""
        msg_lower = message.lower()
        
        responses = {
            'tabla': '📊 **Tabla înmulțirii** te ajută să calculezi rapid!\n\nExemplu:\n• 2 × 3 = 6\n• 3 × 4 = 12\n\n💡 Începe cu tabla lui 2, apoi 5!',
            'substantiv': '📝 **Substantivele** denumesc:\n• Ființe: pisică, copil\n• Lucruri: masă, carte\n• Locuri: școală, parc',
            'color': '🎨 **Colors:**\n• Red = Roșu\n• Blue = Albastru\n• Green = Verde\n• Yellow = Galben',
            'salut': 'Bună! 👋 Cu ce te pot ajuta azi?',
            'buna': 'Bună! 👋 Sunt EduBot, asistentul tău de învățare!',
            'multumesc': 'Cu plăcere! 😊 Sunt mereu aici să te ajut!',
            'ajutor': 'Pot să te ajut cu:\n• 📕 Română\n• 🔢 Matematică\n• 🇬🇧 Engleză\n\nÎntreabă-mă orice!'
        }
        
        for key, response in responses.items():
            if key in msg_lower:
                return response
        
        return '🤔 Hmm, lasă-mă să mă gândesc...\n\nPoți să mă întrebi despre matematică, română sau engleză!'
    
    def generate_ai_exercise(self, subject, grade, difficulty):
        """Generate exercise using AI"""
        try:
            from grok_client import generate_exercise
            return generate_exercise(subject, grade, difficulty)
        except:
            # Fallback exercise
            return {
                'question': 'Cât face 5 + 3?',
                'type': 'math',
                'answer': 8,
                'hint': 'Numără pe degete!',
                'points': 10
            }
    
    def analyze_progress(self, user, stats):
        """Analyze user progress"""
        try:
            from grok_client import analyze_progress
            return analyze_progress(user, stats)
        except:
            return f"📊 {user.capitalize()} are {stats.get('totalPoints', 0)} puncte și {stats.get('questsCompleted', 0)} misiuni completate!"

def get_local_ip():
    """Get local IP address for network access"""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "localhost"

def main():
    """Start the EduQuest server"""
    print("=" * 55)
    print("  🎮 EduQuest - Platformă Educațională AI")
    print("  Pentru Rebecca & Brianna")
    print("=" * 55)
    
    # Ensure directories exist
    if not APP_DIR.exists():
        print(f"❌ Error: App directory not found at {APP_DIR}")
        return
    
    DATA_DIR.mkdir(exist_ok=True)
    
    # Check AI availability
    ai_key = config.get('api', {}).get('api_key', '')
    if ai_key:
        print("\n✅ Grok AI: Configurat și gata!")
    else:
        print("\n⚠️  Grok AI: Nu este configurat (funcționează offline)")
    
    # Get network info
    local_ip = get_local_ip()
    
    print(f"\n📱 Accesează de pe telefon:")
    print(f"   http://{local_ip}:{PORT}")
    print(f"\n💻 Sau de pe acest computer:")
    print(f"   http://localhost:{PORT}")
    print(f"\n🛑 Pentru a opri serverul: Ctrl+C")
    print("=" * 55)
    
    # Allow reuse of address
    socketserver.TCPServer.allow_reuse_address = True
    
    # Start server
    with socketserver.TCPServer(("", PORT), EduQuestHandler) as httpd:
        # Open in browser
        webbrowser.open(f"http://localhost:{PORT}")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n👋 EduQuest oprit. La revedere!")
            print("   Spor la învățat, Rebecca și Brianna! 🌟")

if __name__ == "__main__":
    main()
