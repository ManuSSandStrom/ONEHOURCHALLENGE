import { useState } from 'react';
import { FiTrendingDown, FiTarget, FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function CalorieCalculator({ onClose }) {
  const [formData, setFormData] = useState({
    gender: 'male',
    age: '',
    height: '',
    weight: '',
    activity: '1.2'
  });
  const [results, setResults] = useState(null);

  const calculate = (e) => {
    e.preventDefault();
    const { gender, age, height, weight, activity } = formData;

    if (!age || !height || !weight) {
      toast.error('Please fill in all fields');
      return;
    }

    let bmr;
    if (gender === 'male') {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    const maintenance = Math.round(bmr * parseFloat(activity));
    
    setResults({
      bmr: Math.round(bmr),
      maintenance,
      fatLoss: maintenance - 500,
      muscleGain: maintenance + 300
    });
  };

  const handlePlanClick = () => {
    const pricing = document.getElementById('pricing');
    if (pricing) {
      pricing.scrollIntoView({ behavior: 'smooth' });
    }
    if (onClose) onClose();
  };

  return (
    <div className="calc-container">
      <form className="calc-form" onSubmit={calculate}>
        <div className="calc-input-group">
          <label className="calc-label">Gender</label>
          <div className="pricing-toggle" style={{ marginTop: 0 }}>
            <button
              type="button"
              className={`pricing-toggle-btn ${formData.gender === 'male' ? 'active' : ''}`}
              onClick={() => setFormData({ ...formData, gender: 'male' })}
            >
              Male
            </button>
            <button
              type="button"
              className={`pricing-toggle-btn ${formData.gender === 'female' ? 'active' : ''}`}
              onClick={() => setFormData({ ...formData, gender: 'female' })}
            >
              Female
            </button>
          </div>
        </div>

        <div className="calc-grid">
          <div className="calc-input-group">
            <label className="calc-label">Age (years)</label>
            <input
              type="number"
              className="calc-input"
              placeholder="e.g. 25"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            />
          </div>
          <div className="calc-input-group">
            <label className="calc-label">Weight (kg)</label>
            <input
              type="number"
              className="calc-input"
              placeholder="e.g. 70"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            />
          </div>
        </div>

        <div className="calc-input-group">
          <label className="calc-label">Height (cm)</label>
          <input
            type="number"
            className="calc-input"
            placeholder="e.g. 175"
            value={formData.height}
            onChange={(e) => setFormData({ ...formData, height: e.target.value })}
          />
        </div>

        <div className="calc-input-group">
          <label className="calc-label">Activity Level</label>
          <select
            className="calc-select"
            value={formData.activity}
            onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
          >
            <option value="1.2">Minimal Movement (Desk job, sedentary lifestyle)</option>
            <option value="1.375">Casual Fitness (1-2 light sessions/week)</option>
            <option value="1.55">Active Lifestyle (3-5 focused sessions/week)</option>
            <option value="1.725">Serious Athlete (6-7 intense training sessions/week)</option>
            <option value="1.9">Performance Elite (Intense physical work or pro athlete)</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
          Calculate Calories
        </button>
      </form>

      {results && (
        <div className="calc-result-card">
          <div className="result-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FiTarget style={{ color: 'var(--color-gray-500)' }} />
              <span className="result-label">Maintenance</span>
            </div>
            <span className="result-value">{results.maintenance} <small style={{ fontSize: '0.6rem', color: 'var(--color-gray-500)' }}>kcal</small></span>
          </div>
          <div className="result-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FiTrendingDown style={{ color: '#ff5252' }} />
              <span className="result-label">Fat Loss</span>
            </div>
            <span className="result-value" style={{ color: '#ff5252' }}>{results.fatLoss} <small style={{ fontSize: '0.6rem', color: 'var(--color-gray-500)' }}>kcal</small></span>
          </div>
          <div className="result-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FiTrendingUp style={{ color: '#4caf50' }} />
              <span className="result-label">Muscle Gain</span>
            </div>
            <span className="result-value" style={{ color: '#4caf50' }}>{results.muscleGain} <small style={{ fontSize: '0.6rem', color: 'var(--color-gray-500)' }}>kcal</small></span>
          </div>

          <div className="calc-cta">
            <p style={{ marginBottom: '16px' }}>Based on your results, our structured 1-hour sessions can help you reach your goal faster.</p>
            <button className="btn btn-primary btn-sm" onClick={handlePlanClick} style={{ width: '100%' }}>
              View Our Plans <FiArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
