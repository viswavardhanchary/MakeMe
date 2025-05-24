import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000"
});

export const getData = async (text) => {
  try {
    const res = await api.post("/data-ai"  , {msg : text});
    return res.data;
  } catch (error) {
    if (error.response) {
      // Handle specific backend error statuses
      const status = error.response.status;

      if (status === 429) {
        alert("Limit exceeded: You've hit the daily quota or rate limit. Please try again later.");
      } else if (status === 500) {
        alert("Server error: Something went wrong with the AI service.");
      } else {
        alert(`Unexpected error: ${error.response.data?.error || "Unknown error"}`);
      }
    } else {
      // Handle network or unknown client errors
      alert("Network error or server unreachable.");
    }

    console.error("getData error:", error);
    return null;
  }
} 

//Generate a 3-week daily roadmap for learning Data Structures and Algorithms starting from 2025-06-12. The output should be in CSV format with exactly two fields per line: date and task, where date is in yyyy-mm-dd format. Do not include any header line. Each line represents one day’s task and the full output should have 21 lines, one for each day. Output all lines as a single string separated by double asterisks ** instead of newlines. For example: 2025-06-12,Learn arrays and their operations**2025-06-13,Study linked lists and implementation. Provide the entire CSV content without extra text or explanations.