import React, { useState } from "react";
import { IntlProvider, FormattedMessage } from "react-intl";
import CardMemoryGame from "./Components/CardGame";
import { messages } from "./Lang/messages/message";



const App = () => {
  const [locale, setLocale] = useState("en");

  const handleLanguageChange = (event) => {
    setLocale(event.target.value);
  };

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <div>
        <select value={locale} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="gu">Gujarati</option>
          <option value="pa">Punjabi</option>
        </select>
        
        <FormattedMessage id="hello" />
        <center>
          <h1>
            <FormattedMessage id="title" />
          </h1>
          <h3>
            <FormattedMessage id="rule" />
          </h3>
        </center>
        <CardMemoryGame />
      </div>
    </IntlProvider>
  );
};

export default App;
