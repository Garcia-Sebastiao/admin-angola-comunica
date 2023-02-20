/* eslint-disable import/no-anonymous-default-export */
import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

/*----------------- Imports -------------------*/
import "./App.css";
import Home from "./pages/Home/Home";
import Users from "./pages/User/Users";
import EditorLogin from "./pages/Login/Editor/SignIn";
import AdminLogin from "./pages/Login/Admin/SignIn";
import AddUser from "./pages/User/AddUser/AddUser";
import EditUser from "./pages/User/EditUser/EditUser";
import ArticlesPage from "./pages/Articles/ArticlesPage";
import AddArticle from "./pages/Articles/AddArticle/AddArticle";
import EditArticle from "./pages/Articles/EditArticle/EditArticle";
import { AuthProvider } from "./contexts/AuthProvider";
import { ProtectedLayout } from "./components/ProtectedLayout/index";
import { AdminProtected } from "./components/ProtectedLayout/AdminProtected/Admin";
import SearchArticle from './pages/Articles/SearchArticle/SearchArticle';

export default () => {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/editor_login" element={<EditorLogin />} />

          <Route
            path="/pesquisar_artigo"
            element={
              <ProtectedLayout>
                <SearchArticle />
              </ProtectedLayout>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedLayout>
                <Home />
              </ProtectedLayout>
            }
          />
          <Route
            path="/articles_page"
            element={
              <ProtectedLayout>
                <ArticlesPage />
              </ProtectedLayout>
            }
          />
          <Route
            path="/edit_articles/:idArticle"
            element={
              <ProtectedLayout>
                <EditArticle />
              </ProtectedLayout>
            }
          />
          <Route
            path="/add_articles"
            element={
              <ProtectedLayout>
                <AddArticle />
              </ProtectedLayout>
            }
          />
          <Route
            path="/users_page"
            element={
              <AdminProtected>
                <Users />
              </AdminProtected>
            }
          />
          <Route
            path="/add_user"
            element={
              <AdminProtected>
                <AddUser />
              </AdminProtected>
            }
          />
          <Route
            path="/edit_user/:id_editor"
            element={
              <AdminProtected>
                <EditUser />
              </AdminProtected>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
};
