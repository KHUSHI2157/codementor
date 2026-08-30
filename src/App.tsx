import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProgressProvider } from '@/context/ProgressContext';
import { LandingPage } from '@/pages/LandingPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { LanguagesPage, TopicsPage } from '@/pages/LanguagesPage';
import { ProblemsPage } from '@/pages/ProblemsPage';
import { ProblemDetailsPage } from '@/pages/ProblemDetailsPage';
import { CodeEditorPage } from '@/pages/CodeEditorPage';
import { ProgressPage } from '@/pages/ProgressPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/languages" element={<LanguagesPage />} />
          <Route path="/languages/:languageId" element={<TopicsPage />} />
          <Route path="/problems" element={<ProblemsPage />} />
          <Route path="/problems/:problemId" element={<ProblemDetailsPage />} />
          <Route path="/problems/:problemId/code" element={<CodeEditorPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ProgressProvider>
  );
}

export default App;
