import { Route, Routes } from "react-router-dom";

export default function Authrouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
