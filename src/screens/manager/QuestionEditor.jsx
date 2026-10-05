import React, { useState } from 'react';
import { 
  Code, 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  UploadCloud,
  FileText
} from 'lucide-react';

export default function QuestionEditor({ onBack, onComplete }) {
  const [skill, setSkill] = useState('Reading');
  const [title, setTitle] = useState('Passage 3: Deep-Sea Hydrothermal Vent Ecosystems');
  const [passageText, setPassageText] = useState(`Paragraph A: Located thousands of meters below the sunlit surface of the ocean, hydrothermal vents support unique biological communities that thrive in extreme darkness, crushing pressure, and superheated mineral fluids...\n\nParagraph B: Unlike terrestrial ecosystems governed by photosynthetic primary producers, vent fauna rely predominantly on chemosynthetic bacteria which oxidize hydrogen sulfide...`);
  
  const [questions, setQuestions] = useState([
    {
      id: 1,
      prompt: 'Chemosynthetic bacteria depend on solar radiation to metabolize minerals.',
      type: 'True/False/Not Given',
      correctKey: 'FALSE',
      explanation: 'Paragraph B explicitly states vent fauna rely on chemosynthesis which oxidizes hydrogen sulfide rather than photosynthesis.'
    },
    {
      id: 2,
      prompt: 'Maximum temperature recorded at black smoker vent orifices:',
      type: 'Short Answer / Number',
      correctKey: '400 degrees Celsius',
      explanation: 'Paragraph C confirms measurements reaching 400 degrees Celsius.'
    }
  ]);

  const [saved, setSaved] = useState(false);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        prompt: 'New Question Prompt...',
        type: 'Multiple Choice',
        correctKey: 'Option A',
        explanation: 'Reference text quote...'
      }
    ]);
  };

  const removeQuestion = (idx) => {
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 1800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '950px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn-secondary btn-sm" onClick={onBack}>
          <ArrowLeft size={14} />
          <span>Back to Question Bank</span>
        </button>
        <span className="badge badge-red">WYSIWYG Item Authoring Studio</span>
      </div>

      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '800' }}>
          Author Question & Passage Asset
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>
          Create reading passages, listening audio scripts, answer key matrices, and rationale explanations.
        </p>
      </div>

      {saved ? (
        <div className="edu-card" style={{ padding: '36px', textAlign: 'center' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--accent-green-light)', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <CheckCircle2 size={30} />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Question Item Saved!</h2>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Added to Edumax Private Question Bank with {questions.length} validated answer keys.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Metadata Card */}
          <div className="edu-card" style={{ padding: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Asset Title</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Skill Domain</label>
                <select 
                  className="form-select"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                >
                  <option value="Reading">Reading Passage</option>
                  <option value="Listening">Listening Section & Audio</option>
                  <option value="Writing">Writing Task Prompt</option>
                  <option value="Speaking">Speaking Script & Cue Card</option>
                </select>
              </div>
            </div>
          </div>

          {/* Passage or Audio Uploader */}
          <div className="edu-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px' }}>
              {skill === 'Listening' ? 'Audio Track & Transcript' : 'Passage Text & Stimulus Content'}
            </h3>

            {skill === 'Listening' && (
              <div style={{ padding: '20px', border: '2px dashed var(--border-color)', borderRadius: '10px', textAlign: 'center', marginBottom: '14px', background: '#F8FAFC' }}>
                <UploadCloud size={28} color="var(--primary-red)" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontSize: '13.5px', fontWeight: '700' }}>Upload High-Fidelity Audio File (.mp3, .wav)</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>British / Australian native accents recommended. Max 50MB.</div>
              </div>
            )}

            <textarea 
              className="form-textarea" 
              rows={8}
              value={passageText}
              onChange={(e) => setPassageText(e.target.value)}
              placeholder="Paste reading passage or listening audio transcript here..."
              required
            />
          </div>

          {/* Questions & Answer Key Authoring */}
          <div className="edu-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '700' }}>Question Items & Official Keys ({questions.length})</h3>
              <button type="button" className="btn btn-secondary btn-sm" onClick={addQuestion}>
                <Plus size={14} />
                <span>Add Question</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {questions.map((q, idx) => (
                <div key={idx} style={{ padding: '16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid var(--border-color)', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontWeight: '800', color: 'var(--primary-red)', fontSize: '13px' }}>
                      Question #{idx + 1}
                    </span>
                    {questions.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeQuestion(idx)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444' }}
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '10px' }}>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Question prompt or statement..."
                      value={q.prompt}
                      onChange={(e) => {
                        const updated = [...questions];
                        updated[idx].prompt = e.target.value;
                        setQuestions(updated);
                      }}
                      required
                    />

                    <select 
                      className="form-select"
                      value={q.type}
                      onChange={(e) => {
                        const updated = [...questions];
                        updated[idx].type = e.target.value;
                        setQuestions(updated);
                      }}
                    >
                      <option value="True/False/Not Given">True / False / Not Given</option>
                      <option value="Multiple Choice">Multiple Choice</option>
                      <option value="Short Answer / Number">Fill in Blanks / Short Answer</option>
                      <option value="Headings Matching">Headings Matching</option>
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '12px' }}>
                    <div>
                      <label className="form-label" style={{ fontSize: '11px' }}>Accepted Answer Key</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={q.correctKey}
                        onChange={(e) => {
                          const updated = [...questions];
                          updated[idx].correctKey = e.target.value;
                          setQuestions(updated);
                        }}
                        placeholder="e.g. TRUE or 4, four"
                        required
                      />
                    </div>

                    <div>
                      <label className="form-label" style={{ fontSize: '11px' }}>Evidence Quote / Rationale</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={q.explanation}
                        onChange={(e) => {
                          const updated = [...questions];
                          updated[idx].explanation = e.target.value;
                          setQuestions(updated);
                        }}
                        placeholder="Passage paragraph reference..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button type="button" className="btn btn-secondary" onClick={onBack}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <Save size={15} />
                <span>Save Question to Bank</span>
              </button>
            </div>
          </div>

        </form>
      )}

    </div>
  );
}
