import { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { isMobile, isTablet } from "react-device-detect";
import { Provider } from "react-redux";
import { store } from "store/store";
import LocaleState from "context/localeContentext";

const GlobalStyle = createGlobalStyle`

  body, html{
    padding: 0;
    margin: 0; 
    height: 100%;
    width: 100%;
    font-size: 14px;
    font-family: 'Exo', sans-serif;
    @media (max-height:850px){
      height: 900px;
      overflow: auto;
    }
  }
  body{
    overflow: hidden;
    justify-content: center;
    align-items: center;
    display: flex;
    background-image: url('/background/bg.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
  *{
    box-sizing: border-box;
    button{
      font-family: 'Exo', sans-serif;
    }
    /** responsive tradingview style */
    iframe {
      width: 100%;
      height: 100%;
    }
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
  .recharts-wrapper {
    cursor: pointer !important;
    height: 100% !important;
    width: 100% !important;
  }
  .recharts-surface {
    width: 100% !important;
  }
`;

function MyApp({ Component, pageProps }) {
  const [compatable, setCompatable] = useState(true);
  useEffect(() => {
    if (isMobile || isTablet) {
      setCompatable(false);
    }
  }, []);

  return (
    <>
      {compatable ? (
        <Provider store={store}>
          <LocaleState>
            <GlobalStyle />
            <Component {...pageProps} />
          </LocaleState>
        </Provider>
      ) : (
        <div>Mobile not supported! sorry</div>
      )}
    </>
  );
}

export default MyApp;
