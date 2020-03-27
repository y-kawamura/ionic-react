import React, { useRef, useState } from 'react';
import {
  IonApp,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonInput,
  IonItem,
  IonAlert
} from '@ionic/react';

import BmiControls from './components/BmiControls';
import BmiResult from './components/BmiResult';
import InputControl from './components/InputControl';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
  const [calculatedBmi, setCalulatedBmi] = useState<number>();
  const [error, setError] = useState<string>();
  const [calcUnits, setCalcUnits] = useState<'mkg' | 'ftlbs'>('mkg');

  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const heightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBmi = () => {
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;

    if (
      !enteredWeight ||
      !enteredHeight ||
      +enteredWeight <= 0 ||
      +enteredHeight <= 0
    ) {
      setError('Please input a valid numbers');
      return;
    }

    const weightConvertFactor = calcUnits === 'ftlbs' ? 2.2 : 1;
    const heightConvertFactor = calcUnits === 'ftlbs' ? 3.28 : 1;

    const weight = +enteredWeight / weightConvertFactor;
    const height = +enteredHeight / heightConvertFactor;

    const bmi = +weight / (height * height);

    setCalulatedBmi(bmi);
  };

  const resetInputs = () => {
    weightInputRef.current!.value = '';
    heightInputRef.current!.value = '';
  };

  return (
    <React.Fragment>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[
          {
            text: 'Ok',
            handler: () => {
              setError('');
            }
          }
        ]}
        backdropDismiss={false}
      />
      <IonApp>
        <IonHeader>
          <IonToolbar color='primary'>
            <IonTitle>BMI Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
          <IonGrid>
            <IonRow>
              <IonCol>
                <InputControl
                  selectedValue={calcUnits}
                  onSelectValue={setCalcUnits}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position='floating'>
                    Yuor Height ({calcUnits === 'mkg' ? 'meter' : 'feet'})
                  </IonLabel>
                  <IonInput ref={heightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position='floating'>
                    Yuor Weight ({calcUnits === 'mkg' ? 'kg' : 'lbs'})
                  </IonLabel>
                  <IonInput ref={weightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className='ion-margin'>
              <IonCol>
                <BmiControls onCalculate={calculateBmi} onReset={resetInputs} />
              </IonCol>
            </IonRow>
            {calculatedBmi && <BmiResult result={calculatedBmi} />}
          </IonGrid>
        </IonContent>
      </IonApp>
    </React.Fragment>
  );
};

export default App;
