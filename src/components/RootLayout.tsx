import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <div>
      <aside>
        <p>Menu here</p>
      </aside>
      <main>
        <h1>Heading here</h1>
        <Outlet />
      </main>
    </div>
  );
};
