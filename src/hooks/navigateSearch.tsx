import { createSearchParams, useNavigate } from "react-router-dom";

export const useNavigateSearch = () => {
  const navigate = useNavigate();
  return (pathname: string, params: any) =>
    navigate(`${pathname}?${createSearchParams(params)}`, { replace: true });
};