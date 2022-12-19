declare interface Window {
  Kakao: any;
  daum: any;
  TiaraTracker: TiaraTracker;
}

declare namespace NodeJS {
  interface ProcessEnv {
    /** node environment */
    REACT_APP_KAKAO_SYNC_ORIGIN: string;
    REACT_APP_AGREEMENT_APP_CODE: string;
    REACT_APP_AUTH_REDIRECT_URI: string;
    REACT_APP_DOMAIN: string;
    REACT_APP_PAYMENT_DOMAIN: string;
    REACT_APP_PAYMENT_WINDOW_ORIGIN: string;
    REACT_APP_PAYMENT_REDIRECT_URI: string;
    REACT_APP_PAYMENT_PRODUCT_CODE: string;
    REACT_APP_TOKEN_REFRESH_URI: string;
    REACT_APP_CLIENT_ID: string;
    REACT_APP_COMMON_FRONT_QUICK: string;
    REACT_APP_GA_MEASUREMENT_KEY: string;
    REACT_APP_ENV_SENTRY_DSN: string;
    REACT_APP_ENV: "prod" | "local" | "alpha";
    REACT_APP_ORIGIN: string;
    REACT_APP_GTAG_KEY: string;
    REACT_APP_DEVELOPERS_APP_KEY_JS: string;
    GATEWAY_ORIGIN: string;
  }
}

type Nullable<T> = T | null;

type Modify<T, R> = Omit<T, keyof R> & R;

type ValueOf<T> = T[keyof T];
