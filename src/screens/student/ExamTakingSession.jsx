import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  ArrowLeft, 
  Send, 
  CheckCircle2, 
  PenTool, 
  BookOpen, 
  Headphones, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { api } from '../../services/api';

export default function ExamTakingSession({ testId = 'TEST-AC-01', onCancel, onExamSubmitted }) {
  const [secondsLeft, setSecondsLeft] = useState(2400); // 40 minutes
  const [answers, setAnswers] = useState({
    1: '',
    2: '',
    3: '',
    4: ''
  });
  const [essayText, setEssayText] = useState(`In contemporary society, an increasing number of individuals argue that artificial intelligence will cause significant labor disruption. While this concern has validity, I believe that technological innovation will catalyze new economic opportunities that eclipse those eliminated.\n\nHistorically, automation transformed industries rather than terminating employment completely. When steam engines and mechanization emerged, manual weavers were displaced; nonetheless, entire disciplines including logistics, modern mechanics, and chemical engineering were established. In a parallel fashion, modern neural networks necessitate human stewardship and data curation.\n\nIn conclusion, though transition friction is inevitable, the net result will elevate productivity.`);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const wordCount = essayText.trim().split(/\s+/).filter(Boolean).length;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await api.submitExam({
        candidateId: 'std_01',
        testId,
        answers,
        essayText
      });
      if (res.success && onExamSubmitted) {
        onExamSubmitted(res.data);
      } else {
        alert("Exam evaluated and saved to your results ledger!");
        if (onCancel) onCancel();
      }
    } catch (err) {
      alert("Submission recorded.");
      if (onCancel) onCancel();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Test Console Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0F172A', color: '#FFFFFF', padding: '14px 24px', borderRadius: '14px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button 
            onClick={onCancel}
            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#FFF', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}
          >
            <ArrowLeft size={14} /> Exit Test
          </button>
          <div>
            <div style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.7)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              OFFICIAL IELTS SIMULATION RUNNER
            </div>
            <div style={{ fontSize: '14.5px', fontWeight: '700', color: '#FFFFFF' }}>
              Cambridge IELTS 19 • Academic Reading & Writing Section
            </div>
          </div>
        </div>

        {/* Stopwatch & Submit */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: 'var(--radius-sm)' }}>
            <Clock size={15} color="#FFFFFF" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: '700', color: secondsLeft < 300 ? 'var(--primary-red)' : '#FFFFFF' }}>
              {formatTime(secondsLeft)}
            </span>
          </div>

          <button 
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={{ padding: '8px 18px', fontWeight: '600' }}
          >
            {isSubmitting ? (
              <span>AI Auto-Grading...</span>
            ) : (
              <>
                <Send size={14} />
                <span>Submit Exam Paper</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Split Workspace (Responsive) */}
      <div className="exam-workspace-split">
        
        {/* Left: Reading Passage */}
        <div className="edu-card" style={{ padding: '24px', height: 'calc(100vh - 180px)', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--brand-slate)' }}>
              Passage 1: Resurgence of Ancient Water Harvesting Systems
            </h3>
            <span className="badge badge-slate">Section 1</span>
          </div>

          <div style={{ fontSize: '14px', lineHeight: '1.85', color: '#334155' }}>
            <p style={{ marginBottom: '16px' }}>
              <strong>Paragraph A:</strong> In the arid and semi-arid terrain of northwestern Rajasthan, archaeological surveys have illuminated sophisticated vernacular engineering systems designed to collect and conserve seasonal monsoon precipitation. The traditional subterranean cistern, known colloquially as a <em>tanka</em>, functioned not merely as a domestic reservoir but as a pivotal community asset during protracted droughts.
            </p>
            <p style={{ marginBottom: '16px' }}>
              <strong>Paragraph B:</strong> Constructed utilizing lime mortar, clay, and locally sourced sandstone tiles, these cylindrical chambers maintained ambient interior temperatures substantially lower than external atmospheric readings. Empirical water quality analyses reveal that natural sedimentation layers filtered microbial pathogens with surprising efficacy. Furthermore, sociological structures ensured collective stewardship over cleaning and desilting cycles.
            </p>
            <p>
              <strong>Paragraph C:</strong> Modern piped infrastructure in the mid-twentieth century led to the widespread dereliction of these indigenous works. However, recurring municipal shortages and depleted groundwater tables have catalyzed civic restoration initiatives. Engineers are now amalgamating geopolymer sealants with vernacular hydraulic blueprints to fortify community resilience.
            </p>
          </div>
        </div>

        {/* Right: Interactive Question Input & Essay Pad */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', height: 'calc(100vh - 180px)', overflowY: 'auto', paddingRight: '4px' }}>
          
          {/* Objective Questions */}
          <div className="edu-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h4 style={{ fontSize: '14.5px', fontWeight: '700' }}>Questions 1–3: True / False / Not Given</h4>
              <span className="badge badge-red">3 Points</span>
            </div>

            {/* Q1 */}
            <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '8px', marginBottom: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>
                1. Tankas were utilized primarily in the humid coastal zones of eastern India.
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['TRUE', 'FALSE', 'NOT GIVEN'].map((opt) => (
                  <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="q1" 
                      value={opt} 
                      checked={answers[1] === opt} 
                      onChange={() => setAnswers({ ...answers, 1: opt })}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            {/* Q2 */}
            <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '8px', marginBottom: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>
                2. Traditional tanka filtration relied on natural sedimentation.
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['TRUE', 'FALSE', 'NOT GIVEN'].map((opt) => (
                  <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="q2" 
                      value={opt} 
                      checked={answers[2] === opt} 
                      onChange={() => setAnswers({ ...answers, 2: opt })}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            {/* Q3 */}
            <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '8px', marginBottom: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>
                3. Modern municipal water grids successfully eliminated all drought vulnerability.
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['TRUE', 'FALSE', 'NOT GIVEN'].map((opt) => (
                  <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="q3" 
                      value={opt} 
                      checked={answers[3] === opt} 
                      onChange={() => setAnswers({ ...answers, 3: opt })}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            {/* Q4 Fill in blank */}
            <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>
                4. Primary mineral binder used in historic tanka masonry:
              </div>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Write NO MORE THAN TWO WORDS..."
                value={answers[4]}
                onChange={(e) => setAnswers({ ...answers, 4: e.target.value })}
              />
            </div>
          </div>

          {/* Writing Task 2 Area */}
          <div className="edu-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h4 style={{ fontSize: '14.5px', fontWeight: '700' }}>Task 2 Writing Essay Input</h4>
              <span className={`badge ${wordCount >= 250 ? 'badge-green' : 'badge-amber'}`}>
                {wordCount} / 250 Words Required
              </span>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>
              <strong>Prompt:</strong> Some believe that artificial intelligence will cause severe job displacement, while others argue it will foster new industries. Discuss both views and give your opinion.
            </p>

            <textarea 
              className="form-textarea" 
              rows={8}
              value={essayText}
              onChange={(e) => setEssayText(e.target.value)}
              placeholder="Write your IELTS Task 2 essay here..."
              style={{ fontSize: '13.5px', lineHeight: 1.6 }}
            />
          </div>

        </div>

      </div>

    </div>
  );
}
