import React, { useReducer, createContext } from "react";

import en from "../../public/locales/en/en";
import zh from "../../public/locales/zh/zh";

const localeReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOCALE":
      return {
        locale: action.payload,
      };
    default:
      return state;
  }
};

const initalState = { locale: "en" };

export const LocaleContext = createContext();

const LocaleState = ({ children }) => {
  const [state, dispatch] = useReducer(localeReducer, initalState);

  const setLocale = (locale) => {
    dispatch({
      type: "SET_LOCALE",
      payload: locale,
    });
  };

  const t = () => {
    const { locale } = state;
    let localeData = {};
    if (locale === "en") {
      localeData = en;
    } else if (locale === "zh") {
      localeData = zh;
    }
    return localeData;
  };
  return (
    <LocaleContext.Provider value={{ state, dispatch: { setLocale, t } }}>
      {children}
    </LocaleContext.Provider>
  );
};

export default LocaleState;
