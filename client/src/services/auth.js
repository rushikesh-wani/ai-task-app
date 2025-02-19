import { toast } from "sonner";
import api from "./api";

export const signup = async (formData) => {
  try {
    const res = await api.post("/signup", formData);

    if (res.status === 201) {
      toast.success(res?.data?.message);
    }
    return res?.data;
  } catch (error) {
    console.log(error);
    toast.warning(
      error?.response?.data?.err ||
        error?.response?.data?.message ||
        "Something went wrong!"
    );
  }
};

export const login = async (formData) => {
  try {
    const res = await api.post("/login", formData);
    if (res.status === 200) {
      toast.success("Login Successfull!");
      localStorage.setItem("token", res?.data?.token);
      localStorage.setItem("userDetails", JSON.stringify(res?.data?.data));
      window.location.href = "/";
    }
  } catch (err) {
    console.log(err);
    toast.error(
      err?.response?.data?.err ||
        err?.response?.data?.message ||
        "Something went wrong!"
    );
  }
};
