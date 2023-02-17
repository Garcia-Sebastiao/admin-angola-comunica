import { getUserLocalStorage } from "../../contexts/AuthProvider/util";
import { useAuth } from "../../hooks/useAuth";
import SignIn from "../../pages/Login/SignIn";

import Modal from "../UI/Modal/Modal";

export const ProtectedLayout = ({ children }) => {
  const user = getUserLocalStorage();

  if (!user) {
    return (
      <>
        <Modal
          type="Error"
          title="Acesso Negado!"
          message="Você precisa fazer login."
        />

        <SignIn />
      </>
    );
  }

  return children;
};
