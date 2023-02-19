import { useNavigate } from 'react-router-dom';
import Home from '../../../pages/Home/Home';

import Modal from "../../UI/Modal/Modal";

export const AdminProtected = ({ children }) => {
  const admin = localStorage.getItem('state');
  const navigate = useNavigate();

  if (admin != 'Admin') {
    return (
      <>
        <Modal
          type="Error"
          title="Acesso Negado!"
          message="Esta sessão é reservada ao administrador."
        />

        <Home />
      </>
    );
  }

  return children;
};
