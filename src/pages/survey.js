import React, { useState } from 'react';
import '../assets/styles/survey.css';
import MessageCard from './messageCard';

const SurveyForm = () => {
  const questions = [
    { label: 'Jeste li zadnja 4 mjeseca bili na akupunkturi, tetoviranju, piercingu, bušenju ušiju?', name: 'question1', options: ['Da', 'Ne'] },
    { label: 'Jeste li u zadnjih 6 mjeseci bili trudni (bez obzira na ishod trudnoće) ili nedavno rodili?', name: 'question2', options: ['Da', 'Ne'] },
    { label: 'Imate li problema sa srcem?', name: 'question3', options: ['Da', 'Ne'] },
    { label: 'Imate li slabo željezo?', name: 'question4', options: ['Da', 'Ne'] },
    { label: 'Jeste li danas konzumirali alkoholna pića?', name: 'question5', options: ['Da', 'Ne'] },
    { label: 'Jeste li u prethodna dva tjedna imali temperaturu, kašalj, grlobolju, povračanje?', name: 'question6', options: ['Da', 'Ne'] },
    { label: 'Jeste li u posljednjih 12 mjeseci imali spolni kontakt sa osobom sa povećanim rizikom?', name: 'question7', options: ['Da', 'Ne'] },
    { label: 'Jeste li ikada primili ljudski hormon rasta ili koristili intravenske ili intramuskularne lijekove koji nisu propisani od strane liječnika (uključujući body-building steroide ili hormone)?', name: 'question8', options: ['Da', 'Ne'] },
    { label: 'Planirate li putovati van Hrvatske 4 mjeseca prije donacije?', name: 'question9', options: ['Da', 'Ne'] }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value === 'yes',
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setMessage([]);
    }
  };  



  const handleSubmit = (event) => {
    event.preventDefault();

    let messages = [];


    if (formData.question1) {
      messages.push("Ne možete donirati krv jer ste u zadnja 4 mjeseca bili na akupunkturi, tetoviranju, piercingu, bušenju ušiju.");
    }

    if (formData.question2) {
      messages.push("S obzirom da ste u zadnjih 6 mjeseci bili trudni (bez obzira na ishod trudnoće) ili nedavno rodili, pričekajte par mjeseci prije darivanja.");
    }

    if (formData.question3) {
      messages.push("Za osobe sa srčanim oboljenjima, pravo davanja krvi ovisi o specifičnom stanju i ispunjavanju drugih kriterija. Stanja kao što je angina mogu donirati ako nema simptoma najmanje 6 mjeseci, dok aritmija i srčana bolest zahtijevaju daljnju procjenu. Za one koji su doživjeli srčani udar, ispunjavanje uvjeta ovisi o tome da nisu imali simptoma tijekom 6 mjeseci, isključujući višestruke srčane udare. Osobe koje su bile podvrgnute operaciji srca mogu donirati nakon 6 mjeseci, pod uvjetom da nemaju drugih simptoma. Preporučamo da se informirate radi daljnje procjene i pojašnjenja o ispunjavanju uvjeta.");
    }

    if (formData.question4) {
      messages.push("Niska razina željeza može spriječiti doniranje krvi jer je željezo ključno za proizvodnju hemoglobina koji prenosi kisik u tijelu. Nedostatak željeza može uzrokovati anemiju i simptome poput nedostatka zraka i umora, stoga je važno imati odgovarajuće razine željeza prije doniranja krvi.");
    }

    if (formData.question5) {
      messages.push("Ne možete dati krv ako ste isti dan konzumirali alkohol jer to može utjecati na kvalitetu i sigurnost dane krvi.");
    }

    if (formData.question6) {
      messages.push("Ne možete darivati krv ako ste bolesni zbog mogućih rizika za vaše zdravlje i sigurnost dane krvi.");
    }

    if (formData.question7) {
      messages.push("Privremeno ne možete dati krv ako ste u proteklih 12 mjeseci bili u seksualnim odnosima s osobom kod koje postoji rizik od prijenosa zaraznih bolesti, jer bi to moglo predstavljati potencijalne rizike za sigurnost dane krvi.");
    }

    if (formData.question8) {
      messages.push("Ne možete dati krv ako ste primili ljudski hormon rasta ili ste koristili intravenske ili intramuskularne lijekove bez recepta, uključujući steroide ili hormone za izgradnju tijela, zbog mogućih rizika povezanih sa sigurnošću dane krvi.");
    }

    if (formData.question9) {
      messages.push("Ovisi o specifičnim okolnostima vašeg putovanja. Općenito, nedavna putovanja u određene zemlje ili regije mogu vas privremeno odgoditi od darivanja krvi zbog zabrinutosti o potencijalnoj izloženosti zaraznim bolestima. Preporuča se provjeriti s centrom za darivanje krvi u vašem području za najtočnije i najnovije informacije o kriterijima prihvatljivosti na temelju nedavne povijesti putovanja.");
    }

    if (messages.length === 0) {
      messages.push("Čestitamo! Trebali biste moći dati krv.");
    }

    setMessage(messages);
    setSubmitted(true);
  };


  const messageElements = message.map((msg, index) => <p key={index}>{msg}</p>)

  const renderQuestion = (question) => {
    const { label, name, options } = question;
    return (
      <div key={name} className="question">
        <label htmlFor={name}>{label}</label>
        <div>
          {options.map((option) => (
            <label key={option} className='label2'>
              <input
                type="radio"
                name={name}
                value={option === 'Da' ? 'yes' : 'no'}
                checked={formData[name] === (option === 'Da' ? true : false)}
                onChange={handleInputChange}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {!submitted ? (
        <div className="card-container card">
          <form onSubmit={handleSubmit}>
            {renderQuestion(questions[currentQuestion])}
            <div className="navigation-buttons">
              {currentQuestion > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setCurrentQuestion((prevQuestion) => prevQuestion - 1)
                  }
                >
                  Prethodno
                </button>
              )}
              {currentQuestion === questions.length - 1 ? (
                <button type="submit">Provjeri</button>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={handleNextQuestion}>
                    Sljedeće
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      ) : (
        <div className="message-card-container card2">
        <MessageCard messages={messageElements} />
      </div>
      )}
    </div>
  );
  
  
};

export default SurveyForm;
