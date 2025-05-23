export const ALPA_REGEX = /^[A-Za-z.\-\s`]+$/;
export const AADHAR_REGEX = /^\d{12}$/;
export const PAN_REGEX = /^[A-Za-z]{5}\d{4}[a-zA-Z]$/;
export const PHONE_REGEX = /^\d{10}$/;
export const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const NUMBER_REGEX = /^\d+$/;
export const PINCODE_REGEX = /\b\d{6}\b/;

const TODAY = new Date();
export const MIN_DATE = new Date();
MIN_DATE.setFullYear(TODAY.getFullYear() - 60);

export const MAX_DATE = new Date();
MAX_DATE.setFullYear(TODAY.getFullYear() - 18);
