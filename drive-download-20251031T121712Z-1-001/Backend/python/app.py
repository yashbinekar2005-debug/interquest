from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from datetime import datetime

# ✅ Correct imports — no fallback bullshit
from web_scrapers.skill_scraper import SkillScraper
from web_scrapers.job_scraper import JobScraper
from web_scrapers.chat_scraper import ChatScraper
from web_scrapers.ai_interviewer import AIInterviewer
from web_scrapers.resume_generator import ResumeGenerator

app = Flask(__name__)
CORS(app)

# ✅ Initialize scrapers
skill_scraper = SkillScraper()
job_scraper = JobScraper()
chat_scraper = ChatScraper()
ai_interviewer = AIInterviewer()
resume_generator = ResumeGenerator()


@app.route('/')
def home():
    return jsonify({"message": "InternQuest API is running!", "status": "success"})


# @app.route('/api/analyze-skills', methods=['POST'])
# def analyze_skills():
#     data = request.json
#     user_skills = data.get('skills', [])
#     desired_job = data.get('desired_job', '')
    
#     result = skill_scraper.analyze_skills(user_skills, desired_job)
#     return jsonify(result)
@app.route('/api/analyze-skills', methods=['POST'])
def analyze_skills():
    data = request.get_json()
    user_skills = [s.strip().lower() for s in data.get('user_skills', '').split(',')]
    desired_job = data.get('desired_job', '').lower()

    all_skills = ["python", "javascript", "react", "sql", "machine learning", "html", "css"]
    matched = [s for s in user_skills if s in all_skills]
    missing = [s for s in all_skills if s not in user_skills]

    match_percentage = round((len(matched) / len(all_skills)) * 100)

    return jsonify({
        "match_percentage": match_percentage,
        "matched_skills": matched,
        "skills_to_improve": missing
    })




@app.route('/api/search-jobs', methods=['POST'])
def search_jobs():
    data = request.json
    job_field = data.get('job_field', '')
    location = data.get('location', '')
    
    jobs = job_scraper.search_jobs(job_field, location)
    return jsonify({"jobs": jobs})


@app.route('/api/chat-support', methods=['POST'])
def chat_support():
    data = request.json
    message = data.get('message', '')
    
    response = chat_scraper.get_response(message)
    return jsonify({"response": response})


@app.route('/api/interview-questions', methods=['POST'])
def get_interview_questions():
    data = request.json
    field = data.get('field', '')
    level = data.get('level', 'beginner')
    
    questions = ai_interviewer.generate_questions(field, level)
    return jsonify({"questions": questions})


@app.route('/api/generate-resume', methods=['POST'])
def generate_resume():
    data = request.json
    resume_data = data.get('resume_data', {})

    pdf_path = resume_generator.generate_pdf(resume_data)

    return jsonify({
        "message": "✅ Resume generated successfully",
        "pdf_url": f"/download/{pdf_path}"
    })


@app.route('/download/<filename>')
def download_file(filename):
    try:
        return send_file(f"generated_resumes/{filename}", as_attachment=True)
    except Exception as e:
        return jsonify({"error": str(e)}), 404


if __name__ == '__main__':
    app.run(debug=True, port=5000)
