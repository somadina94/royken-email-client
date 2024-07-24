import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://127.0.0.1:4003/api/v1/",
// });

const axiosInstance = axios.create({
  baseURL: "https://pilot3.jahbyte.com/api/v1/",
});

export const sendEmails = async (data) => {
  try {
    const res = await axiosInstance({
      method: "POST",
      url: "email/sendEmail",
      data,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
