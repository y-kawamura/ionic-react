import React from 'react';
import { IonRow, IonCol, IonButton, IonIcon } from '@ionic/react';
import { calculatorOutline, refreshOutline } from 'ionicons/icons';

const BmiControls: React.FC<{
  onCalculate: () => void;
  onReset: () => void;
}> = props => {
  return (
    <IonRow>
      <IonCol className='ion-text-left'>
        <IonButton onClick={props.onCalculate}>
          <IonIcon slot='start' icon={calculatorOutline} />
          Calulate
        </IonButton>
      </IonCol>
      <IonCol className='ion-text-right'>
        <IonButton onClick={props.onReset} color="danger" fill="outline">
          <IonIcon slot='start' icon={refreshOutline} />
          Reset
        </IonButton>
      </IonCol>
    </IonRow>
  );
};

export default BmiControls;
