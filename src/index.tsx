import { createRoot } from 'react-dom/client';
// @ts-ignore
import App from './App.tsx';

const dom = document.getElementById('root');
if (dom) {
  const root = createRoot(dom);
  root.render(<App />);
}
