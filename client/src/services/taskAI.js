import { toast } from "sonner";
import api from "./api";

export const getSuggestion = async (prompt) => {
  try {
    const res = await api.post(
      "/task/generate",
      { topic: prompt },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    if (res?.status === 200) {
      toast.success("AI tasks generated successfully!");
    }
    return res?.data;
  } catch (error) {
    console.log(error);
    toast.error(
      error?.response?.data?.err ||
        "Something went wrong while generating tasks!"
    );
  }
};
