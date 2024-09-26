import React, { createContext, useState } from "react";
import axios from "axios";

export const AppContext = createContext({});

export default function AppContextProvider(props) {
  const [dashboard, setDashboard] = useState({});

  const submitCSV = async (data) => {
    var formData = new FormData();
    formData.append("file", data.file);
    const response = await axios.post(
      "https://utubcpbk6g.execute-api.us-east-1.amazonaws.com/default/getLevelOneGymDashboard",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setDashboard(response.data);
  };

  return <AppContext.Provider value={{ dashboard, submitCSV }} {...props} />;
}
