import { Toasts, UserCreateModal, UserGrid } from "components";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Toasts />
      <UserGrid />
      <UserCreateModal />
    </div>
  );
};

export default HomePage;
