import { ApiResponse, create } from 'apisauce';
import { isEmptyObject } from '../utils/helpers';

const baseURL = process.env.NODE_ENV === 'development' ? '' : '';

export const API = create({
    baseURL,
    withCredentials: true,
});

function methodLog(response: ApiResponse<any, any>) {
    const isSuccess = response.data?.status === 0;
    const method = response.config?.method?.toLocaleUpperCase();
    const bodyLog = (body: any) => {
        if (body instanceof FormData) return body;
        if (typeof body === 'string') return JSON.parse(body);
        return undefined;
    };
    switch (method) {
        case 'GET':
            console.log(
                `${isSuccess ? '😄' : '🤢'} %c${method}`,
                'background: #191919; color: #14C38E',
                response.status,
                response.config?.url,
                '\n',
                {
                    data: response.data,
                    params: isEmptyObject(response.config?.params) ? undefined : response.config?.params,
                },
            );
            break;
        case 'POST':
            console.log(
                `${isSuccess ? '😄' : '🤢'} %c${method}`,
                'background: #191919; color: #40DFEF',
                response.status,
                response.config?.url,
                '\n',
                {
                    data: response.data,
                    body: bodyLog(response.config?.data),
                    params: isEmptyObject(response.config?.params) ? undefined : response.config?.params,
                },
            );
            break;
        case 'PUT':
            console.log(
                `${isSuccess ? '😄' : '🤢'} %c${method}`,
                'background: #191919; color: #FFD24C',
                response.status,
                response.config?.url,
                '\n',
                {
                    data: response.data,
                    body: bodyLog(response.config?.data),
                    params: isEmptyObject(response.config?.params) ? undefined : response.config?.params,
                },
            );
            break;
        case 'PATCH':
            console.log(
                `${isSuccess ? '😄' : '🤢'} %c${method}`,
                'background: #191919; color: #FFD24C',
                response.status,
                response.config?.url,
                '\n',
                {
                    data: response.data,
                    body: bodyLog(response.config?.data),
                    params: isEmptyObject(response.config?.params) ? undefined : response.config?.params,
                },
            );
            break;
        case 'DELETE':
            console.log(
                `${isSuccess ? '😄' : '🤢'} %c${method}`,
                'background: #191919; color: #F47C7C',
                response.status,
                response.config?.url,
                '\n',
                {
                    data: response.data,
                    params: isEmptyObject(response.config?.params) ? undefined : response.config?.params,
                },
            );
            break;
        default:
            break;
    }
}

// moditor의 역할은 단순 log를 찍기 위함이 아니다.
API.addMonitor((response) => {
    // api cancel 시 log 안 찍음
    if (response.problem === 'CANCEL_ERROR') return;
    if (response?.originalError) {
        // api error 발생 시 처리할 로직 추가
    }

    // 개발 모드 일 경우에만 log 찍기
    if (process.env.NODE_ENV === 'development') methodLog(response);

    // status code에 따라 처리할 로직 추가
    if (response.data?.status === 403) return;
    if (response.data?.status === 400) return;
    if (Math.abs(response.data?.status) >= 500) return;
});
