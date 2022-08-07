import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Global } from '@emotion/react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { recoilInitializer } from './atoms';
import App from './App';

import { global } from './styles/global';
import './styles/reset.css';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
            retry: false,
            refetchInterval: false,
            refetchOnWindowFocus: false,
        },
    },
});

const $root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot($root).render(
    <React.StrictMode>
        <BrowserRouter>
            <RecoilRoot initializeState={recoilInitializer}>
                <QueryClientProvider client={queryClient}>
                    <Global styles={global} />
                    <App />
                </QueryClientProvider>
            </RecoilRoot>
        </BrowserRouter>
    </React.StrictMode>,
);
