# QuantoLavoro

**QuantoLavoro?** è un'app web che permette di **tracciare le ore lavorate** in modo semplice e intuitivo. Supporta **autenticazione con Firebase**, **memorizzazione su Firestore**, **doppio turno**, **scelta del colore per ogni giorno** e **funzionamento offline** grazie alla tecnologia **Progressive Web App (PWA)**.

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" alt="Rocket" width="25" height="25" /> Funzionalità principali

- **<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Spiral%20Calendar.png" alt="Spiral Calendar" width="25" height="25" /> Tracciamento settimanale:** inserisci orari di inizio e fine turno, anche doppio turno.
- **<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Artist%20Palette.png" alt="Artist Palette" width="25" height="25" /> Personalizzazione:** scegli il colore per ogni post-it giornaliero.
- **<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Mobile%20Phone.png" alt="Mobile Phone" width="25" height="25" /> PWA compatibile:** installabile su desktop e mobile (Android e iOS).
- **<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Locked%20with%20Key.png" alt="Locked with Key" width="25" height="25" /> Autenticazione Firebase:** login e registrazione per salvare i dati in cloud.
- **<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Card%20File%20Box.png" alt="Card File Box" width="25" height="25" /> Firestore Database:** memorizzazione persistente dei dati.
- **<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Counterclockwise%20Arrows%20Button.png" alt="Counterclockwise Arrows Button" width="25" height="25" /> Funzionamento offline:** grazie alla cache del Service Worker.
- **<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Desktop%20Computer.png" alt="Desktop Computer" width="25" height="25" /> Responsive:** adatta per desktop, tablet e smartphone.

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Inbox%20Tray.png" alt="Inbox Tray" width="25" height="25" /> Installazione e utilizzo

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Keycap%20Digit%20One.png" alt="Keycap Digit One" width="25" height="25" /> Clonare il repository

```bash
git clone https://github.com/ImElio/quantolavoro-public.git
cd quantolavoro
```

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Keycap%20Digit%20Two.png" alt="Keycap Digit Two" width="25" height="25" /> Installare le dipendenze (se necessario)

Se utilizzi un server di sviluppo locale, installa **serve** per testare la PWA:

```bash
npm install -g serve
```

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Keycap%20Digit%20Three.png" alt="Keycap Digit Three" width="25" height="25" /> Avviare il server locale

```bash
serve -s .
```
---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Globe%20Showing%20Europe-Africa.png" alt="Globe Showing Europe-Africa" width="25" height="25" /> Deployment su hosting gratuito

Puoi ospitare l'app su **Vercel**, **Netlify** o **Firebase Hosting** per ottenere HTTPS gratuito e supporto PWA.

###  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" alt="Rocket" width="25" height="25" /> Deploy con Vercel

```bash
vercel
```

### <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Fire.png" alt="Fire" width="25" height="25" /> Deploy con Firebase Hosting

```bash
firebase init
firebase deploy
```

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Mobile%20Phone%20with%20Arrow.png" alt="Mobile Phone with Arrow" width="25" height="25" /> Installazione come PWA

1. **Su Android:** Apri il sito con Chrome e clicca su "Aggiungi alla schermata Home".
2. **Su iOS:** Apri con Safari, clicca su Condividi ➝ "Aggiungi alla Home".
3. **Su Desktop:** Chrome/Edge mostrerà un'icona nella barra dell'URL per installare l'app.

---

## 🛠️ Configurazione Firebase

L'app utilizza **Firebase Authentication** e **Firestore Database** per la gestione utenti e dati.

1. Crea un nuovo progetto su [Firebase Console](https://console.firebase.google.com/).
2. Abilita **Authentication** con Email/Password.
3. Abilita **Firestore Database** in modalità test.
4. Scarica le credenziali Firebase (`firebaseConfig`) e incollale nel file `backend.js`.

```javascript
const firebaseConfig = {
  apiKey: "TUO_API_KEY",
  authDomain: "TUO_DOMINIO.firebaseapp.com",
  projectId: "TUO_PROJECT_ID",
  storageBucket: "TUO_BUCKET",
  messagingSenderId: "TUO_SENDER_ID",
  appId: "TUO_APP_ID"
};
```

---

## 📜 Struttura del progetto

```
quantolavoro/
│── index.html       # UI principale
│── style.css        # Stili e responsive design
│── backend.js       # Logica Firebase & Service Worker
│── manifest.json    # Configurazione PWA
│── sw.js            # Service Worker (cache offline)
│── icons/           # Icone per PWA
```

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Open%20Book.png" alt="Open Book" width="25" height="25" /> Licenza

Questo progetto è distribuito sotto licenza **MIT**. Sentiti libero di modificarlo e usarlo.

---

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Star.png" alt="Star" width="25" height="25" /> Contributi

Se vuoi migliorare l'app, **fai una pull request** o apri una issue su GitHub! 🎉

Made with <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Heart%20Hands.png" alt="Heart Hands" width="25" height="25" /> by Elio
