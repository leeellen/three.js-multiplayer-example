import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route
                path="*"
                element={
                    <div style={{ padding: '1rem' }}>
                        <p>There's nothing here!</p>
                    </div>
                }
            />
        </Routes>
    );
}

export default App;
