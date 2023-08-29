import React, { useState } from "react";
import Joyride, { STATUS } from "react-joyride";

const OnboardingTutorial = ({ steps }) => {
  const [runTutorial, setRunTutorial] = useState(true);

  const handleJoyrideCallback = (data) => {
    const { status } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunTutorial(false);
    }
  };

  const locale = {
    back: "Voltar",
    close: "Fechar",
    last: "Concluir",
    next: "Próximo",
    skip: "Pular",
  };

  return (
    <>
      {runTutorial && (
        <Joyride
          steps={steps}
          run={runTutorial}
          callback={handleJoyrideCallback}
          continuous={true}
          showProgress={true}
          showSkipButton={true}
          locale={locale}
        />
      )}
    </>
  );
};

export default OnboardingTutorial;

/* 

Instruções de utilização em outro arquivo:

  PASSO 01: Importe este componente no arquivo que você quer usar + Defina os alvos e as mensagens de instrução, ex:
    import OnboardingTutorial from "../../assets/Functions/Onboarding Tutorial/onboarding_tutorial";

    const steps = [
    {
      target: ".id_do_elemento",
      content:
        "Este é o elemento que você deseja destacar e fornecer informações.",
      disableBeacon: true,
    },
    // Adicione mais passos, se necessário
  ];

  PASSO 02: Renderize o componente OnboardingTutorial no arquivo desejado, dentro da instrução de return do JSX, ex:
    <OnboardingTutorial steps={steps} />


*/
