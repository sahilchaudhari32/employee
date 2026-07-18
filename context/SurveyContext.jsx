import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'smart-field-surveys';
const sampleSurvey = { id: 'SF-1001', siteName: 'Riverside Warehouse', clientName: 'Acme Logistics', description: 'Quarterly safety inspection', priority: 'High', date: new Date().toISOString().slice(0, 10), status: 'Completed', contact: '', photo: null, location: null, notes: '' };
const SurveyContext = createContext(null);

export function SurveyProvider({ children }) {
  const [surveys, setSurveys] = useState([sampleSurvey]);
  const [draft, setDraft] = useState({ siteName: '', clientName: '', description: '', priority: 'Medium', date: new Date().toISOString().slice(0, 10), contact: '', photo: null, location: null, notes: '' });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { AsyncStorage.getItem(STORAGE_KEY).then((value) => { if (value) setSurveys(JSON.parse(value)); setLoaded(true); }).catch(() => setLoaded(true)); }, []);
  useEffect(() => { if (loaded) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(surveys)); }, [surveys, loaded]);
  const createSurvey = (data) => { const survey = { ...data, id: `SF-${Date.now().toString().slice(-6)}`, status: 'Completed' }; setSurveys((current) => [survey, ...current]); setDraft({ siteName: '', clientName: '', description: '', priority: 'Medium', date: new Date().toISOString().slice(0, 10), contact: '', photo: null, location: null, notes: '' }); return survey; };
  const deleteSurvey = (id) => setSurveys((current) => current.filter((survey) => survey.id !== id));
  const value = useMemo(() => ({ surveys, draft, setDraft, createSurvey, deleteSurvey }), [surveys, draft]);
  return <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>;
}
export const useSurveys = () => useContext(SurveyContext);
