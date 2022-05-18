import { createContext, useState } from "react";
import { toast } from "react-toastify";

import api from "~/services/api";

export const FormContext = createContext({});

function FormProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [customerData, setCustomerData] = useState({
    name: "",
    surname: "",
    email: "",
    telephone: "",
    birth_date: "",
    identity_type: "cpf",
    identity_card: "",
  });
  const [customerAddress, setCustomerAddress] = useState({
    zipcode: "",
    address: "",
    district: "",
    complement: "",
    city: "",
    state: "",
  });
  const [medicalRecord, setMedicalRecord] = useState({
    pressure: "",
    diabetic: "",
    hemophiliac: "",
    healing: "",
    eplsepsis: "",
    fainting: "",
    allergy_medication: "",
    hepatitis: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);

      const { data } = await api.post("/api/customers/create", {
        customerData,
        customerAddress,
        medicalRecord,
      });
      const { error, message } = data;

      if (message) {
        //toast.success(message);

        window.location.replace("/customers");
      } else {
        toast.error(error);
      }
    } catch (ex) {
      toast.error("Houve um problema com o servidor!");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  const value = {
    handleSubmit,
    currentStep,
    customerData,
    customerAddress,
    medicalRecord,
    setCurrentStep,
    setCustomerData,
    setCustomerAddress,
    setMedicalRecord,
    loading
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

export default FormProvider;
