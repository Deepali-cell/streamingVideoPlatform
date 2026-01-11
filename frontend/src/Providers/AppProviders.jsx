import AdminContextProvider from "@/context/AdminContext";
import StateContextProvider from "@/context/StateContext";

const AppProviders = ({ children }) => {
  return (
    <StateContextProvider>
      <AdminContextProvider>{children}</AdminContextProvider>
    </StateContextProvider>
  );
};

export default AppProviders;
