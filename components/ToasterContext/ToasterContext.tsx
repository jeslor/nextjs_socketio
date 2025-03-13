"use client";
import { Toaster } from "react-hot-toast";


const ToasterContext = () => {
  return (
    <Toaster
    position="top-right"
    reverseOrder={false}
    gutter={8}
    containerStyle={{
      top: 80,
      right: 20,
      paddingTop: 20,
      paddingRight: 20,
    }}
    toastOptions={{
      duration: 3000,
      style: {
        background: "#333",
        color: "#fff",
      },
      success: {
        style: {
          background: "green",
          color: "#fff",
        },
      },
      error: {
        style: {
          background: "#fff",
          color: "red",
        },
      },
    }}
     />
  )
}

export default ToasterContext