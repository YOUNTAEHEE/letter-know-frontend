"use client";
import axios from 'axios';
import useUserStore from '@store/useUserStore'; // Zustand 스토어 가져오기

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,  // API origin으로 설정
  withCredentials: true,  // 인증 정보가 필요할 경우
  headers: {
    'Content-Type': 'application/json',  // 기본은 JSON
  },
});

export default apiClient;

// 요청 인터셉터 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().userInfo?.token; // Zustand에서 토큰 가져오기
    console.log(token)
  console.log(config.baseURL);
  console.log(config.url);
  console.log(config.method)

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      delete config.headers['Authorization'];
    }
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
apiClient.interceptors.response.use(
  (response) => {
    const successMessage = typeof response.data === 'string' ? response.data : response.data?.successMessage;
    // successMessage가 있을 때만 alert 표시
    if (successMessage) {
      alert(successMessage);
    }
    return response;
  },
  (error) => {
    // 응답 에러를 전역적으로 처리
    if (error.response) {
      const status = error.response.status;
      // const message = error.response.data.message || 'Something went wrong';
      const message = error.response.data?.message 
      ? error.response.data.message
      : null;

      console.error(`Error ${status}:`, message); // 상태 코드와 메시지 출력

      // 에러 상태 코드에 따라 적절한 조치를 취합니다.
      
      if (!message) {  // 서버에서 메시지가 없을 경우에만 기본 메시지 출력
        if (status === 401) {
          alert('세션이 만료되었습니다. 다시 로그인해주세요.');
          alert('Unauthorized access, please log in again.');
          // Zustand 스토어에서 유저 정보 초기화 및 토큰 삭제
          useUserStore.getState().clearUserInfo();
          localStorage.removeItem('token');  // 저장된 Access Token 삭제
  
          // 로그인 페이지로 리다이렉트
          window.location.href = '/'; 
    
        } else if (status === 403) {
          alert('You do not have permission to perform this action.');
        } else if (status === 500) {
          alert('Internal server error, please try again later.');
        }
      }

      // 서버에서 받은 에러 메시지가 있으면 표시
      if (message) {
        alert(message);
      }

    } else if (error.request) {
      console.error("No response from server:", error.request);
      alert('No response from server, please check your network.');
    } else {
      console.error("Request setup error:", error.message);
      alert('Error in setting up request: ' + error.message);
    }
    return Promise.reject(error); // 에러를 다시 던져 특정 컴포넌트에서 추가 처리 가능
  }
);

// 특정 요청을 보낼 때 headers 설정을 동적으로 변경하는 예시
export const sendMultipartForm = async (url: string, formData: FormData, method: 'post' | 'put') => {
  return apiClient({
    method: method,
    url: url,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};